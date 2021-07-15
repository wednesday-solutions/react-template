/**
 *
 * Tests for DetailContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { DetailContainerTest as DetailContainer } from '../index';

describe('<DetailContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<DetailContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
