import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, message, website } = (req.body ?? {}) as Record<
    string,
    unknown
  >;

  // Honeypot: real visitors never fill this hidden field. Pretend it worked.
  if (typeof website === 'string' && website.trim() !== '') {
    return res.status(200).json({ success: 'Message sent successfully!' });
  }

  if (
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    !email.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (cleanEmail.length > MAX_EMAIL || !EMAIL_RE.test(cleanEmail)) {
    return res.status(400).json({ error: 'Email is invalid.' });
  }
  if (cleanMessage.length > MAX_MESSAGE) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RECEIVING_EMAIL;
  if (!apiKey || !from || !to) {
    console.error(
      'Contact form is not configured: set RESEND_API_KEY, RESEND_FROM_EMAIL and RECEIVING_EMAIL.'
    );
    return res.status(500).json({ error: 'Failed to send message' });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New message from ${cleanEmail}`,
      text: cleanMessage,
      replyTo: cleanEmail,
    });

    if (error) {
      console.error('Failed to send message', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }
    return res.status(200).json({ success: 'Message sent successfully!' });
  } catch (error) {
    console.error('Failed to send message', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
