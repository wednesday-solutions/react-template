/**
 *
 * Tests for T
 *
 */

import React from 'react';
import { renderWithIntl, getComponentStyles } from '@utils/testUtils';
import { T } from '../index';

describe('<T /> component tests', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<T />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 T component', () => {
    const { getAllByTestId } = renderWithIntl(<T />);
    expect(getAllByTestId('t').length).toBe(1);
  });

  it('should contain render the text according to the id', () => {
    const { getAllByText } = renderWithIntl(<T id="wednesday_solutions" />);
    expect(getAllByText(/Wednesday Solutions/).length).toBe(1);
  });

  it('should have a margin-bottom of 5px when we pass marginBottom as 5', () => {
    const props = {
      marginBottom: 5,
      id: 'wednesday_solutions'
    };
    const styles = getComponentStyles(T, props);
    expect(styles['margin-bottom']).toBe(`${props.marginBottom}px`);
  });
});
