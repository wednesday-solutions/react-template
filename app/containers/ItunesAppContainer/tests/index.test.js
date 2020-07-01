/**
 *
 * Tests for ItunesAppContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { ItunesAppContainerTest as ItunesAppContainer } from '../index';

describe('<ItunesAppContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesAppContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
