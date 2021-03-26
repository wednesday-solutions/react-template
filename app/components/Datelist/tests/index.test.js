/**
 *
 * Tests for Datelist
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Datelist from '../index';

describe('<Datelist />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Datelist />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Datelist component', () => {
    const { getAllByTestId } = renderWithIntl(<Datelist />);
    expect(getAllByTestId('datelist').length).toBe(1);
  });
});
