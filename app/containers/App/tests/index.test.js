import React from 'react';
import App from '../index';
import history from '@app/utils/history';
import { waitFor, render } from '@testing-library/react';

describe('<App /> container tests', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it('should redirect to redirect_uri query params if given in url', async () => {
    history.location.search = '?redirect_uri=/repos';
    render(<App />);
    await waitFor(() => expect(history.location.pathname).toBe('/repos'));
  });
});
