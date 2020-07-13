/**
 *
 * Tests for ITunesContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { ITunesContainerTest as ITunesContainer } from '../index';

describe('<ITunesContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunesContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
