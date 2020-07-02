/**
 *
 * Tests for ErrorMessage
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import ErrorMessage from '../index';

describe('<ErrorMessage />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ErrorMessage />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ErrorMessage component', () => {
    const { getAllByTestId } = renderWithIntl(<ErrorMessage />);
    expect(getAllByTestId('error-message').length).toBe(1);
  });
});
