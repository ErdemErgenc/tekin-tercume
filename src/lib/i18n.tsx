import React, { createContext, useContext, useMemo } from 'react';
import { tr } from '../data/i18n/tr';
import { en } from '../data/i18n/en';

export type Lang = 'tr' | 'en';

type Translations = typeof tr;

interface I18nContextValue {
  lang: Lang;
  setLang?: (lang: Lang) => void;
  t: (key: string, fallback?: string) => string;
  get: (key: string) => any;
  serviceContent: (serviceType: string) => any;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'tr',
  t: (k, fb) => fb ?? k,
  get: () => undefined,
  serviceContent: () => ({})
});

const dictionaries: Record<Lang, Translations> = { tr, en };

function getByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export const LanguageProvider: React.FC<{ lang: Lang; setLang?: (l: Lang) => void; children: React.ReactNode }> = ({ lang, setLang, children }) => {
  const value = useMemo<I18nContextValue>(() => {
    const dict = dictionaries[lang] as any;
    return {
      lang,
      setLang,
      t: (key: string, fallback?: string) => {
        const v = getByPath(dict, key);
        if (v === undefined || v === null) return fallback ?? key;
        return String(v);
      },
      get: (key: string) => {
        return getByPath(dict, key);
      },
      serviceContent: (serviceType: string) => {
        return dict.servicePages[serviceType] ?? { title: '', subtitle: '', description: '', features: [], pricing: [] };
      }
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
