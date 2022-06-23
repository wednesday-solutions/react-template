/**
 *
 * Tests for ItunesContainer container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { ItunesContainerTest as ItunesContainer } from '../index';

describe('<ItunesContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
