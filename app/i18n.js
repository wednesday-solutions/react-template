/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */

const enTranslationMessages =
  process.env.NODE_ENV === 'production'
    ? require('@app/translations/en').messages
    : require('@app/translations/en.json');

export const DEFAULT_LOCALE = 'en';

// prettier-ignore
export const appLocales = [
  'en',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages)
};
