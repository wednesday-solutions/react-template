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
    // key comes from Object.keys(messages), so it's always an own property
    // eslint-disable-next-line security/detect-object-injection
    const messageValue = messages[key];
    const hasDefaultMessage = Object.prototype.hasOwnProperty.call(defaultFormattedMessages, key);
    const formattedMessage =
      // eslint-disable-next-line security/detect-object-injection
      !messageValue && locale !== DEFAULT_LOCALE && hasDefaultMessage ? defaultFormattedMessages[key] : messageValue;
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages)
};
