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
          answer: 'Nüfus kayıt örnekleri, evlenme cüzdanı, doğum belgeleri, diploma ve transkriptler, sertifikalar, mahkeme kararları, ticari sözleşmeler, pasaportlar, ikamet belgeleri, sağlık raporları ve akademik çalışmalar gibi tüm resmi ve özel belgelerin tercümesini yapıyoruz.'
        },
        {
          question: 'Hangi dillerde tercüme hizmeti veriyorsunuz?',
          answer: 'Türkçe, Almanca, İngilizce başta olmak üzere farklı dillerde yeminli ve profesyonel tercüme hizmeti sunuyoruz. Talebinize göre diğer dillerde de destek sağlayabiliyoruz.'
        },
        {
          question: 'Yeminli tercüme ile normal tercüme arasındaki fark nedir?',
          answer: 'Yeminli tercüme, noter huzurunda yetkilendirilmiş tercümanlar tarafından yapılan ve resmî kurumlarda geçerliliği olan tercümedir. Normal tercüme ise daha çok bireysel veya kurumsal ihtiyaçlarda kullanılan, noter onayı gerektirmeyen çevirilerdir.'
        },
        {
          question: 'Çevirileriniz resmî kurumlarda geçerli mi?',
          answer: 'Evet. Yeminli tercümanlarımız tarafından yapılan ve noter onayı ile desteklenen tercümeleriniz Türkiye\'deki ve yurtdışındaki resmi kurumlarda geçerlidir.'
        }
      ]
    },
    {
      category: '🌍 Vize Hizmetleri',
      items: [
        {
          question: 'Hangi ülkeler için vize danışmanlığı veriyorsunuz?',
          answer: 'Başta Almanya, Kanada, ABD, İngiltere ve Schengen ülkeleri olmak üzere pek çok ülke için vize başvuru danışmanlığı sağlıyoruz.'
        },
        {
          question: 'Vize başvurusunda tüm işlemleri sizin aracılığınızla yapabilir miyim?',
          answer: 'Evet. Belgelerinizin hazırlanmasından başvurunun yapılmasına, randevu sürecinden dosya takibine kadar her aşamada danışmanlık veriyoruz.'
        },
        {
          question: 'Vize başvurusu ne kadar sürede sonuçlanır?',
          answer: 'Ülkeye ve vize türüne göre değişmekle birlikte turistik vizeler genellikle 7–30 gün içinde, çalışma ve aile birleşimi vizeleri ise birkaç ay içerisinde sonuçlanmaktadır.'
        }
      ]
    },
    {
      category: '🛂 Göçmenlik Danışmanlığı',
      items: [
        {
          question: 'Kanada Express Entry nedir?',
          answer: 'Kanada\'ya kalıcı oturum sağlamak için kullanılan puan esaslı bir göçmenlik sistemidir. Eğitim, iş deneyimi, dil yeterliliği ve yaş gibi kriterler değerlendirilir. En yüksek puanlı adaylar davet edilir.'
        },
        {
          question: 'Türkiye\'de ikamet izni almak zor mu?',
          answer: 'Hayır. Belgeleriniz doğru ve eksiksiz olduğunda süreç oldukça kolaydır. Online başvuru, randevu ve Göç İdaresi görüşmelerinde size rehberlik ediyoruz.'
        },
        {
          question: 'Göçmenlik başvurularında başarı oranınız nedir?',
          answer: 'Her başvuru kişiye özel değerlendirilir. Belgelerin doğru hazırlanması ve süreçlerin doğru yönetilmesi başarı şansını artırır. Bizimle çalışan danışanlarımızın büyük çoğunluğu başvurularında olumlu sonuç almıştır.'
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
