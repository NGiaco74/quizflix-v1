import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const SUPPORTED_LOCALES = ['fr', 'en'] as const;
type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export default getRequestConfig(async ({locale}) => {
  if (!locale || !SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    notFound();
  }

  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  return {locale, messages};
});
