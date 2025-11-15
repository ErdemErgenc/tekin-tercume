import React, { useState } from 'react';
import './FAQ.css';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      category: '📑 Tercüme Hizmeti',
      items: [
        {
          question: 'Hangi tür belgelerin tercümesini yapıyorsunuz?',
          answer: 'Nüfus kayıt örnekleri, evlenme cüzdanı, doğum belgeleri, diploma ve transkriptler, sertifikalar, mahkeme kararları, ticari sözleşmeler, pasaportlar, ikamet belgeleri, sağlık raporları, sigorta poliçeleri, vergi belgeleri, noter onaylı belgeler ve akademik çalışmalar gibi tüm resmi ve özel belgelerin tercümesini yapıyoruz.'
        },
        {
          question: 'Hangi dillerde tercüme hizmeti veriyorsunuz?',
          answer: 'İngilizce, Almanca, Fransızca, İtalyanca, Rusça, Arapça, Farsça, Çince, Japonca, Yunanca, Felemenkçe, Bulgarca, Romence, Ukraynaca başta olmak üzere 128 dilde yeminli ve profesyonel tercüme hizmeti sunuyoruz.'
        },
        {
          question: 'Yeminli tercüme ile normal tercüme arasındaki fark nedir?',
          answer: 'Yeminli tercüme, Adalet Bakanlığı tarafından yetkilendirilmiş tercümanlar tarafından yapılan ve noter huzurunda tasdik edilen, resmi kurumlarda geçerliliği olan tercümedir. Normal tercüme ise daha çok bireysel veya kurumsal ihtiyaçlarda kullanılan, noter onayı gerektirmeyen çevirilerdir.'
        },
        {
          question: 'Çevirileriniz resmî kurumlarda geçerli mi?',
          answer: 'Evet. Yeminli tercümanlarımız tarafından yapılan ve noter onayı ile desteklenen tercümeleriniz Türkiye\'deki tüm kamu kurumları, mahkemeler, üniversiteler ve yurtdışındaki konsolosluklar, elçilikler, göçmenlik daireleri gibi resmi kurumlarda geçerlidir.'
        },
        {
          question: 'Tercüme ücreti nasıl hesaplanır?',
          answer: 'Tercüme ücretleri belgenin türüne, sayfa sayısına, dil çiftine ve aciliyet durumuna göre değişir. Standart belgeler için sayfa başına fiyat uygulanır. Teknik, hukuki veya tıbbi belgeler için farklı tarifeler geçerlidir. Detaylı fiyat teklifi için belgenizi bize iletebilirsiniz.'
        },
        {
          question: 'Tercüme ne kadar sürede teslim edilir?',
          answer: 'Standart belgeler için 1-3 iş günü içinde teslimat yapılır. Acil çevirilerde 24 saat içinde teslim garantisi sunuyoruz. Büyük hacimli projeler için süre belgenin büyüklüğüne göre belirlenir.'
        },
        {
          question: 'Noter tasdiki nasıl yapılır?',
          answer: 'Tercüme işlemi tamamlandıktan sonra yeminli tercüman imzalı belgeyi notere götürür ve noter huzurunda tasdik işlemi yapılır. Bu işlem genellikle aynı gün içinde tamamlanır. Diyarbakır dışındaki müşterilerimiz için kargo ile gönderim yapılır.'
        },
        {
          question: 'Apostil işlemi nedir?',
          answer: 'Apostil, belgelerin yurtdışında geçerli olması için Dışişleri Bakanlığı tarafından yapılan bir onay işlemidir. Lahey Sözleşmesi\'ne taraf ülkelerde kullanılır. Apostil işlemi için belgenin önce noter tasdikli olması gerekir.'
        }
      ]
    },
    {
      category: '🌍 Vize Hizmetleri',
      items: [
        {
          question: 'Hangi ülkeler için vize danışmanlığı veriyorsunuz?',
          answer: 'Schengen ülkeleri (Almanya, Fransa, İtalya, İspanya vb.), ABD, Kanada, İngiltere, Avustralya, Yeni Zelanda ve daha birçok ülke için turistik, iş, öğrenci ve aile birleşimi vizesi başvurularında danışmanlık sağlıyoruz.'
        },
        {
          question: 'Vize başvurusunda tüm işlemleri sizin aracılığınızla yapabilir miyim?',
          answer: 'Evet. Belgelerinizin hazırlanması, çevirisi ve tasdikinden randevu alınmasına, başvuru formlarının doldurulmasından dosya kontrolüne, konsolosluk randevusuna hazırlıktan başvuru sonrası takibe kadar tüm süreçlerde yanınızdayız.'
        },
        {
          question: 'Vize başvurusu ne kadar sürede sonuçlanır?',
          answer: 'Turistik Schengen vizesi 7-30 gün, ABD turistik vizesi 3-10 gün, Kanada vizesi 2-4 hafta, İngiltere vizesi 3 hafta civarında sonuçlanır. Çalışma ve aile birleşimi vizeleri 1-6 ay arasında değişebilir. Süre konsolosluğun yoğunluğuna göre değişiklik gösterebilir.'
        },
        {
          question: 'Vize başvurusu için hangi belgeler gereklidir?',
          answer: 'Pasaport, fotoğraf, vize başvuru formu, seyahat sigortası, otel rezervasyonu, uçak bileti rezervasyonu, banka hesap özeti, işyeri belgesi/öğrenci belgesi, davet mektubu (varsa) ve ülkeye göre ek belgeler gerekebilir. Her vize türü için özel evrak listesi danışmanlık sürecinde paylaşılır.'
        },
        {
          question: 'Vize reddi durumunda ne yapabilirim?',
          answer: 'Vize reddedilirse red gerekçesi incelenir ve eksik veya yanlış belgeler düzeltilerek yeniden başvuru yapılabilir. Bazı ülkelerde itiraz hakkı bulunur. Danışmanlarımız red durumunda en doğru stratejileri belirler ve yeniden başvuru sürecinde size destek olur.'
        },
        {
          question: 'Schengen vizesi ile hangi ülkelere gidebilirim?',
          answer: 'Schengen vizesi ile 27 Avrupa ülkesine (Almanya, Fransa, İtalya, İspanya, Hollanda, Belçika, Avusturya, Yunanistan vb.) seyahat edebilirsiniz. 180 gün içinde 90 güne kadar kalma hakkı verir.'
        }
      ]
    },
    {
      category: '🛂 Göçmenlik Danışmanlığı',
      items: [
        {
          question: 'Kanada Express Entry nedir?',
          answer: 'Kanada\'ya kalıcı oturum sağlamak için kullanılan puan esaslı bir göçmenlik sistemidir. Eğitim, iş deneyimi, dil yeterliliği (IELTS/CELPIP), yaş ve Kanada deneyimi gibi kriterler değerlendirilir. CRS (Comprehensive Ranking System) puanı 460 ve üzeri olan adayların davet alma şansı yüksektir.'
        },
        {
          question: 'Kanada Provincial Nominee Program (PNP) nedir?',
          answer: 'PNP, Kanada eyaletlerinin kendi ekonomik ihtiyaçlarına göre göçmen seçtiği programlardır. Ontario, British Columbia, Alberta, Saskatchewan gibi eyaletler kendi kriterlerine uyan adaylara davet gönderir. PNP ile Express Entry\'ye 600 ek puan kazanarak kalıcı oturum şansınız artar.'
        },
        {
          question: 'Türkiye\'de ikamet izni almak için neler gerekli?',
          answer: 'Pasaport, vize, adres belgesi, sağlık sigortası, banka hesap özeti veya gelir belgesi, kiralık ev sözleşmesi ve ikamet izni başvuru formu gereklidir. Başvuru e-Devlet üzerinden yapılır ve Göç İdaresi randevusunda belgeler teslim edilir. Süreç 1-2 ay sürer.'
        },
        {
          question: 'Göçmenlik başvurusu için dil sınavı şart mı?',
          answer: 'Evet. Kanada, Avustralya, Yeni Zelanda ve İngiltere gibi İngilizce konuşulan ülkelerde IELTS veya CELPIP sınavı şarttır. Kanada French programları için TEF/TCF Fransızca sınavları da kabul edilir. Dil puanınız ne kadar yüksekse göçmenlik puanınız da o kadar artar.'
        },
        {
          question: 'Aile birleşimi vizesi nasıl alınır?',
          answer: 'Yurt dışında yaşayan eşiniz, çocuğunuz veya aileniz varsa aile birleşimi başvurusu yapabilirsiniz. Sponsorluk belgesi, evlilik/doğum belgesi, gelir kanıtı ve dil sınavı (bazı ülkelerde) gerekir. Süreç 6-18 ay arasında değişir.'
        },
        {
          question: 'Yatırım yoluyla oturum alabilir miyim?',
          answer: 'Evet. Türkiye, Portekiz, İspanya, Yunanistan (Golden Visa), ABD (EB-5) ve Kanada gibi ülkeler belirli miktarda yatırım yapanlara ikamet hakkı verir. Türkiye\'de 400.000$ konut alımı veya 500.000$ yatırım ile vatandaşlık hakkı kazanılır.'
        }
      ]
    },
    {
      category: '📜 Mesleki Belgelendirme',
      items: [
        {
          question: 'WES nedir ve nasıl başvuru yapılır?',
          answer: 'WES (World Education Services), diplomalarınızın Kanada standartlarına göre değerlendirildiği bir kuruluştur. Kanada Express Entry ve PNP başvurularında zorunludur. Başvuru için transkript, diploma ve kimlik belgelerinin noter tasdikli çevirisi gerekir. Süreç 5-7 hafta sürer.'
        },
        {
          question: 'ICAS ve CES arasındaki fark nedir?',
          answer: 'Her ikisi de Kanada\'da diploma denklik değerlendirmesi yapan kuruluşlardır. ICAS daha hızlı (3-5 hafta) sonuç verir ve bazı eyaletler tarafından tercih edilir. CES Toronto Üniversitesi desteklidir ve akademik değerlendirmede güvenilirdir. WES en yaygın kabul gören kuruluştur.'
        },
        {
          question: 'E-Devlet\'ten barkodlu belge nasıl alınır?',
          answer: 'E-Devlet\'e giriş yaparak YÖK veya üniversiteniz üzerinden transkript ve diploma tasdik belgesi alabilirsiniz. Bu belgeler barkodlu olup yurtdışında doğrulanabilir. Belgenin noter tasdikli çevirisi yapılarak WES, ICAS gibi kuruluşlara gönderilir.'
        },
        {
          question: 'Apostil ile konsolosluk onayı arasındaki fark nedir?',
          answer: 'Apostil, Lahey Sözleşmesi\'ne taraf ülkelerde (Kanada, ABD, İngiltere, AB ülkeleri) belgelerin geçerliliğini sağlar ve Dışişleri Bakanlığı tarafından yapılır. Konsolosluk onayı ise anlaşmaya taraf olmayan ülkeler için elçilik/konsolosluk tarafından yapılır.'
        },
        {
          question: 'Diploma denklik süreci ne kadar sürer?',
          answer: 'WES 5-7 hafta, ICAS 3-5 hafta, CES 4-6 hafta sürer. Belgelerinizin hazırlanması, noter tasdiki ve kargoya verilmesi 1-2 hafta alır. Toplam süre 6-10 hafta arasındadır. Acil durumlar için hızlandırılmış başvuru seçenekleri mevcuttur.'
        },
        {
          question: 'Yurt dışı diplomamın Türkiye\'de denkliği nasıl alınır?',
          answer: 'Yurt dışından alınan diplomaların Türkiye\'de tanınması için YÖK\'e denklik başvurusu yapılır. Diploma, transkript, ders içerikleri ve apostil/konsolosluk onaylı belgeler gerekir. Süreç 2-6 ay sürer. Başvuru ücretli ve online yapılır.'
        }
      ]
    },
    {
      category: '💰 Ücretlendirme ve Ödeme',
      items: [
        {
          question: 'Ödeme nasıl yapılır?',
          answer: 'Nakit, havale/EFT, kredi kartı ve kapıda ödeme seçenekleri mevcuttur. Diyarbakır dışındaki müşterilerimiz için havale ile ödeme yapılabilir. Belge tesliminden sonra ödeme alınır.'
        },
        {
          question: 'Fiyatlarınız sabit mi yoksa belgeye göre değişiyor mu?',
          answer: 'Standart belgeler için (nüfus kaydı, diploma, pasaport) sabit sayfa başı fiyat uygulanır. Teknik, hukuki, tıbbi metinler gibi özel çevirilerde uzman tercüman ücreti eklenir. Detaylı fiyat için belgenizi bize iletebilirsiniz.'
        },
        {
          question: 'İndirim veya kampanyalarınız var mı?',
          answer: 'Birden fazla belge çevirilerinde indirim uygulanır. Ayrıca kurumsal müşterilerimize özel fiyatlandırma sunuyoruz. Güncel kampanyalar için bizimle iletişime geçebilirsiniz.'
        }
      ]
    },
    {
      category: '📞 İletişim ve Teslimat',
      items: [
        {
          question: 'Ofis adresiniz nerede?',
          answer: 'Diyarbakır merkez ofisimizden hizmet vermekteyiz. Adres ve iletişim bilgilerimize web sitemizin İletişim bölümünden ulaşabilirsiniz.'
        },
        {
          question: 'Türkiye\'nin her yerinden hizmet alabilir miyim?',
          answer: 'Evet. Belgenizi WhatsApp, e-posta veya kargo ile gönderebilirsiniz. Çeviri tamamlandıktan sonra belgeler kargo ile adresinize gönderilir. Online ödeme imkanı da mevcuttur.'
        },
        {
          question: 'Acil durumlar için aynı gün teslimat yapıyor musunuz?',
          answer: 'Evet. Belgenin sayfa sayısı ve yoğunluğumuza bağlı olarak aynı gün veya 24 saat içinde teslimat yapılabilir. Acil çeviriler için lütfen önceden bizi arayın.'
        },
        {
          question: 'Müşteri hizmetlerinize nasıl ulaşabilirim?',
          answer: 'WhatsApp: +90 544 721 53 15 (7/24 aktif), Ofis Telefonu: +90 424 238 72 54, E-posta: tekintercume15@gmail.com üzerinden bize ulaşabilirsiniz. Mesai saatleri içinde anında yanıt alırsınız.'
        }
      ]
    }
  ];

  const handleToggle = (categoryIndex: number, itemIndex: number) => {
    const globalIndex = categoryIndex * 1000 + itemIndex;
    setOpenIndex(openIndex === globalIndex ? null : globalIndex);
  };

  return (
    <section className="faq">
      <div className="container">
        <div className="faq-header">
          <h2 className="section-title">Sıkça Sorulan Sorular (SSS)</h2>
          <p className="section-subtitle">
            Merak ettiğiniz soruların yanıtlarını burada bulabilirsiniz
          </p>
        </div>

        <div className="faq-content">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h3 className="category-title">{category.category}</h3>
              <div className="faq-items">
                {category.items.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 1000 + itemIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={itemIndex}
                      className={`faq-item ${isOpen ? 'open' : ''}`}
                    >
                      <button
                        className="faq-question"
                        onClick={() => handleToggle(categoryIndex, itemIndex)}
                      >
                        <span className="question-number">{itemIndex + 1}.</span>
                        <span className="question-text">{item.question}</span>
                        <span className={`faq-toggle ${isOpen ? 'open' : ''}`}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M4 6L8 10L12 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>

                      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                        <div className="answer-content">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
