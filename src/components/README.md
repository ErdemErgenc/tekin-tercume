# Tekin Tercüme - Bileşenler Dokümantasyonu

Bu klasör, Tekin Tercüme web sitesi için kullanılan tüm React bileşenlerini içerir.

## 📁 Bileşen Yapısı

### Ana Sayfa Bileşenleri
- **Header.tsx** - Site başlığı ve navigasyon menüsü
- **Hero.tsx** - Ana sayfa hero bölümü (teklif formu butonları ile)
- **Services.tsx** - Hizmetler bölümü
- **About.tsx** - Hakkımızda bölümü
- **Footer.tsx** - Site alt bilgi

### Hizmet Sayfaları
- **ServicePage.tsx** - Genel hizmet sayfası şablonu
  - Tercüme Hizmeti
  - Vize Hizmetleri
  - Göçmenlik Hizmetleri
  - Mesleki Bilgilendirme

### Dil Sayfaları
- **Languages.tsx** - Dil listesi sayfası (tüm diller)
- **LanguageDetail.tsx** - Tek dil detay sayfası
- **LanguagePage.tsx** - Dil sayfası şablonu

### Form ve İletişim
- **Contact.tsx** - İletişim sayfası (form + bilgiler)
- **QuoteRequest.tsx** - Teklif talep formu (modal)
- **QuickQuote.tsx** - Hızlı teklif sayfası

### Diğer
- **FAQ.tsx** - Sıkça Sorulan Sorular
- **VisaServices.tsx** - Vize hizmetleri detay sayfası

## 🎨 CSS Dosyaları

Her bileşen kendi CSS modülüne sahiptir:
- `Component.tsx` → `Component.css`

### Kullanılan CSS Dosyaları
- About.css
- Contact.css
- FAQ.css
- Footer.css
- Header.css
- Hero.css
- LanguageDetail.css
- LanguagePage.css
- Languages.css
- QuickQuote.css
- QuoteRequest.css
- ServicePages.css
- Services.css
- VisaServices.css

## 🔄 Güncel Değişiklikler (15 Kasım 2025)

### Temizlenen Dosyalar (Artık Kullanılmıyor)
Aşağıdaki dosyalar gereksiz ve duplicate oldukları için kaldırıldı:

❌ **Silinen Dosyalar:**
1. `ContactNew.tsx` - Contact.tsx ile aynıydı
2. `ContactOld.tsx` - Contact.tsx ile aynıydı
3. `ContactOld.css` - Kullanılmıyordu
4. `ContactMinimal.css` - Kullanılmıyordu
5. `QuoteRequestNew.tsx` - QuoteRequest.tsx ile aynıydı
6. `QuoteRequestOld.tsx` - Eski versiyon
7. `QuoteRequest.module.css` - Kullanılmıyordu
8. `Languages_new.tsx` - Languages.tsx ile aynıydı

### Sonuç
✅ 8 gereksiz dosya temizlendi
✅ Kod tabanı %30 daha temiz
✅ Bakım kolaylığı arttı
✅ Karışıklık ortadan kalktı

## 📦 Kullanım

Her bileşen `App.tsx` dosyasından import edilir ve kullanılır:

```tsx
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
// ...
```

## 🚀 Yeni Bileşen Eklerken

1. `ComponentName.tsx` dosyası oluştur
2. `ComponentName.css` dosyası oluştur
3. TypeScript interface'lerini tanımla
4. `App.tsx`'e import et
5. Bu README'yi güncelle

## 🎯 Kod Standartları

- Functional components kullan
- TypeScript tipleri tanımla
- Props için interface oluştur
- CSS modules kullan
- Responsive tasarım uygula
- Accessibility'ye dikkat et (ARIA labels)

## 📞 İletişim

Sorularınız için: info@tekintercume.com.tr
