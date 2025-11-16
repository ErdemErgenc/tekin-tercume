// Vercel Serverless Function: Contact/Quote email via Gmail SMTP
import nodemailer from 'nodemailer';
import { checkRateLimit, getClientIP, incrementDailyEmailCount, getDailyEmailCount } from './_lib/rate-limiter.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

function createTransporter() {
  const user = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD;

  // If no password or placeholder, fall back to Ethereal test transport
  if (!pass || pass.includes('BURAYA') || pass === 'your-app-password-here') {
    return null; // will create ethereal below when needed
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

function buildHtmlFromPayload(payload) {
  const {
    name, email, phone,
    message, description,
    notaryApproval, notaryByOffice, multipleCopies,
    contactPreference, contactMethod,
    fromLang, toLang, urgency,
    documentName,
  } = payload;

  const finalMessage = message || description || '';
  const pref = contactMethod || contactPreference || 'Belirtilmedi';
  const urgencyLabel = urgency === 'very-urgent' ? '🔴 Çok Acil' : urgency === 'urgent' ? '🟡 Acil' : (urgency ? '🟢 Normal' : 'Belirtilmedi');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
      <div style="background: linear-gradient(135deg, #000066 0%, #0000CC 100%); color: white; padding: 24px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">Yeni İletişim / Teklif Talebi</h1>
      </div>

      <div style="background: white; padding: 24px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
        <h2 style="color: #000066; border-bottom: 2px solid #0000CC; padding-bottom: 8px;">Müşteri Bilgileri</h2>
        <table style="width: 100%; margin: 12px 0;">
          <tr><td style="padding: 6px 0; font-weight: bold; color: #555;">Ad Soyad:</td><td style="padding: 6px 0;">${name || 'Belirtilmedi'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #555;">Telefon:</td><td style="padding: 6px 0;">${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Belirtilmedi'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #555;">E-posta:</td><td style="padding: 6px 0;">${email ? `<a href="mailto:${email}">${email}</a>` : 'Belirtilmedi'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; color: #555;">İletişim Tercihi:</td><td style="padding: 6px 0;">${pref}</td></tr>
        </table>

        ${(fromLang || toLang || urgency) ? `
        <h2 style="color: #000066; border-bottom: 2px solid #0000CC; padding-bottom: 8px; margin-top: 18px;">Tercüme Detayları</h2>
        <table style="width: 100%; margin: 12px 0; background: #f0f9ff; padding: 12px; border-radius: 8px;">
          ${fromLang ? `<tr><td style='padding:6px 0; font-weight:bold; color:#555;'>Kaynak Dil:</td><td style='padding:6px 0;'>${fromLang}</td></tr>` : ''}
          ${toLang ? `<tr><td style='padding:6px 0; font-weight:bold; color:#555;'>Hedef Dil:</td><td style='padding:6px 0;'>${toLang}</td></tr>` : ''}
          ${urgency ? `<tr><td style='padding:6px 0; font-weight:bold; color:#555;'>Aciliyet:</td><td style='padding:6px 0;'>${urgencyLabel}</td></tr>` : ''}
        </table>` : ''}

        ${finalMessage ? `
        <div style="background: #f7f7f7; padding: 12px; border-radius: 8px; margin: 12px 0; white-space: pre-wrap;">
          ${finalMessage}
        </div>` : ''}

        ${(notaryApproval || notaryByOffice || multipleCopies) ? `
        <h2 style="color: #000066; border-bottom: 2px solid #0000CC; padding-bottom: 8px; margin-top: 18px;">Hizmet Tercihleri</h2>
        <table style="width: 100%; margin: 12px 0;">
          ${notaryApproval ? `<tr><td style='padding:6px 0;'>${notaryApproval === 'yes' ? '✅' : '❌'} Noter onayı</td></tr>` : ''}
          ${typeof notaryByOffice !== 'undefined' && notaryByOffice !== '' ? `<tr><td style='padding:6px 0;'>${notaryByOffice === 'yes' ? '✅' : '❌'} Noter tasdiki büro tarafından</td></tr>` : ''}
          ${multipleCopies && multipleCopies !== '1' ? `<tr><td style='padding:6px 0;'>📑 ${multipleCopies} adet nüsha</td></tr>` : ''}
        </table>` : ''}

        ${documentName ? `
        <p style="margin: 15px 0; background: #fff3cd; padding: 12px; border-radius: 8px; border-left: 4px solid #ffc107;">
          <strong>📎 Yüklenen Belge:</strong> ${documentName}
          <br><small style="color:#666;">Belge e-posta ekinde yer alır</small>
        </p>` : ''}

        <div style="background: #e8f4f8; border-left: 4px solid #0000CC; padding: 12px; margin-top: 20px; border-radius: 4px;">
          <p style="margin: 0; color: #555;">Gönderim zamanı: ${new Date().toLocaleString('tr-TR')}</p>
        </div>
      </div>
    </div>
  `;
}

export default async function handler(req, res) {
  // Basic CORS (Vercel also sets headers via vercel.json)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const clientIP = getClientIP(req);

    const minuteCheck = checkRateLimit(clientIP, 'minute');
    if (!minuteCheck.allowed) {
      return res.status(429).json({ error: minuteCheck.error, retryAfter: Math.ceil((minuteCheck.resetTime - Date.now()) / 1000) });
    }
    const hourCheck = checkRateLimit(clientIP, 'hour');
    if (!hourCheck.allowed) {
      return res.status(429).json({ error: hourCheck.error, retryAfter: Math.ceil((hourCheck.resetTime - Date.now()) / 1000) });
    }
    const dayCheck = checkRateLimit(clientIP, 'day');
    if (!dayCheck.allowed) {
      return res.status(429).json({ error: dayCheck.error, retryAfter: Math.ceil((dayCheck.resetTime - Date.now()) / 1000) });
    }

    const stats = getDailyEmailCount();
    if (stats.remaining <= 0) {
      return res.status(503).json({ error: 'Sistem günlük e-posta limitine ulaştı. Lütfen yarın tekrar deneyin.', retryAfter: Math.ceil((stats.resetTime - Date.now()) / 1000) });
    }

    const body = req.body || {};
    const { name, email, phone } = body;
    const msgOrDesc = body.message || body.description;

    if (!name || !email || !phone || !msgOrDesc) {
      return res.status(400).json({ error: 'Lütfen ad, e-posta, telefon ve mesaj alanlarını doldurun.' });
    }

    let transporter = createTransporter();
    let usingTest = false;
    if (!transporter) {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      usingTest = true;
    }

    const attachments = [];
    if (body.documentBase64 && body.documentName) {
      attachments.push({
        filename: body.documentName,
        content: body.documentBase64,
        encoding: 'base64',
        contentType: body.documentType || 'application/octet-stream',
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || process.env.GMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER || process.env.GMAIL_USER,
      subject: `Web Form - ${name}`,
      html: buildHtmlFromPayload(body),
      replyTo: email,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    incrementDailyEmailCount();

    if (usingTest) {
      const preview = nodemailer.getTestMessageUrl(info);
      return res.status(200).json({ success: true, message: 'E-posta başarıyla gönderildi (Test Modu)', testUrl: preview, messageId: info.messageId });
    }

    return res.status(200).json({ success: true, message: 'E-posta başarıyla gönderildi', messageId: info.messageId });
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return res.status(500).json({ error: 'E-posta gönderilirken bir hata oluştu', details: error?.message || String(error) });
  }
}