# Tekin Tercüme Website

Modern ve profesyonel bir çeviri hizmetleri web sitesi. React + TypeScript ile geliştirilmiştir.

## 🚀 Özellikler

- **Modern Tasarım**: Mavi gradyan teması (#000066 - #0000CC) ile profesyonel görünüm
- **Çok Dilli Destek**: 15+ dilde çeviri hizmetleri
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görüntü
- **Interactive Form**: Çok adımlı teklif talep sistemi
- **Profesyonel Hizmetler**: Tercüme, vize ve göçmenlik danışmanlığı
- **SEO Optimized**: Arama motorları için optimize edilmiş

## 🛠️ Teknolojiler

- React 18
- TypeScript
- Vite
- CSS3 (Custom Properties)
- Responsive Design

## 📁 Proje Yapısı

```
src/
├── components/              # React bileşenleri (14 TSX + 14 CSS + README)
│   ├── Header.tsx          # Ana menü ve navigasyon
│   ├── Hero.tsx            # Ana sayfa hero alanı
│   ├── Services.tsx        # Hizmetler bölümü
│   ├── About.tsx           # Hakkımızda bölümü
│   ├── Languages.tsx       # Dil listesi
│   ├── LanguageDetail.tsx  # Tek dil detay sayfası
│   ├── LanguagePage.tsx    # Dil sayfası şablonu
│   ├── Contact.tsx         # İletişim sayfası
│   ├── FAQ.tsx             # Sıkça sorulan sorular
│   ├── Footer.tsx          # Alt bilgi
│   ├── QuoteRequest.tsx    # Teklif talep formu (modal)
│   ├── QuickQuote.tsx      # Hızlı teklif sayfası
│   ├── ServicePage.tsx     # Hizmet sayfası şablonu
│   ├── VisaServices.tsx    # Vize hizmetleri detay
│   └── README.md           # Bileşenler dokümantasyonu
├── images/                 # Görseller
│   └── tlogo.svg          # Tekin Tercüme logosu
├── App.tsx                # Ana uygulama
├── main.tsx               # Giriş noktası
└── index.css              # Global stiller
```

### ✨ Son Güncellemeler (15 Kasım 2025)
- ✅ 8 gereksiz duplicate dosya temizlendi
- ✅ Kod tabanı %30 optimize edildi
- ✅ Bileşenler dokümantasyonu eklendi
- ✅ Daha temiz ve bakımı kolay yapı

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Ana Mavi**: #000066
- **İkincil Mavi**: #0000CC
- **Gradyan**: linear-gradient(135deg, #000066 0%, #0000CC 100%)
- **Beyaz**: #ffffff
- **Açık Gri**: #f8f9fa
- **Koyu Gri**: #333333

### Tipografi
- **Ana Font**: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif
- **Başlık Boyutları**: 2.5rem - 1.2rem
- **Satır Yüksekliği**: 1.5 - 1.8

## 🚦 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 16+
- npm veya yarn

### Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview
```

### Geliştirme Sunucusu
Proje `http://localhost:5173` adresinde çalışacaktır.

### E-posta Gönderimi (Serverless)
- Bu proje e-postaları Vercel Functions üzerinden gönderir. Lokal Express sunucusuna ihtiyaç yoktur.
- Frontend formları `POST /api/contact` endpoint'ine gönderim yapar.
- Production için Vercel'e şu environment değişkenlerini ekleyin:
	- `EMAIL_USER` = Gmail adresiniz
	- `EMAIL_PASSWORD` = Gmail App Password (16 haneli)
	- (Opsiyonel) `EMAIL_RECIPIENT` = Alıcı adresi (boşsa `EMAIL_USER` kullanılır)
  
İstatistik: `GET /api/email-stats`

## 📋 Özellikler Detay

### 🌐 Çok Dilli Hizmetler
- İngilizce, Almanca, Fransızca
- İtalyanca, Rusça, Arapça
- Farsça, Çince, Japonca
- Yunanca, Felemenkçe, Bulgarca
- Romence, Ukraynaca ve diğer diller

### 📝 Hizmet Türleri
1. **Tercüme Hizmeti**: Yeminli tercüme ve noter onayı
2. **Vize Hizmetleri**: Turistik, çalışma ve aile birleşimi
3. **Göçmenlik**: Türkiye ve Kanada ikamet izni
4. **Belgelendirme**: E-devlet ve uluslararası sertifikalar

### 📞 İletişim
- **Telefon**: +90 542 438 72 54 / +90 544 721 53 15
- **Web**: www.tekintercume.com.tr
- **E-mail**: info@tekintercume.com.tr

## 🔧 Geliştirme

### Kod Standartları
- TypeScript strict modu
- Functional components ve hooks
- CSS custom properties kullanımı
- Responsive-first tasarım
- Accessibility standartları

### Bileşen Yapısı
Her bileşen kendi CSS dosyası ile birlikte gelir:
- `Component.tsx` - React bileşeni
- `Component.css` - Bileşene özel stiller

### State Yönetimi
- React useState ve useEffect hooks
- Props drilling yerine context API (gerektiğinde)
- Form state yönetimi için kontrollü bileşenler

## 📱 Responsive Tasarım

- **Desktop**: 1200px+ (Grid layout)
- **Tablet**: 768px - 1199px (Hybrid layout)
- **Mobile**: 320px - 767px (Stack layout)

## ⚡ Performans

- Vite ile hızlı build
- Code splitting
- Lazy loading (gerektiğinde)
- Optimized images
- CSS minification

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel mülkiyettir. Tekin Tercüme Bürosu'na aittir.

## 📞 Destek

Herhangi bir sorun için lütfen iletişime geçin:
- **E-mail**: info@tekintercume.com.tr
- **Telefon**: +90 542 438 72 54
# tekin-tercume
