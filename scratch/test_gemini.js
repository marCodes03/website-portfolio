import { GoogleGenAI } from '@google/genai';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Load .env
const envPath = join(process.cwd(), '.env');
if (existsSync(envPath)) {
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
}

const apiKey = process.env.GEMINI_API_KEY;
console.log('Using API Key:', apiKey);

try {
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Hello',
  });
  console.log('Success response:', response.text);
} catch (error) {
  console.error('API Error details:', error);
}
