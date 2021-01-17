/**
 *
 * Tests for Navbar
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Navbar from '../index';

describe('<Navbar />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Navbar />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Navbar component', () => {
    const { getAllByTestId } = renderWithIntl(<Navbar />);
    expect(getAllByTestId('navbar').length).toBe(1);
  });
});
