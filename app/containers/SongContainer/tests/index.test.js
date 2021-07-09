/**
 *
 * Tests for SongContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { SongContainerTest as SongContainer } from '../index';

describe('<SongContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SongContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
