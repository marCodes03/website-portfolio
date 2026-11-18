// Runs axe-core against the production build in headless Chrome (CHG-0012).
// Usage: npm run build && npm run test:a11y
// Drives Chrome over its DevTools protocol; no browser-automation package needed.
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';

const require = createRequire(import.meta.url);
const ROOT = path.resolve('dist/website-portfolio-test/browser');
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const WIDTHS = [1280, 390];
const THEMES = ['light', 'dark'];
const LOAD_TIMEOUT_MS = 15000;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.webp': 'image/webp', '.woff2': 'font/woff2',
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function fail(message) {
  console.error(`a11y-check: ${message}`);
  process.exitCode = 1;
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  return candidates.find((c) => fs.existsSync(c));
}

function serve() {
  const server = http.createServer((req, res) => {
    let file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(ROOT, 'index.csr.html');
    }
    res.setHeader('content-type', MIME[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function connect(chromePort) {
  for (let i = 0; i < 40; i++) {
    try {
      const tabs = await (await fetch(`http://127.0.0.1:${chromePort}/json`)).json();
      const page = tabs.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch { /* Chrome still starting */ }
    await wait(250);
  }
  throw new Error('Chrome did not start (DevTools endpoint unreachable).');
}

async function main() {
  if (!fs.existsSync(path.join(ROOT, 'index.csr.html'))) {
    return fail('build not found. Run `npm run build` first.');
  }
  const chromePath = findChrome();
  if (!chromePath) return fail('Chrome not found. Set CHROME_PATH to its executable.');

  const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  const server = await serve();
  const siteUrl = `http://127.0.0.1:${server.address().port}/`;
  const chromePort = 9400 + Math.floor(Math.random() * 500);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'a11y-chrome-'));
  const chrome = spawn(chromePath, [
    '--headless=new', `--remote-debugging-port=${chromePort}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--disable-gpu', 'about:blank',
  ], { stdio: 'ignore' });

  const cleanup = () => {
    try { chrome.kill(); } catch { /* already gone */ }
    server.close();
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* best effort */ }
  };

  try {
    const ws = new WebSocket(await connect(chromePort));
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    let nextId = 0;
    const pending = new Map();
    // /api/chat is answered by the script (never the real model): held until released, so the
    // thinking and typing states can be checked deterministically.
    const heldChat = [];
    const CHAT_REPLY = 'Marco is a full-stack software engineer building .NET backends and Angular frontends. '.repeat(4).trim();
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
      if (m.method === 'Fetch.requestPaused') {
        const requestId = m.params.requestId;
        heldChat.push(() => send('Fetch.fulfillRequest', {
          requestId, responseCode: 200,
          responseHeaders: [{ name: 'content-type', value: 'application/json' }],
          body: Buffer.from(JSON.stringify({ reply: CHAT_REPLY })).toString('base64'),
        }));
      }
    };
    const send = (method, params = {}) => new Promise((resolve) => {
      const id = ++nextId;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async (expression) => {
      const { result } = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails) {
        throw new Error(result.exceptionDetails.exception?.description || 'page script error');
      }
      return result.result.value;
    };
    const pressEscape = async () => {
      for (const type of ['keyDown', 'keyUp']) {
        await send('Input.dispatchKeyEvent', { type, key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
      }
      await wait(500);
    };
    // R7: a state that cannot be reached is a failure, never a pass.
    const click = async (selector) => {
      const ok = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); if (!el) return false; el.click(); return true; })()`);
      if (!ok) throw new Error(`could not reach state: selector not found: ${selector}`);
      await wait(800);
    };
    // R5: settle scroll-reveal fades only while axe runs, then remove the override.
    const runAxe = () => evaluate(`(async () => {
      const style = document.createElement('style');
      style.id = '__axe_settle';
      style.textContent = '*{opacity:1!important;transition:none!important}';
      document.head.append(style);
      await new Promise((r) => setTimeout(r, 200));
      try {
        const r = await axe.run(document, { runOnly: { type: 'tag', values: ${JSON.stringify(AXE_TAGS)} } });
        return r.violations.map((v) => ({
          id: v.id, impact: v.impact, count: v.nodes.length,
          nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ') + ' :: ' + ((n.any[0] || n.all[0] || n.none[0] || {}).message || '')),
        }));
      } finally { style.remove(); }
    })()`);

    await send('Page.enable');
    await send('Fetch.enable', { patterns: [{ urlPattern: '*/api/chat', requestStage: 'Request' }] });
    const failures = [];
    let checked = 0;

    for (const width of WIDTHS) {
      for (const theme of THEMES) {
        await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
        await send('Page.navigate', { url: siteUrl });
        const start = Date.now();
        while (!(await evaluate(`!!document.querySelector('app-chat-bot button[aria-controls="chat-panel"]')`))) {
          if (Date.now() - start > LOAD_TIMEOUT_MS) throw new Error(`page did not load within ${LOAD_TIMEOUT_MS / 1000}s`);
          await wait(250);
        }
        await evaluate(axeSource);
        await evaluate(`document.documentElement.classList.toggle('dark', ${theme === 'dark'}); true`);
        await evaluate(`(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); return true; })()`);
        await wait(1500);

        const states = [
          ['page scrolled', async () => {}],
          ['chat open', async () => { await click('button[aria-controls="chat-panel"]'); }],
          ['chat thinking', async () => {
            // Chat is already open from the previous state: send a message and keep the reply pending.
            const sent = await evaluate(`(() => { const i = document.getElementById('chat-input'); const f = document.querySelector('#chat-panel form'); if (!i || !f) return false; i.value = 'Who is Marco?'; i.dispatchEvent(new Event('input', { bubbles: true })); f.requestSubmit(); return true; })()`);
            if (!sent) throw new Error('could not reach state: chat input or form not found');
            await wait(500);
          }],
          ['chat typing', async () => {
            // Release the held reply and check while the reply is still being typed out.
            if (!heldChat.length) throw new Error('could not reach state: no pending chat request to release');
            heldChat.splice(0).forEach((fulfill) => fulfill());
            await wait(500);
          }],
          ['project modal', async () => { await pressEscape(); await click('app-portfolio button[aria-haspopup="dialog"]'); }],
          ['certificate modal', async () => { await pressEscape(); await click('app-certificates [aria-haspopup="dialog"]'); }],
          ['contact dialog', async () => { await pressEscape(); await click('#get-in-touch button:first-of-type'); }],
          ['contact errors', async () => { await click('app-contact-dialog form button[type="submit"]'); }],
        ];
        for (const [name, setup] of states) {
          await setup();
          const violations = await runAxe();
          checked++;
          const label = `${width}px ${theme} / ${name}`;
          if (violations.length) failures.push({ label, violations });
          console.log(`${violations.length ? 'FAIL' : 'ok  '} ${label}`);
        }
      }
    }

    console.log(`\n${checked} checks, ${failures.length} with violations.`);
    for (const { label, violations } of failures) {
      console.error(`\n[${label}]`);
      for (const v of violations) {
        console.error(`  ${v.id} (${v.impact}) x${v.count}`);
        v.nodes.forEach((n) => console.error(`    ${n.slice(0, 220)}`));
      }
    }
    if (failures.length) process.exitCode = 1;
  } catch (err) {
    fail(err.message);
  } finally {
    cleanup();
  }
}

await main();
process.exit(process.exitCode ?? 0);
