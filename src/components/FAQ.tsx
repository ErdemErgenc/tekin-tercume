import React, { useState } from 'react';
import './FAQ.css';
import { useI18n } from '../lib/i18n';

const FAQ: React.FC = () => {
  const { t, get } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  type FAQItem = { question: string; answer: string };
  type FAQCategory = { category: string; items: FAQItem[] };
  const faqData = (get('faq.categories') as FAQCategory[]) || [];

  const handleToggle = (categoryIndex: number, itemIndex: number) => {
    const globalIndex = categoryIndex * 1000 + itemIndex;
    setOpenIndex(openIndex === globalIndex ? null : globalIndex);
  };

  return (
    <section className="faq">
      <div className="container">
        <div className="faq-header">
          <h2 className="section-title">{t('faq.title')}</h2>
          <p className="section-subtitle">{t('faq.subtitle')}</p>
        </div>

        <div className="faq-content">
          {faqData.map((category: FAQCategory, categoryIndex: number) => (
            <div key={categoryIndex} className="faq-category">
              <h3 className="category-title">{category.category}</h3>
              <div className="faq-items">
                {category.items.map((item: FAQItem, itemIndex: number) => {
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
