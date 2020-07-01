/**
 *
 * Tests for List
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import List from '../index';

describe('<List />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<List />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 List component', () => {
    const { getAllByTestId } = renderWithIntl(<List />);
    expect(getAllByTestId('list').length).toBe(1);
  });
});
