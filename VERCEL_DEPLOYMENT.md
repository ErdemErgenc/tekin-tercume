# 🚀 Vercel Production Deployment Guide

Bu proje Vercel'e production olarak deploy edilebilir. Email servisi Vercel Functions kullanarak çalışır.

## 📋 Deployment Adımları

### 1. GitHub Repository'i Hazırla
```bash
git add .
git commit -m "Add Vercel Functions for email service"
git push origin main
```

### 2. Vercel'de Proje Oluştur
1. [Vercel Dashboard](https://vercel.com/dashboard)'a git
2. "New Project" tıkla
3. GitHub repo'sunu seç: `ErdemErgenc/tekin-tercume`
4. "Deploy" tıkla

### 3. Environment Variables'ı Set Et
Vercel Dashboard'da > Settings > Environment Variables:

```
EMAIL_USER=infotekintercume@gmail.com
GMAIL_USER=infotekintercume@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
GMAIL_APP_PASSWORD=your-gmail-app-password
NODE_ENV=production
```

### 4. Gmail App Password Oluştur
1. Google Account Settings > Security
2. 2-Factor Authentication'ı aç
3. App Passwords > Generate new password
4. Bu password'u Vercel environment variables'a ekle

## 🔧 API Endpoints (Production)

- **Quote Request**: `https://your-domain.vercel.app/api/send-quote`
- **Email Test**: `https://your-domain.vercel.app/api/test-email`

## 📁 File Structure

```
├── api/                    # Vercel Functions
│   ├── send-quote.js       # Email gönderimi
│   └── test-email.js       # Email test
├── src/                    # React frontend
├── server/                 # Local development server
├── vercel.json             # Vercel configuration
└── package.json
```

## 🎯 Local vs Production

### Local Development
```bash
npm run dev          # Frontend (Vite)
npm run server       # Email Server (Express)
```

### Production (Vercel)
- Frontend: Automatically built and deployed
- Email: Vercel Functions (`/api/send-quote`)
- Auto-detection: Frontend automatically uses correct API URL

## ✅ Testing Production

### 1. Test Email Function
```bash
curl https://your-domain.vercel.app/api/test-email
```

### 2. Test Quote Submission
Web sitesinde quote form'u kullan ve Gmail'i kontrol et.

## 🔍 Troubleshooting

### Common Issues:
1. **Environment variables missing**: Vercel Dashboard'da kontrol et
2. **Gmail authentication error**: App password doğru mu?
3. **CORS issues**: Functions CORS headers'ı include ediyor
4. **File upload limits**: Vercel 4.5MB limit var

### Debug Logs:
Vercel Dashboard > Functions > Logs

## 🎉 Benefits

✅ **Serverless**: Otomatik scaling
✅ **Fast**: CDN + Edge functions
✅ **Secure**: Environment variables korumalı
✅ **Free**: Hobby plan yeterli
✅ **SSL**: HTTPS otomatik
✅ **Git Integration**: Auto-deploy on push

## 🔄 Updates

Kod değişiklikleri için:
```bash
git add .
git commit -m "Update message"
git push origin main
```

Vercel otomatik olarak yeniden deploy eder.