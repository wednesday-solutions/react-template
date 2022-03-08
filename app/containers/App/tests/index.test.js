import React from 'react';
import { renderProvider, renderWithIntl } from '@utils/testUtils';
import App from '../index';
import { BrowserRouter } from 'react-router-dom';
import history from '@app/utils/history';
import { waitFor } from '@testing-library/react';

describe('<App /> container tests', () => {
  it('should render and match the snapshot', () => {
    const { container } = renderWithIntl(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should redirect to redirect_uri query params if given in url', async () => {
    history.location.search = '?redirect_uri=/repos';
    renderProvider(<App />, history);
    await waitFor(() => expect(history.location.pathname).toBe('/repos'));
  });
});
