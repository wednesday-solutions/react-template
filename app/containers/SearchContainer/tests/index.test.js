/**
 *
 * Tests for SearchContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';

// import { fireEvent } from '@testing-library/dom'
import { SearchContainerTest as SearchContainer } from '../index';

describe('<SearchContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SearchContainer />);
    expect(baseElement).toMatchSnapshot();
  });
  
});
