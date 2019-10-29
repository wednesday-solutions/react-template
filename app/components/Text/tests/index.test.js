/**
 *
 * Tests for Text
 *
 */

import React from 'react';
import { renderWithIntl, getComponentStyles } from '@utils/testUtils';
import { Text } from '../index';

describe('<Text /> component tests', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Text />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Text component', () => {
    const { getAllByTestId } = renderWithIntl(<Text />);
    expect(getAllByTestId('text').length).toBe(1);
  });

  it('should contain render the text according to the id', () => {
    const { getAllByText } = renderWithIntl(<Text id="repo_list" />);
    expect(getAllByText(/Repository List/).length).toBe(1);
  });

  it('should have a margin-bottom of 5px when we pass marginBottom as 5', () => {
    const props = {
      marginBottom: 5,
      id: 'repo_list'
    };
    const styles = getComponentStyles(Text, props);
    expect(styles['margin-bottom']).toBe(`${props.marginBottom}px`);
  });
});
