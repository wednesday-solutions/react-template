/**
 *
 * Tests for Header
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import Header from '../index';

describe('<Header />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Header />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain logo', () => {
    const { getAllByAltText } = renderWithIntl(<Header />);
    expect(getAllByAltText('logo').length).toBe(1);
  });

  it('should render logo from props', () => {
    const { getByTestId } = renderWithIntl(<Header logo={'sample_logo'} />);
    expect(getByTestId('logo').src).toEqual('http://localhost/sample_logo');
  });
});
