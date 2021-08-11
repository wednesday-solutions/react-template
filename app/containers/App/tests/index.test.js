import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import App from '../index';
import { BrowserRouter } from 'react-router-dom';

describe('<App /> container tests', () => {
  it('should render and match the snapshot', () => {
    const { container } = renderWithIntl(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
