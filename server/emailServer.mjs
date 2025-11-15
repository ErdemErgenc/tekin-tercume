import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules için __dirname alternatifi
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from server directory

// Gmail SMTP Transporter Configuration
let transporter;

// Gmail ayarları kontrolü
if (!process.env.EMAIL_PASSWORD || process.env.EMAIL_PASSWORD.includes('BURAYA') || process.env.EMAIL_PASSWORD === 'your-app-password-here') {
  console.log('⚠️ TEST MODU: Gmail ayarları eksik, test modu kullanılıyor');
  // Test modu için ethereal email kullanılabilir, ama şimdilik normal ayarlarla devam
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || process.env.GMAIL_USER,
      pass: process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD
    }
  });
} else {
  // Production modu - Gmail SMTP
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || process.env.GMAIL_USER,
      pass: process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD
    }
  });
}

// Log configuration (without showing password)
console.log('📧 Gmail SMTP Config:');
console.log('   Email:', process.env.EMAIL_USER || process.env.GMAIL_USER);
console.log('   Password:', (process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD) ? '✅ Loaded' : '❌ Missing');

// Root endpoint - test sayfasına yönlendir
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-email.html'));
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Email server is running!' });
});

// Test Gmail connection
app.get('/api/test-email', async (req, res) => {
  try {
    console.log('🔍 Testing Gmail SMTP connection...');
    console.log('   User:', process.env.EMAIL_USER || process.env.GMAIL_USER);
    console.log('   Pass length:', (process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD)?.length);

    await transporter.verify();
    console.log('✅ Gmail SMTP connection verified!');

    // Send test email
    const testMail = await transporter.sendMail({
      from: process.env.EMAIL_USER || process.env.GMAIL_USER,
      to: process.env.EMAIL_USER || process.env.GMAIL_USER,
      subject: '✅ Test Email - Tekin Tercüme Gmail SMTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Gmail SMTP Çalışıyor! 🎉</h1>
          <p>Bu bir test emailidir.</p>
          <p>Gönderim zamanı: ${new Date().toLocaleString('tr-TR')}</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">Tekin Tercüme - Email Server Test</p>
        </div>
      `
    });

    console.log('📧 Test email sent! Message ID:', testMail.messageId);
    console.log('📬 Check inbox at:', process.env.EMAIL_USER || process.env.GMAIL_USER);

    res.json({
      success: true,
      message: 'Gmail SMTP connection successful! Test email sent.',
      messageId: testMail.messageId,
      sentTo: process.env.EMAIL_USER || process.env.GMAIL_USER
    });
  } catch (error) {
    console.error('❌ Gmail SMTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Gmail SMTP connection failed',
      error: error.message,
      code: error.code,
      command: error.command
    });
  }
});

// Send email endpoint
app.post('/api/send-quote', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      description,
      notaryApproval,
      notaryByOffice,
      multipleCopies,
      contactPreference,
      documentName
    } = req.body;

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `🎯 Yeni Teklif Talebi - ${name}`,
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
                <td style="padding: 8px 0;">${contactPreference || 'Belirtilmedi'}</td>
              </tr>
            </table>

            <h2 style="color: #000066; border-bottom: 2px solid #0000CC; padding-bottom: 10px; margin-top: 30px;">📄 Tercüme Detayları</h2>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; line-height: 1.8; white-space: pre-line;">${description || 'Detay belirtilmedi'}</p>
            </div>

            <p style="margin: 15px 0;">
              <strong>📎 Yüklenen Belge:</strong> ${documentName || 'Belge yüklenmedi'}
            </p>

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
              <tr>
                <td style="padding: 8px 0;">
                  ${multipleCopies === 'yes' ? '✅' : '❌'} Birden fazla nüsha istiyorum
                </td>
              </tr>
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

    res.json({
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
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Email server running on http://localhost:${PORT}`);
  console.log(`📧 Ready to send emails via Gmail SMTP`);
});
