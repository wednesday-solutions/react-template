/**
 *
 * Tests for MenubarJs
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import MenubarJs from '../index';

describe('<MenubarJs />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<MenubarJs />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 MenubarJs component', () => {
    const { getAllByTestId } = renderWithIntl(<MenubarJs />);
    expect(getAllByTestId('menubar-js').length).toBe(1);
  });
});
