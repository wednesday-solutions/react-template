import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter, Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import configureStore from '@app/configureStore';
import { DEFAULT_LOCALE, translationMessages } from '@app/i18n';
import ConnectedLanguageProvider from '@containers/LanguageProvider';
import { IntlGlobalProvider } from '@components/IntlGlobalProvider';
import { theme } from '@containers/App';

export const renderWithIntl = (children) =>
  render(
    <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
      <IntlGlobalProvider>{children}</IntlGlobalProvider>
    </IntlProvider>
  );

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

export const getStyles = () => {};
