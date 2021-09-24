import { createIntl, createIntlCache } from 'react-intl';
import translations from '../translations/en.json';

export default function getIntl() {
  return createIntl(
    {
      locale: 'en',
      messages: translations
    },
    createIntlCache()
  );
}
