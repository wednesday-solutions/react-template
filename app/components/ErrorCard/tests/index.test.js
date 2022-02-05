/**
 *
 * Tests for ErrorCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import ErrorCard from '../index';

describe('<ErrorCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ErrorCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ErrorCard component', () => {
    const { getAllByTestId } = renderWithIntl(<ErrorCard />);
    expect(getAllByTestId('error-card').length).toBe(1);
  });
});
