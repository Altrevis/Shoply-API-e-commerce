import nodemailer from 'nodemailer';

const SMTP_USER = process.env.MAILTRAP_SMTP_USER || process.env.MAILTRAP_USER;
const SMTP_PASS = process.env.MAILTRAP_SMTP_PASS || process.env.MAILTRAP_PASSWORD || process.env.MAILTRAP_TOKEN;
const SMTP_HOST = process.env.MAILTRAP_SMTP_HOST || 'live.smtp.mailtrap.io';
const SMTP_PORT = parseInt(process.env.MAILTRAP_SMTP_PORT || '587', 10);

if (!SMTP_USER || !SMTP_PASS) {
  console.warn('⚠️ Mailtrap SMTP credentials not fully defined in .env.');
  console.warn('   Please set MAILTRAP_SMTP_USER and MAILTRAP_SMTP_PASS (or MAILTRAP_USER/MAILTRAP_PASSWORD).');
}

let transport;
try {
  transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
} catch (err) {
  console.error('❌ Error initializing SMTP transport:', err && err.message ? err.message : err);
}

const sender = {
  address: process.env.MAIL_FROM || 'mailtrap@example.com',
  name: process.env.MAIL_FROM_NAME || 'Shoply API',
};

export const sendEmail = async (to, subject, text, category = 'Integration Test') => {
  if (!transport) {
    throw new Error('Email transport is not initialized. Check Mailtrap SMTP credentials in .env');
  }

  try {
    const info = await transport.sendMail({
      from: `${sender.name} <${sender.address}>`,
      to,
      subject,
      text,
      // nodemailer does not use `category` by default; keep it in headers if needed
      headers: { 'X-Category': category },
    });
    console.log('✅ Email sent:', info.messageId || info);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error && error.message ? error.message : error);
    throw error;
  }
};
