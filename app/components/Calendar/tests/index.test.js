/**
 *
 * Tests for Calendar
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Calendar from '../index';
import mockData from '@services/data.json';
describe('<Calendar />', () => {
  it('should render and match the snapshot', () => {
    const { data } = mockData;
    const { baseElement } = renderWithIntl(<Calendar dashData={data} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Calendar component', () => {
    const { data } = mockData;

    const { getAllByTestId } = renderWithIntl(<Calendar dashData={data} />);
    expect(getAllByTestId('calendar').length).toBe(1);
  });
});
