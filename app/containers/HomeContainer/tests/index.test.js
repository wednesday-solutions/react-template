/**
 *
 * Tests for HomeContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
