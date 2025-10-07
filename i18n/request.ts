import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const SUPPORTED_LOCALES = ['fr', 'en'] as const;
type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export default getRequestConfig(async ({requestLocale}) => {
  const resolved = (await requestLocale()) || 'fr';
  const locale = (SUPPORTED_LOCALES.includes(resolved as SupportedLocale)
    ? resolved
    : 'fr') as SupportedLocale;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  return {locale, messages};
});
