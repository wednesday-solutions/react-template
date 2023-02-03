const locales = ['en'];

const messages = locales.reduce(
  (acc, lang) => ({
    ...acc,
    [lang]: require(`../app/translations/${lang}.json`) // whatever the relative path to your messages json is
  }),
  {}
);

export const reactIntl = {
  defaultLocale: 'en',
  locales,
  messages
};
