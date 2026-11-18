import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/contact-schema';

export const runtime = 'nodejs';

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
  if (typeof body === 'object' && body !== null && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true });
  }

  let data;
  try {
    data = await contactSchema.validate(body, { abortEarly: false, stripUnknown: true });
  } catch {
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 422 });
  }

  const { MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM, CONTACT_TO_EMAIL } = process.env;
  if (!MAIL_HOST || !MAIL_PORT || !MAIL_USERNAME || !MAIL_PASSWORD || !CONTACT_TO_EMAIL) {
    console.error('Contact form: mail environment variables are missing.');
    return NextResponse.json({ error: 'Email is not configured.' }, { status: 500 });
  }

  const port = Number(MAIL_PORT);
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port,
    secure: port === 465,
    auth: { user: MAIL_USERNAME, pass: MAIL_PASSWORD },
  });

  const industry = data.industry === 'Other' && data.industryOther ? `Other: ${data.industryOther}` : data.industry;
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Company', data.company],
    ['Email', data.email],
    ['Phone', data.phone || '-'],
    ['Industry', industry],
  ];
  const message = data.message?.trim() || '-';

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', 'Message:', message].join('\n');
  const html = `
    <h2 style="margin:0 0 12px">New website enquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="color:#5F6E7D"><b>${k}</b></td><td>${esc(v)}</td></tr>`).join('')}
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap"><b>Message</b><br>${esc(message)}</p>`;

  try {
    await transporter.sendMail({
      from: MAIL_FROM || MAIL_USERNAME,
      to: CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `New enquiry from ${data.company}`,
      text,
      html,
    });
  } catch (err) {
    console.error('Contact form: sending failed', err);
    return NextResponse.json({ error: 'We could not send your message. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
