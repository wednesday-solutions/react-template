/**
 *
 * Tests for Calendar
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Calendar from '../index';

describe('<Calendar />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Calendar />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Calendar component', () => {
    const { getAllByTestId } = renderWithIntl(<Calendar />);
    expect(getAllByTestId('calendar').length).toBe(1);
  });
});
