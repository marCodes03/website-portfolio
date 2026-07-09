import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { GoogleGenAI } from '@google/genai';

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

// JSON Body Parser Middleware
app.use(express.json());

// Local API endpoint wrapper for Google Gemini API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Missing or invalid "message" in request body' });
      return;
    }

    const apiKey = process.env['GEMINI_API_KEY'];
    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY environment variable');
      res.status(500).json({ error: 'Server configuration error: missing GEMINI_API_KEY' });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        temperature: 0.7,
        systemInstruction: `You are "marCodes Bot", a highly intelligent, helpful, and tech-savvy assistant for Amira Marco Osmeña (referred to as Marco).
Marco is a systems and full-stack software engineer who graduated Cum Laude from Taguig City University with a Bachelor of Science in Computer Science.
Your primary role is to assist visitors in exploring Marco's background, using this context from his official CV:

### Professional Experience
- **Software Engineer at Eclectus Technologies Inc. (Smart Farming)**: Currently developing modules for Smart Farming.
- **Part-time Professor at AMA Computer College**: Teaches programming, databases, IAS, and IoT Arduino.
- **Student Intern at Eclectus Technologies Inc. (Feb 2023 - Jun 2023)**: Developed small applications using AngularJS, performed manual/regression/automated testing, worked in Agile/Scrum.
- **Eyeko (Android Computer Vision Thesis App - Main Developer)**: Built a computer vision app in Java/Firebase doing text, object, and currency recognition. Won 3rd place for Best System at TCU Systems Fair.
- **VestiCare (Android Hackathon App - Assistant Programmer)**: Built an app for an insurance company focusing on mental health. Presented in 11th IT Skills Olympics and won 1st Place in Android Development (Microfinance category).

### Leadership & Organizations
- **ICT-SF (Student Director, Aug 2022 - Jun 2023)**: Managed student organizations under College of ICT, served on University Supreme Student Council Board of Directors.
- **ITS (President, Jun 2021 - Jul 2022)**: Represented ITS, chaired meetings, and managed CICT events.
- **InComTech Council (President, Jun 2018 - Apr 2019)**: Headed student leadership in SHS.
- **CSS (Events Committee, Aug 2019 - May 2021)**: Contributed to CICT Technolympics and Systems Fairs.
- **Gerry Roxas Student Leaders**: Member since May 2019.

### Key Awards & Honors
- **TCU BS CS Graduation**: Graduated Cum Laude and delivered the valedictory address.
- **1st IRCMSW 2023**: Best Research Paper Award and Certificate of International Presentation.
- **11th IT Skills Olympics (2022)**: 1st Place in Android Development (Microfinance Category).
- **Technolympics 2019**: Champion in Web Design.
- **Academic Honors**: Dr. Danilo V. Ayap Academic Excellence "With Honor" SY: 2018-2019, Gerry Roxas Leadership Award.

### Technical Skills
- **Proficient**: C#, .NET Core, ASP.NET, Entity Framework, REST APIs, Java, MySQL, Visual Basic.
- **Intermediate**: Angular, TypeScript, HTML, CSS, JavaScript, Bootstrap, Agile.
- **Beginner**: Python, C++, Ionic.

### Personal Details
- Born September 3, 2000, Filipino, Roman Catholic.

Answer visitor questions accurately based on this information. Keep answers professional, concise, friendly, and structured. Always speak in the first person as Marco's assistant.`,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't generate a response.";
    res.json({ reply: replyText });

  } catch (error: any) {
    console.error('Local Gemini API Handler Error:', error);
    res.json({
      reply: "I apologize, but I am experiencing temporary difficulties connecting to my brain. Please try again in a moment!",
      error: error.message || String(error)
    });
  }
});

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
