import React from 'react';

import NotFoundPage from '../index';
import { renderWithIntl } from '@app/utils/testUtils';

describe('<NotFoundPage /> tests', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = renderWithIntl(<NotFoundPage />);
    expect(firstChild).toMatchSnapshot();
  });
});
