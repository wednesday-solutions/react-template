import { reactIntl } from './reactIntl.js';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  reactIntl,
  locale: reactIntl.defaultLocale,
  locales: {
    en: 'English'
  }
};
