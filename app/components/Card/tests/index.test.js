/**
 *
 * Tests for Card
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Card from '../index';

describe('<Card />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Card />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Card component', () => {
    const { getAllByTestId } = renderWithIntl(<Card />);
    expect(getAllByTestId('card').length).toBe(1);
  });
});
