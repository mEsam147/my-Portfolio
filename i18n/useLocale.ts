// i18n/useLocale.ts
'use client';

import { useParams } from 'next/navigation';
import { Locale, defaultLocale } from './config';

// Import JSON files directly
import enMessages from '../messages/en.json';
import arMessages from '../messages/ar.json';

const messages = {
  en: enMessages,
  ar: arMessages,
};

export function useLocale() {
  const params = useParams();
  const locale = (params.locale as Locale) || defaultLocale;

  const t = (key: string, fallback?: string): any => {
    try {
      const keys = key.split('.');
      let value: any = messages[locale];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key} for locale ${locale}`);
          return fallback || key;
        }
      }

      return value;
    } catch (error) {
      console.error('Translation error:', error);
      return fallback || key;
    }
  };

  return {
    locale,
    t,
  };
}
