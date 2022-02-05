/**
 *
 * Tests for Repos
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Repos from '../index';

const data = { items: [{ name: 'kuntham' }] };

describe('<Repos />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Repos data={data} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Repos component', () => {
    const { getAllByTestId } = renderWithIntl(<Repos data={data} />);
    expect(getAllByTestId('repos').length).toBe(1);
  });
});
