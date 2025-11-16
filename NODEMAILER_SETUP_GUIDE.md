# 📧 Nodemailer ile Backend'siz E-posta Gönderimi - Tam Kurulum Rehberi

Bu rehber, Next.js projenizde **hiçbir backend sunucuya ihtiyaç duymadan** e-posta gönderim sistemi kurmanızı sağlar.

---

## 🎯 Neler Yapacağız?

- ✅ Next.js API Routes ile backend'siz e-posta sistemi
- ✅ Gmail SMTP üzerinden ücretsiz e-posta gönderimi
- ✅ DDoS koruması (Rate Limiting)
- ✅ Günlük e-posta limiti koruması
- ✅ Test modu ve Production modu
- ✅ TypeScript desteği
- ✅ **0 TL maliyet!**

---

## 📦 Adım 1: Gerekli Paketleri Yükleyin

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

Ya da yarn ile:

```bash
yarn add nodemailer
yarn add -D @types/nodemailer
```

---

## 🔐 Adım 2: Gmail App Password Oluşturun

### 2.1. Gmail Ayarlarına Gidin

1. https://myaccount.google.com/ adresine gidin
2. Sol menüden **"Güvenlik"** sekmesine tıklayın
3. **"2 Adımlı Doğrulama"**'yı açın (eğer kapalıysa)

### 2.2. App Password Oluşturun

1. Arama kutusuna **"App passwords"** yazın veya bu linke gidin:  
   https://myaccount.google.com/apppasswords
2. **"Uygulama seçin"** → **Mail** seçin
3. **"Cihaz seçin"** → **Diğer (Özel ad)** seçin
4. Bir isim yazın (örn: "My Website")
5. **"Oluştur"** butonuna tıklayın
6. Görünen **16 haneli şifreyi kopyalayın** (boşluklar olmadan)

📌 **Önemli:** Bu şifre sadece bir kez gösterilir! Kaybederseniz yeni oluşturmanız gerekir.

### 2.3. .env.local Dosyası Oluşturun

Projenizin root klasöründe `.env.local` dosyası oluşturun:

```env
# E-posta Ayarları
EMAIL_USER=sizin-gmail@gmail.com
EMAIL_PASSWORD=sizin-16-haneli-app-password

# Alıcı E-posta (isteğe bağlı, kodda da belirtebilirsiniz)
EMAIL_RECIPIENT=info@yourcompany.com
```

**Örnek:**
```env
EMAIL_USER=yazilimartos@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop  # Boşlukları silin → abcdefghijklmnop
EMAIL_RECIPIENT=yazilimartos@gmail.com
```

---

## 🛡️ Adım 3: Rate Limiter Oluşturun (Güvenlik)

`src/lib/rate-limiter.ts` dosyasını oluşturun:

```typescript
/**
 * Rate Limiter
 * Gmail SMTP günlük limit koruması ve DDoS saldırılarına karşı güvenlik
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (production'da Redis kullanılabilir)
const store: RateLimitStore = {};

// Günlük toplam mail sayacı
let dailyEmailCount = 0;
let dailyResetTime = Date.now() + 24 * 60 * 60 * 1000; // 24 saat sonra

// Limitler
const LIMITS = {
  // IP bazlı limitler (DDoS koruması)
  PER_IP_PER_MINUTE: 2, // Bir IP'den dakikada max 2 istek
  PER_IP_PER_HOUR: 10, // Bir IP'den saatte max 10 istek
  PER_IP_PER_DAY: 20, // Bir IP'den günde max 20 istek

  // Global limitler (Gmail SMTP koruması)
  DAILY_EMAIL_LIMIT: 400, // Günde toplam 400 mail (Gmail limit: 500)
};

/**
 * Rate limit kontrolü
 */
export function checkRateLimit(
  identifier: string,
  limitType: "minute" | "hour" | "day"
): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  error?: string;
} {
  const now = Date.now();

  // Günlük email limiti kontrolü
  if (now > dailyResetTime) {
    dailyEmailCount = 0;
    dailyResetTime = now + 24 * 60 * 60 * 1000;
  }

  if (dailyEmailCount >= LIMITS.DAILY_EMAIL_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: dailyResetTime,
      error: "Günlük e-posta limiti aşıldı. Lütfen yarın tekrar deneyin.",
    };
  }

  // Limit türüne göre süre ve max istek sayısı
  let duration: number;
  let maxRequests: number;

  switch (limitType) {
    case "minute":
      duration = 60 * 1000; // 1 dakika
      maxRequests = LIMITS.PER_IP_PER_MINUTE;
      break;
    case "hour":
      duration = 60 * 60 * 1000; // 1 saat
      maxRequests = LIMITS.PER_IP_PER_HOUR;
      break;
    case "day":
      duration = 24 * 60 * 60 * 1000; // 1 gün
      maxRequests = LIMITS.PER_IP_PER_DAY;
      break;
  }

  const key = `${identifier}_${limitType}`;
  const record = store[key];

  // İlk istek veya süre dolmuş
  if (!record || now > record.resetTime) {
    store[key] = {
      count: 1,
      resetTime: now + duration,
    };

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + duration,
    };
  }

  // Limit kontrolü
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      error: `Çok fazla istek gönderdiniz. ${Math.ceil(
        (record.resetTime - now) / 1000
      )} saniye sonra tekrar deneyin.`,
    };
  }

  // İstek sayısını artır
  record.count++;

  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * E-posta gönderimi sonrası sayacı artır
 */
export function incrementDailyEmailCount(): void {
  dailyEmailCount++;
}

/**
 * IP adresini al (Cloudflare, proxy vs. desteği ile)
 */
export function getClientIP(request: Request): string {
  // Cloudflare
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp;

  // Proxy
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }

  // X-Real-IP
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) return xRealIp;

  // Fallback
  return "unknown";
}

/**
 * Rate limit durumunu temizle (test için)
 */
export function clearRateLimits(): void {
  for (const key in store) {
    delete store[key];
  }
  dailyEmailCount = 0;
}

/**
 * Günlük email sayacını al
 */
export function getDailyEmailCount(): {
  current: number;
  limit: number;
  remaining: number;
  resetTime: number;
} {
  return {
    current: dailyEmailCount,
    limit: LIMITS.DAILY_EMAIL_LIMIT,
    remaining: LIMITS.DAILY_EMAIL_LIMIT - dailyEmailCount,
    resetTime: dailyResetTime,
  };
}
```

---

## 📨 Adım 4: İletişim Formu API Route Oluşturun

`src/app/api/contact/route.ts` dosyasını oluşturun:

```typescript
import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  checkRateLimit,
  getClientIP,
  incrementDailyEmailCount,
  getDailyEmailCount,
} from "@/lib/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    // IP adresini al
    const clientIP = getClientIP(request);

    // Rate limit kontrolü - Dakika bazlı (DDoS koruması)
    const minuteCheck = checkRateLimit(clientIP, "minute");
    if (!minuteCheck.allowed) {
      console.warn(`⚠️ Rate limit aşıldı (dakika): ${clientIP}`);
      return NextResponse.json(
        {
          error: minuteCheck.error,
          retryAfter: Math.ceil((minuteCheck.resetTime - Date.now()) / 1000),
        },
        { status: 429 } // Too Many Requests
      );
    }

    // Rate limit kontrolü - Saat bazlı
    const hourCheck = checkRateLimit(clientIP, "hour");
    if (!hourCheck.allowed) {
      console.warn(`⚠️ Rate limit aşıldı (saat): ${clientIP}`);
      return NextResponse.json(
        {
          error: hourCheck.error,
          retryAfter: Math.ceil((hourCheck.resetTime - Date.now()) / 1000),
        },
        { status: 429 }
      );
    }

    // Rate limit kontrolü - Gün bazlı
    const dayCheck = checkRateLimit(clientIP, "day");
    if (!dayCheck.allowed) {
      console.warn(`⚠️ Rate limit aşıldı (gün): ${clientIP}`);
      return NextResponse.json(
        {
          error: dayCheck.error,
          retryAfter: Math.ceil((dayCheck.resetTime - Date.now()) / 1000),
        },
        { status: 429 }
      );
    }

    // Günlük email limiti kontrolü
    const dailyStats = getDailyEmailCount();
    if (dailyStats.remaining <= 0) {
      console.error("🚫 Günlük email limiti aşıldı!");
      return NextResponse.json(
        {
          error:
            "Sistem günlük e-posta limitine ulaştı. Lütfen yarın tekrar deneyin.",
          retryAfter: Math.ceil((dailyStats.resetTime - Date.now()) / 1000),
        },
        { status: 503 } // Service Unavailable
      );
    }

    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Tüm alanları doldurunuz" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta adresi giriniz" },
        { status: 400 }
      );
    }

    // Transporter oluştur
    let transporter;

    // Eğer EMAIL_PASSWORD yoksa veya placeholder ise, test modunda çalış
    if (
      !process.env.EMAIL_PASSWORD ||
      process.env.EMAIL_PASSWORD.includes("BURAYA") ||
      process.env.EMAIL_PASSWORD === "your-app-password-here"
    ) {
      // TEST MODU: Ethereal Email kullan (gerçek e-posta göndermez)
      console.log("⚠️ TEST MODU: Gmail ayarları eksik, test modu kullanılıyor");
      const testAccount = await nodemailer.createTestAccount();

      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      console.log("📧 Test hesabı oluşturuldu:", testAccount.user);
    } else {
      // PRODUCTION MODU: Gmail SMTP kullan
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    // E-posta içeriği
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER, // Alıcı e-posta
      subject: `İletişim Formu - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            Yeni İletişim Formu Mesajı
          </h2>
          
          <div style="margin: 20px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
            <p style="margin: 10px 0;">
              <strong style="color: #4F46E5;">Ad Soyad:</strong> ${name}
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #4F46E5;">E-posta:</strong> 
              <a href="mailto:${email}" style="color: #4F46E5;">${email}</a>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #4F46E5;">Telefon:</strong> 
              <a href="tel:${phone}" style="color: #4F46E5;">${phone}</a>
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Mesaj:</h3>
            <div style="padding: 15px; background-color: #ffffff; border-left: 4px solid #4F46E5; white-space: pre-wrap;">
              ${message}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>Bu mesaj web sitesi iletişim formundan gönderilmiştir.</p>
            <p>Gönderim zamanı: ${new Date().toLocaleString("tr-TR")}</p>
          </div>
        </div>
      `,
      replyTo: email, // Yanıt verirken otomatik olarak gönderenin e-postası kullanılır
    };

    // E-postayı gönder
    const info = await transporter.sendMail(mailOptions);

    // Başarılı gönderim - sayacı artır
    incrementDailyEmailCount();

    // Günlük istatistikleri logla
    const updatedStats = getDailyEmailCount();
    console.log(
      `📧 E-posta gönderildi! Günlük: ${updatedStats.current}/${updatedStats.limit} (Kalan: ${updatedStats.remaining})`
    );

    // Test modunda link göster
    if (info.messageId && nodemailer.getTestMessageUrl(info)) {
      const testUrl = nodemailer.getTestMessageUrl(info);
      console.log("📨 Test e-postası gönderildi!");
      console.log("🔗 E-postayı görüntülemek için:", testUrl);

      return NextResponse.json(
        {
          success: true,
          message: "E-posta başarıyla gönderildi (Test Modu)",
          testUrl: testUrl, // Frontend'de göstermek için
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, message: "E-posta başarıyla gönderildi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
    return NextResponse.json(
      { error: "E-posta gönderilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
```

---

## 🎨 Adım 5: Frontend Formu Oluşturun

`src/app/contact/page.tsx` veya istediğiniz yerde:

```typescript
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Gönderiliyor..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: data.message || "E-posta başarıyla gönderildi!",
        });
        // Formu temizle
        setFormData({ name: "", email: "", phone: "", message: "" });

        // Test URL varsa göster
        if (data.testUrl) {
          console.log("📧 Test E-postası:", data.testUrl);
        }
      } else {
        setStatus({
          type: "error",
          message: data.error || "Bir hata oluştu",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Bağlantı hatası oluştu",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">İletişim</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Ad Soyad *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">E-posta *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Telefon *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Mesajınız *</label>
          <textarea
            required
            rows={6}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={status.type === "loading"}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {status.type === "loading" ? "Gönderiliyor..." : "Gönder"}
        </button>

        {/* Status Mesajı */}
        {status.message && (
          <div
            className={`p-4 rounded-lg ${
              status.type === "success"
                ? "bg-green-100 text-green-800"
                : status.type === "error"
                ? "bg-red-100 text-red-800"
                : ""
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
```

---

## 📊 Adım 6: E-posta İstatistikleri API (İsteğe Bağlı)

Günlük e-posta sayısını kontrol etmek için:

`src/app/api/email-stats/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { getDailyEmailCount } from "@/lib/rate-limiter";

export async function GET() {
  const stats = getDailyEmailCount();

  const percentage = Math.round((stats.current / stats.limit) * 100);
  const resetDate = new Date(stats.resetTime).toLocaleString("tr-TR");
  const hoursUntilReset = Math.ceil(
    (stats.resetTime - Date.now()) / (1000 * 60 * 60)
  );

  let statusMessage = "✅ Sistem normal çalışıyor";
  if (stats.remaining === 0) {
    statusMessage = "🚫 Günlük limit doldu!";
  } else if (stats.remaining < 50) {
    statusMessage = "⚠️ Limit dolmak üzere!";
  }

  return NextResponse.json({
    success: true,
    stats: {
      current: stats.current,
      limit: stats.limit,
      remaining: stats.remaining,
      percentage,
      resetTime: resetDate,
      resetIn: hoursUntilReset,
    },
    message: statusMessage,
  });
}
```

Kullanımı:
```bash
# Local
curl http://localhost:3000/api/email-stats

# Production
curl https://yoursite.com/api/email-stats
```

---

## 🧪 Adım 7: Test Edin

### Local Test (Development)

1. Sunucuyu başlatın:
```bash
npm run dev
```

2. http://localhost:3000/contact adresine gidin

3. Formu doldurun ve gönderin

4. **Test Modundaysa:**
   - Console'da test linki göreceksiniz
   - Linke tıklayıp e-postayı görüntüleyin

5. **Production Modundaysa:**
   - Gmail'inizi kontrol edin (Spam klasörünü de)

---

## 🚀 Production'a Alın

### Vercel

1. `.env.local` dosyasındaki değişkenleri Vercel'e ekleyin:
   - Proje Settings → Environment Variables
   - `EMAIL_USER` ve `EMAIL_PASSWORD` ekleyin

2. Deploy edin:
```bash
vercel --prod
```

### Netlify

1. Environment Variables bölümünden ekleyin

2. Deploy:
```bash
netlify deploy --prod
```

### Cloudflare Pages

1. Wrangler secrets:
```bash
wrangler secret put EMAIL_USER
wrangler secret put EMAIL_PASSWORD
```

2. Deploy:
```bash
npm run deploy
```

---

## 🔧 Özelleştirme

### Limitleri Değiştirme

`src/lib/rate-limiter.ts` dosyasında:

```typescript
const LIMITS = {
  PER_IP_PER_MINUTE: 5,    // Dakikada 5 istek
  PER_IP_PER_HOUR: 20,     // Saatte 20 istek
  PER_IP_PER_DAY: 50,      // Günde 50 istek
  DAILY_EMAIL_LIMIT: 400,  // Günlük toplam 400 mail
};
```

### Farklı E-posta Sağlayıcıları

#### Outlook / Hotmail

```typescript
transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

#### Yahoo Mail

```typescript
transporter = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

#### Özel SMTP Sunucu

```typescript
transporter = nodemailer.createTransport({
  host: "smtp.yourserver.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

---

## 🐛 Sorun Giderme

### E-posta Gönderilmiyor

**1. Console'da hata var mı?**
```bash
# Browser console'u açın (F12)
# Terminal console'u kontrol edin
```

**2. Çevre değişkenleri doğru mu?**
```bash
# .env.local dosyasını kontrol edin
# Sunucuyu yeniden başlatın: npm run dev
```

**3. Gmail ayarları doğru mu?**
- 2 Adımlı Doğrulama açık mı?
- App Password doğru mu?
- Boşluklar kaldırıldı mı?

**4. Rate limit aşıldı mı?**
```bash
# İstatistikleri kontrol edin
curl http://localhost:3000/api/email-stats
```

### "Invalid login" Hatası

```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

**Çözüm:**
1. App Password'ü yeniden oluşturun
2. Boşlukları kaldırın
3. `.env.local` dosyasını kaydedin
4. Sunucuyu yeniden başlatın

### Rate Limit Hataları

**429 Too Many Requests:**
- Çok fazla istek göndermişsiniz
- Belirtilen süre kadar bekleyin
- IP değişirse (VPN, mobil data) sıfırlanır

**503 Service Unavailable:**
- Günlük 400 mail limiti dolmuş
- Yarın saat 00:00'da sıfırlanacak

---

## 💰 Maliyet Analizi

### Gmail (Ücretsiz)
- ✅ **0 TL / ay**
- 500 e-posta / gün
- Sınırsız hesap
- Güvenilir altyapı

### Google Workspace (Ücretli)
- **$6 / ay**
- 2,000 e-posta / gün
- Özel domain desteği
- İşletmeler için ideal

### SendGrid (Freemium)
- **0 TL:** 100 e-posta / gün
- **$19.95 / ay:** 40,000 e-posta / ay

### AWS SES (En Uygun)
- **0 TL:** İlk 62,000 e-posta / ay (EC2'den)
- **$0.10 / 1,000 e-posta** sonrası

---

## 📚 Ekstra Özellikler

### E-posta Şablonları

`src/lib/email-templates.ts` oluşturun:

```typescript
export const contactEmailTemplate = (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>İletişim Formu</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #4F46E5; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
      Yeni İletişim Formu Mesajı
    </h2>
    
    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p><strong>Ad Soyad:</strong> ${data.name}</p>
      <p><strong>E-posta:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Telefon:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
    </div>

    <div style="margin: 20px 0;">
      <h3>Mesaj:</h3>
      <div style="background-color: #fff; padding: 15px; border-left: 4px solid #4F46E5;">
        ${data.message}
      </div>
    </div>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
      <p>Bu mesaj web sitenizden gönderilmiştir.</p>
      <p>Gönderim zamanı: ${new Date().toLocaleString("tr-TR")}</p>
    </div>
  </div>
</body>
</html>
`;
```

Kullanımı:
```typescript
import { contactEmailTemplate } from "@/lib/email-templates";

const mailOptions = {
  // ...
  html: contactEmailTemplate({ name, email, phone, message }),
};
```

### Dosya Ekleri (Attachments)

```typescript
const mailOptions = {
  // ...
  attachments: [
    {
      filename: "logo.png",
      path: "/public/logo.png",
    },
    {
      filename: "document.pdf",
      path: "/uploads/document.pdf",
    },
  ],
};
```

---

## ✅ Checklist

Kurulumu tamamladıktan sonra:

- [ ] Nodemailer ve TypeScript tipleri yüklendi
- [ ] Gmail App Password oluşturuldu
- [ ] `.env.local` dosyası oluşturuldu ve dolduruldu
- [ ] Rate limiter oluşturuldu
- [ ] API route oluşturuldu
- [ ] Frontend formu oluşturuldu
- [ ] Local'de test edildi
- [ ] Production'a deploy edildi
- [ ] Production'da test edildi
- [ ] Spam klasörü kontrol edildi
- [ ] Email stats API çalışıyor

---

## 📖 Kaynaklar

- [Nodemailer Docs](https://nodemailer.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Gmail App Password](https://support.google.com/accounts/answer/185833)
- [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)

---

## 🎉 Tebrikler!

Artık **backend sunucuya ihtiyaç duymadan** Next.js projenizde e-posta gönderimi yapabiliyorsunuz!

### Özellikler:
✅ Ücretsiz Gmail SMTP  
✅ DDoS koruması  
✅ Günlük limit koruması  
✅ Test modu desteği  
✅ TypeScript desteği  
✅ Production ready  

**Not:** Bu dosyayı başka projelerinize kopyalayabilir ve aynı adımları takip edebilirsiniz!
