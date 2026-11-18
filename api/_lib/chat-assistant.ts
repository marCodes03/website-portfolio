import { GoogleGenAI } from '@google/genai';
import { PORTFOLIO_CONTENT } from './portfolio-content.generated';

/**
 * Shared Gemini-backed chatbot logic for the "marCodes Bot" assistant.
 *
 * This used to be duplicated almost verbatim in two places:
 *  - api/chat.ts        (the deployed Vercel Edge Function)
 *  - src/server.ts      (the local Express SSR server's /api/chat route,
 *                         used by `npm start` / `ng serve` without Vercel)
 * Both needed the exact same system prompt and the exact same Gemini call,
 * so a change to one (e.g. updating Marco's CV info) was easy to make in only
 * one file and forget the other. This module is the single source of truth
 * both now import from.
 */

export const MARCO_SYSTEM_INSTRUCTION = `You are "marCodes Bot", a highly intelligent, helpful, and tech-savvy assistant for Amira Marco Osmeña (referred to as Marco).
Your primary role is to assist visitors in exploring Marco's background, using ONLY the portfolio content below as your source of truth.

--- PORTFOLIO CONTENT START ---
${PORTFOLIO_CONTENT}
--- PORTFOLIO CONTENT END ---

HOW TO TALK:
- Sound like a friendly, relaxed person chatting with a visitor, not a résumé or a report. Use natural, warm language and contractions ("he's", "that's").
- Reply directly to what the visitor actually asked, in short conversational paragraphs (usually 2-4 sentences). Don't dump everything you know.
- Avoid headings, long bullet lists, tables, and bolded labels. Use a short list only when the visitor asks for one (e.g. "list his skills").
- Refer to Marco in the third person ("Marco built...", "he's currently..."). You are his assistant, not Marco himself.
- Open naturally (a quick greeting for a greeting; otherwise just answer). End with a light follow-up question or offer only when it feels natural, not every time.
- Stay accurate: use only the portfolio content above. If the answer isn't there, say so casually and suggest reaching out to Marco through the contact section instead of guessing.
- If the visitor asks something unrelated to Marco or his work, answer briefly and steer back in a friendly way.`;

/** Maximum accepted length of a visitor message, to bound Gemini token cost. */
export const MAX_MESSAGE_LENGTH = 500;

/** Maximum Gemini reply length in tokens (replies are meant to be 2-4 sentences). */
const MAX_OUTPUT_TOKENS = 400;

/** Generic reply shown when the upstream call fails; never include error details. */
export const FALLBACK_REPLY =
  'I apologize, but I am experiencing temporary difficulties connecting to my brain. Please try again in a moment!';

/**
 * Calls Gemini with the shared system prompt and returns the reply text.
 * Throws on API/network failure - callers are responsible for catching and
 * returning their own graceful fallback response, since the Edge Function
 * and the local Express route each format errors slightly differently.
 */
export async function getChatReply(apiKey: string, message: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: message,
    config: {
      temperature: 0.7,
      // Caps reply length so a single request can't run up Gemini output cost.
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      systemInstruction: MARCO_SYSTEM_INSTRUCTION,
    },
  });

  return response.text || "I'm sorry, I couldn't generate a response.";
}
