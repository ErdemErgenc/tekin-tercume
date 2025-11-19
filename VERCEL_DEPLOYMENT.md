# 🚀 Vercel Production Deployment Guide

Bu proje Vercel'e production olarak deploy edilir ve e‑posta gönderimi tamamen Vercel Functions (serverless) ile çalışır. Ayrı bir Node/Express sunucusu gerekmez.

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
EMAIL_PASSWORD=<GMAIL_APP_PASSWORD>
# (Opsiyonel)
EMAIL_RECIPIENT=info@tekintercume.com.tr
NODE_ENV=production
```

### 4. Gmail App Password Oluştur
1. Google Account Settings > Security
2. 2-Factor Authentication'ı aç
3. App Passwords > Generate new password
4. Bu password'u Vercel environment variables'a ekle

## 🔧 API Endpoints (Production)

- **Contact/Quote**: `https://your-domain.vercel.app/api/contact`
- **Email Stats**: `https://your-domain.vercel.app/api/email-stats`

## 📁 File Structure

```
├── api/                    # Vercel Functions
│   ├── _lib/
│   │   └── rate-limiter.js # Rate limit & günlük sayaç
│   ├── contact.js          # Email gönderimi (contact & quote)
│   └── email-stats.js      # İstatistik endpoint'i
├── src/                    # React frontend
├── vercel.json             # Vercel configuration
└── package.json
```

## 🎯 Local vs Production

### Local Development
```bash
npm install
npm run dev          # Frontend (Vite)
# Serverless fonksiyonlar lokal Vite ile çalışmaz; test için deploy edin veya `vercel dev` kullanın
```

### Production (Vercel)
- Frontend: Otomatik build & deploy
- Email: Vercel Functions (`/api/contact`)
- Frontend her zaman `'/api'` endpoint'ini kullanır

## ✅ Testing Production

### Test Quote/Contact Submission
Web sitesinde quote/iletişim formunu kullan ve Gmail'i kontrol et.

## 🔍 Troubleshooting

### Common Issues:
1. **Environment variables missing**: Vercel Dashboard'da kontrol et
2. **Gmail authentication error**: App password doğru mu? 2FA açık mı?
3. **Rate limit**: 429/503 hata kodlarında bir süre bekleyin
4. **File upload limits**: Vercel body limit ~20MB (ayarlanmıştır)

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