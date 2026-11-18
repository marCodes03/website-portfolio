import { buildCorsHeaders, checkRateLimit, jsonResponse } from './_lib/request-guard';
import { FALLBACK_REPLY, MAX_MESSAGE_LENGTH, getChatReply } from './_lib/chat-assistant';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const corsHeaders = buildCorsHeaders();

  // Handle CORS Preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Enforce POST method only
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405, corsHeaders);
  }

  const rateLimitResponse = await checkRateLimit(req, corsHeaders);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body: { message?: unknown } | null = await req.json().catch(() => null);
    const message = body?.message;

    if (typeof message !== 'string' || !message.trim()) {
      return jsonResponse({ error: 'Missing "message" field in request body' }, 400, corsHeaders);
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return jsonResponse({ error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer` }, 400, corsHeaders);
    }

    const apiKey = process.env['GEMINI_API_KEY'];
    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return jsonResponse({ error: 'Server configuration error' }, 500, corsHeaders);
    }

    const reply = await getChatReply(apiKey, message);
    return jsonResponse({ reply }, 200, corsHeaders);
  } catch (error: unknown) {
    // Log details server-side only; never return them to the client.
    console.error('Gemini API Handler Error:', error);
    // 502 so outages are visible in logs and monitoring. The body still carries the
    // fixed apology so any client can show it; it never contains upstream details.
    return jsonResponse({ error: 'upstream_unavailable', reply: FALLBACK_REPLY }, 502, corsHeaders);
  }
}
