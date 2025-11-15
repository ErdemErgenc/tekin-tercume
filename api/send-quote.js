// Vercel Function for email sending
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

// Gmail SMTP Transporter Configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || process.env.GMAIL_USER,
      pass: process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD
    }
  });
};

export default async function handler(req, res) {
  // CORS headers - Allow all origins
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log('📬 New quote request received!');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const {
      name,
      email,
      phone,
      description,
      notaryApproval,
      notaryByOffice,
      multipleCopies,
      contactPreference,
      contactMethod,
      documentName,
      documentBase64,
      documentType,
      fromLang,
      toLang,
      urgency
    } = req.body;

    // Create transporter
    const transporter = createTransporter();

    // Prepare attachments
    const attachments = [];
    if (documentBase64 && documentName) {
      attachments.push({
        filename: documentName,
        content: documentBase64,
        encoding: 'base64',
        contentType: documentType || 'application/octet-stream'
      });
      console.log(`📎 Attachment added: ${documentName} (${documentType || 'unknown type'})`);
    }

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `🎯 Yeni Teklif Talebi - ${name}`,
      attachments: attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #000066 0%, #0000CC 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🎯 Yeni Teklif Talebi</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #000066; border-bottom: 2px solid #0000CC; padding-bottom: 10px;">👤 Müşteri Bilgileri</h2>
            <table style="width: 100%; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Ad Soyad:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">📞 Telefon:</td>
                <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">📧 E-posta:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">💬 İletişim Tercihi:</td>
                <td style="padding: 8px 0;">${contactMethod || contactPreference || 'Belirtilmedi'}</td>
              </tr>
            </table>

            <h2 style="color: #000066; border-bottom: 2px solid #0000CC; padding-bottom: 10px; margin-top: 30px;">📄 Tercüme Detayları</h2>
            ${fromLang && toLang ? `
            <table style="width: 100%; margin: 20px 0; background: #f0f9ff; padding: 15px; border-radius: 8px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">🌐 Kaynak Dil:</td>
                <td style="padding: 8px 0;">${fromLang}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">🎯 Hedef Dil:</td>
                <td style="padding: 8px 0;">${toLang}</td>
              </tr>
              ${urgency ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">⚡ Aciliyet:</td>
                <td style="padding: 8px 0;">${urgency === 'very-urgent' ? '🔴 Çok Acil' : urgency === 'urgent' ? '🟡 Acil' : '🟢 Normal'}</td>
              </tr>
              ` : ''}
            </table>
            ` : ''}
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; line-height: 1.8; white-space: pre-line;">${description || 'Detay belirtilmedi'}</p>
            </div>

            ${documentName ? `
            <p style="margin: 15px 0; background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
              <strong>📎 Yüklenen Belge:</strong> ${documentName}
              <br>
              <small style="color: #666;">Belge email'e eklenmiştir (Attachments/Ekler bölümünden açabilirsiniz)</small>
            </p>
            ` : ''}

            <h2 style="color: #000066; border-bottom: 2px solid #0000CC; padding-bottom: 10px; margin-top: 30px;">✅ Hizmet Tercihleri</h2>
            <table style="width: 100%; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 0;">
                  ${notaryApproval === 'yes' ? '✅' : '❌'} Tercümelerimi noterden tasdik edeceğim
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">
                  ${notaryByOffice === 'yes' ? '✅' : '❌'} Noter tasdiki çeviri bürosu tarafından yapılsın
                </td>
              </tr>
              ${multipleCopies && multipleCopies !== '1' ? `
              <tr>
                <td style="padding: 8px 0;">
                  📑 <strong>${multipleCopies} adet nüsha istiyorum</strong>
                </td>
              </tr>
              ` : ''}
            </table>

            <div style="background: #e8f4f8; border-left: 4px solid #0000CC; padding: 15px; margin-top: 30px; border-radius: 4px;">
              <p style="margin: 0; color: #555;">
                <strong>⏰ Talep Zamanı:</strong> ${new Date().toLocaleString('tr-TR', {
        dateStyle: 'full',
        timeStyle: 'short'
      })}
              </p>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p style="margin: 5px 0;">Tekin Tercüme - Profesyonel Çeviri Hizmetleri</p>
            <p style="margin: 5px 0;">📞 +90 544 721 53 15 | +90 424 238 72 54</p>
            <p style="margin: 5px 0;">📧 infotekintercume@gmail.com</p>
          </div>
        </div>
      `
    };

    // Send email
    console.log('📤 Sending email to:', mailOptions.to);
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Email send error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message,
      details: error.toString()
    });
  }
}