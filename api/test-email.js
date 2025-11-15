// Vercel Function for testing email connection
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log('🔍 Testing Gmail SMTP connection...');
    console.log('   User:', process.env.EMAIL_USER || process.env.GMAIL_USER);
    console.log('   Pass length:', (process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD)?.length);

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || process.env.GMAIL_USER,
        pass: process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.verify();
    console.log('✅ Gmail SMTP connection verified!');

    // Send test email
    const testMail = await transporter.sendMail({
      from: process.env.EMAIL_USER || process.env.GMAIL_USER,
      to: process.env.EMAIL_USER || process.env.GMAIL_USER,
      subject: '✅ Test Email - Tekin Tercüme Vercel Function',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Vercel Function Email Test 🎉</h1>
          <p>Bu bir Vercel Function test emailidir.</p>
          <p>Gönderim zamanı: ${new Date().toLocaleString('tr-TR')}</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">Tekin Tercüme - Vercel Functions</p>
        </div>
      `
    });

    console.log('📧 Test email sent! Message ID:', testMail.messageId);

    res.status(200).json({
      success: true,
      message: 'Gmail SMTP connection successful! Test email sent from Vercel Function.',
      messageId: testMail.messageId,
      sentTo: process.env.EMAIL_USER || process.env.GMAIL_USER,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Gmail SMTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Gmail SMTP connection failed',
      error: error.message,
      code: error.code,
      command: error.command,
      timestamp: new Date().toISOString()
    });
  }
}