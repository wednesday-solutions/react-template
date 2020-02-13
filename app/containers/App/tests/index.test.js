import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithIntl } from '@utils/testUtils';

describe('<App /> container tests', () => {
  const App = require('../index').default;
  const history = createMemoryHistory();
  history.push('/');
  const { container } = renderWithIntl(
    <Router history={history}>
      <App />
    </Router>
  );

  it('should render and match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
