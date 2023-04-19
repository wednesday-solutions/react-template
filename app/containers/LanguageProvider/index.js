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

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
