import nodemailer from 'nodemailer';
import { buildCorsHeaders, checkRateLimit, jsonResponse } from './_lib/request-guard';

// NOTE: deliberately NOT edge runtime (unlike api/chat.ts) — nodemailer needs
// Node's net/tls modules, which the edge runtime does not provide. This runs
// as a standard Vercel Node.js serverless function instead.
export const config = {
  runtime: 'nodejs',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = { name: 100, email: 254, subject: 150, message: 5000 };

function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: Request) {
  const corsHeaders = buildCorsHeaders();

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
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
    const body: { name?: unknown; email?: unknown; subject?: unknown; message?: unknown } | null =
      await req.json().catch(() => null);
    const { name, email, subject, message } = body ?? {};

    if (typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !isValidEmail(email) ||
        typeof message !== 'string' || !message.trim() ||
        typeof subject !== 'string' || !subject.trim()) {
      return jsonResponse({ error: 'Missing or invalid required fields (name, email, subject, message)' }, 400, corsHeaders);
    }

    if (name.length > MAX_FIELD_LENGTH.name || email.length > MAX_FIELD_LENGTH.email ||
        message.length > MAX_FIELD_LENGTH.message ||
        subject.length > MAX_FIELD_LENGTH.subject) {
      return jsonResponse({ error: 'One or more fields are too long' }, 400, corsHeaders);
    }

    const EMAIL_USER = process.env['EMAIL_USER'];
    const EMAIL_APP_PASSWORD = process.env['EMAIL_APP_PASSWORD'];

    if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
      console.error('Missing EMAIL_USER or EMAIL_APP_PASSWORD environment variable');
      return jsonResponse({ error: 'Server configuration error' }, 500, corsHeaders);
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD, // Gmail App Password, not the account password
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: email,
      // Strip CR/LF so user input can't inject extra mail headers.
      subject: `[Portfolio Contact] ${subject.replace(/[\r\n]+/g, ' ')}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    });

    return jsonResponse({ success: true }, 200, corsHeaders);

  } catch (error: unknown) {
    console.error('Contact Form Handler Error:', error);
    return jsonResponse({ error: 'Failed to send message. Please try again later.' }, 500, corsHeaders);
  }
}
