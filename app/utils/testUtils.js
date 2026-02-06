import React from 'react';
import { I18nProvider } from '@lingui/react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import { i18n } from '@lingui/core';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import configureStore from '@app/configureStore';
import { DEFAULT_LOCALE, translationMessages } from '@app/i18n';
import ConnectedLanguageProvider from '@containers/LanguageProvider';
import { colors } from '@themes';
import { ThemeProvider as CustomThemeProvider } from '@app/contexts/themeContext';

// Clean up theme side effects between tests
afterEach(() => {
  localStorage.removeItem('theme');
  document.documentElement.classList.remove('dark', 'light');
});

// Create a basic theme for testing
const testTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    }
  }
});

export const renderWithIntl = (children) => {
  i18n.loadLocaleData(DEFAULT_LOCALE, { plurals: DEFAULT_LOCALE });
  // eslint-disable-next-line security/detect-object-injection
  i18n.load(DEFAULT_LOCALE, translationMessages[DEFAULT_LOCALE]);
  i18n.activate(DEFAULT_LOCALE);
  return render(<I18nProvider i18n={i18n}>{children}</I18nProvider>);
};

export const renderProvider = (children, history) => {
  const store = configureStore({}).store;
  return render(
    <Provider store={store}>
      <ConnectedLanguageProvider messages={translationMessages}>
        <CustomThemeProvider>
          <ThemeProvider theme={testTheme}>
            {history ? <Router history={history}>{children}</Router> : <BrowserRouter>{children}</BrowserRouter>}
          </ThemeProvider>
        </CustomThemeProvider>
      </ConnectedLanguageProvider>
    </Provider>
  );
};
export const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const apiResponseGenerator = (ok, data) => ({
  ok,
  data
});
