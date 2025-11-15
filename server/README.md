# Gmail SMTP Email Server

Bu proje, Tekin Tercüme website'inden gelen teklif taleplerini Gmail SMTP üzerinden `infotekintercume@gmail.com` adresine gönderir.

## 🚀 Kurulum ve Çalıştırma

### 1. Backend Server'ı Başlatın
Yeni bir terminal açın ve:
```bash
npm run server
```

Başarılı olursa göreceksiniz:
```
✅ Email server running on http://localhost:3001
📧 Ready to send emails via Gmail SMTP
```

### 2. Frontend'i Başlatın
Başka bir terminal açın ve:
```bash
npm run dev
```

## 📧 Gmail SMTP Ayarları

**Email:** infotekintercume@gmail.com  
**App Password:** gaio coxp zstn fxat

### Gmail App Password Nasıl Alınır?

1. Google Hesabınıza giriş yapın
2. https://myaccount.google.com/security adresine gidin
3. "2-Step Verification" açık olmalı
4. "App passwords" bölümüne gidin
5. "Select app" → Mail, "Select device" → Other
6. İsim verin (örn: "Tekin Tercume Web")
7. Oluşturulan 16 haneli şifreyi `server/emailServer.mjs` dosyasındaki `pass` alanına yapıştırın

## 🔧 Nasıl Çalışır?

1. Kullanıcı website'de "Teklif Al" formunu doldurur
2. Frontend, `http://localhost:3001/api/send-quote` adresine POST request gönderir
3. Backend server, Gmail SMTP ile e-postayı `infotekintercume@gmail.com` adresine gönderir
4. Kullanıcı başarı mesajı görür

## 📄 Email İçeriği

Email şu bilgileri içerir:
- 👤 Müşteri Bilgileri (Ad, Telefon, Email, İletişim Tercihi)
- 📄 Tercüme Detayları
- 📎 Yüklenen Belge Adı
- ✅ Hizmet Tercihleri (Noter tasdiki, Nüsha sayısı)
- ⏰ Talep Zamanı

## 🛡️ Güvenlik

- Gmail App Password kullanılıyor (normal şifre değil)
- CORS sadece localhost:5173'e izin veriyor
- Hassas bilgiler `.env` dosyasında saklanabilir (opsiyonel)

## 🌐 Production'a Alırken

Production'da backend'i bir sunucuya deploy etmeniz gerekir:
- **Heroku** (ücretsiz tier var)
- **Railway** (5$/ay)
- **Vercel** (serverless functions)
- **DigitalOcean** (droplet)

Frontend'teki API URL'ini production backend URL'i ile değiştirin:
```typescript
// Development
const response = await fetch('http://localhost:3001/api/send-quote', ...);

// Production
const response = await fetch('https://your-backend.herokuapp.com/api/send-quote', ...);
```

## 🧪 Test

Server test endpoint'i:
```bash
curl http://localhost:3001/api/test
```

Yanıt:
```json
{"message":"Email server is running!"}
```

## 📝 Notlar

- Her iki server'ın da aynı anda çalışması gerekir
- Port 3001'in boş olması gerekir
- Gmail güvenlik ayarlarınızı kontrol edin
- Günlük email limiti: ~500 email (Gmail Free)
