import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import chatHandler from '../api/chat';
import contactHandler from '../api/contact';

// Load .env locally for development checking multiple possible root paths
const loadEnv = () => {
  const paths = [
    join(process.cwd(), '.env'),
    join(import.meta.dirname, '.env'),
    join(import.meta.dirname, '..', '.env'),
    join(import.meta.dirname, '../..', '.env')
  ];
  for (const envPath of paths) {
    if (existsSync(envPath)) {
      try {
        const envContent = readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach((line) => {
          const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
          if (match) {
            const key = match[1];
            let value = match[2] || '';
            if (value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1);
            } else if (value.startsWith("'") && value.endsWith("'")) {
              value = value.slice(1, -1);
            }
            process.env[key] = value.trim();
          }
        });
        console.log(`Successfully loaded environment config from: ${envPath}`);
        return;
      } catch (err) {
        console.error(`Failed to load env file from ${envPath}:`, err);
      }
    }
  }
  console.warn('Could not locate a local .env configuration file.');
};
loadEnv();

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine({
  allowedHosts: ['localhost', '127.0.0.1']
});

// JSON Body Parser Middleware (small cap: chat and contact payloads are tiny)
app.use(express.json({ limit: '16kb' }));

/**
 * Mounts a Vercel-style `(Request) => Response` handler from api/ on the local
 * server, so local and deployed behaviour (validation, rate limiting, CORS,
 * error handling) come from one implementation.
 */
const mountApiHandler =
  (handler: (req: Request) => Promise<Response>) =>
  async (req: ExpressRequest, res: ExpressResponse): Promise<void> => {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    headers.set('x-forwarded-for', req.ip ?? 'unknown');

    const webRequest = new Request(`http://${req.headers.host ?? 'localhost'}${req.originalUrl}`, {
      method: req.method,
      headers,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : JSON.stringify(req.body ?? {}),
    });

    const webResponse = await handler(webRequest);
    res.status(webResponse.status);
    webResponse.headers.forEach((value, key) => res.setHeader(key, value));
    res.send(await webResponse.text());
  };

app.all('/api/chat', mountApiHandler(chatHandler));
app.all('/api/contact', mountApiHandler(contactHandler));

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
