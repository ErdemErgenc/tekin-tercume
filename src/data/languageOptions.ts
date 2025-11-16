export interface LanguageOption {
  value: string;
  labelKey: string;
}

export const languageOptions: LanguageOption[] = [
  { value: 'turkce', labelKey: 'languageOptions.turkish' },
  { value: 'english', labelKey: 'languageOptions.english' },
  { value: 'deutsch', labelKey: 'languageOptions.german' },
  { value: 'francais', labelKey: 'languageOptions.french' },
  { value: 'italiano', labelKey: 'languageOptions.italian' },
  { value: 'русский', labelKey: 'languageOptions.russian' },
  { value: 'العربية', labelKey: 'languageOptions.arabic' },
  { value: '中文', labelKey: 'languageOptions.chinese' },
  { value: '日本語', labelKey: 'languageOptions.japanese' }
];
