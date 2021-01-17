/**
 *
 * Tests for Cards
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Cards from '../index';

describe('<Cards />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Cards />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Cards component', () => {
    const { getAllByTestId } = renderWithIntl(<Cards />);
    expect(getAllByTestId('cards').length).toBe(1);
  });
});
