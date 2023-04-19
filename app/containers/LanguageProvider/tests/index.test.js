import React from 'react';
import { render } from '@testing-library/react';
import { Trans } from '@lingui/macro';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import ConnectedLanguageProvider, { LanguageProvider } from '../index';
import configureStore from '@app/configureStore';
import { DEFAULT_LOCALE, translationMessages } from '@app/i18n';

describe('<LanguageProvider /> tests', () => {
  it('should render its children', () => {
    const children = <h1>Test</h1>;
    const { container } = render(
      <LanguageProvider messages={translationMessages} locale={DEFAULT_LOCALE}>
        {children}
      </LanguageProvider>
    );
    expect(container.firstChild).not.toBeNull();
  });
});

describe('<ConnectedLanguageProvider /> tests', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory).store;
  });

  it('should render the default language messages', () => {
    const message = 'Wednesday Solutions';
    const { queryByText } = render(
      <Provider store={store}>
        <ConnectedLanguageProvider locale={DEFAULT_LOCALE} messages={translationMessages}>
          <Trans id="wednesday_solutions" />
        </ConnectedLanguageProvider>
      </Provider>
    );
    expect(queryByText(message)).not.toBeNull();
  });
});
