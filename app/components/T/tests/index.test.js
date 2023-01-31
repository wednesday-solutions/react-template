/**
 *
 * Tests for T
 *
 */

import React from 'react';
import { matchers } from '@emotion/jest';
import { renderWithIntl } from '@utils/testUtils';
import { T } from '../index';

expect.extend(matchers);

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
    const { getAllByText } = renderWithIntl(<T id="repo_list" />);
    expect(getAllByText(/Repository List/).length).toBe(1);
  });

  it('should have a margin-bottom of 5px when we pass marginBottom as 5', () => {
    const props = {
      marginBottom: 5,
      id: 'repo_list'
    };
    const { getByTestId } = renderWithIntl(<T {...props} />);
    const styledText = getByTestId('t');
    expect(styledText).toHaveStyle({ marginBottom: '5px' });
  });
});
