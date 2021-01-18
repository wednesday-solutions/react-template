/**
 *
 * Tests for Navbar
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Navbar from '../index';
import mockData from '@services/data.json';
describe('<Navbar />', () => {
  it('should render and match the snapshot', () => {
    const { data } = mockData;
    const { baseElement } = renderWithIntl(<Navbar dashData={data} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Navbar component', () => {
    const { data } = mockData;
    const { getAllByTestId } = renderWithIntl(<Navbar dashData={data} />);
    expect(getAllByTestId('navbar').length).toBe(1);
  });
});
