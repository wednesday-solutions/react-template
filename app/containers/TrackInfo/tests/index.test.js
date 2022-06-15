/**
 *
 * Tests for TrackInfo
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { TrackInfoTest as TrackInfo } from '../index';

describe('<TrackInfo /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackInfo />);
    expect(baseElement).toMatchSnapshot();
  });
});
