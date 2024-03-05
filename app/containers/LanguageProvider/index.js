/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { makeSelectLocale } from './selectors';

/**
 * Provides language support for the application by loading and activating
 * the specified locale and its messages. Wraps its children with an I18nProvider.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} props - The component props.
 * @param {Object} props.messages - An object containing message translations for each locale.
 * @param {string} props.locale - The current locale to be used for translations.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the I18nProvider.
 * @returns {JSX.Element} An I18nProvider component wrapping the children with the specified locale and messages.
 */
export function LanguageProvider(props) {
  const messages = props.messages[props.locale];
  const locale = props.locale;
  const catalogs = { [props.locale]: messages };
  i18n.loadLocaleData(locale, { plurals: locale });
  i18n.load(locale, messages);
  i18n.activate(locale);

  return (
    <I18nProvider i18n={i18n} language={locale} catalogs={catalogs}>
      {React.Children.only(props.children)}
    </I18nProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale
}));
export default connect(mapStateToProps)(LanguageProvider);
