import React from 'react';
import { I18nProvider } from '@lingui/react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter, Router } from 'react-router-dom';
import { i18n } from '@lingui/core';
import { ThemeProvider } from '@mui/material/styles';
import configureStore from '@app/configureStore';
import { DEFAULT_LOCALE, translationMessages } from '@app/i18n';
import ConnectedLanguageProvider from '@containers/LanguageProvider';
import { theme } from '@containers/App';

export const renderWithIntl = (children) => {
  i18n.loadLocaleData(DEFAULT_LOCALE, { plurals: DEFAULT_LOCALE });
  i18n.load(DEFAULT_LOCALE, translationMessages[DEFAULT_LOCALE]);
  i18n.activate(DEFAULT_LOCALE);
  return render(<I18nProvider i18n={i18n}>{children}</I18nProvider>);
};

export const renderProvider = (children, history) => {
  const store = configureStore({}, browserHistory).store;
  return render(
    <Provider store={store}>
      <ConnectedLanguageProvider messages={translationMessages}>
        <ThemeProvider theme={theme}>
          {history ? <Router history={history}>{children}</Router> : <BrowserRouter>{children}</BrowserRouter>}
        </ThemeProvider>
      </ConnectedLanguageProvider>
    </Provider>
  );
};
export const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const apiResponseGenerator = (ok, data) => ({
  ok,
  data
});
