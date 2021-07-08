/**
 *
 * Tests for ITunesSearch
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { ITunesSearchTest as ITunesSearch } from '../index';

describe('<ITunesSearch /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunesSearch />);
    expect(baseElement).toMatchSnapshot();
  });
});
