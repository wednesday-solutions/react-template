/**
 *
 * Tests for WeatherContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { WeatherContainerTest as WeatherContainer } from '../index';

describe('<WeatherContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<WeatherContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
