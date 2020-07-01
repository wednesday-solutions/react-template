/**
 *
 * Tests for Header
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Header from '../index';

describe('<Header />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Header />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Header component', () => {
    const { getAllByTestId } = renderWithIntl(<Header />);
    expect(getAllByTestId('header').length).toBe(1);
  });
});
