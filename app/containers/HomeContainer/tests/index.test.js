/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchArtist={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearAristSearch on empty change', async () => {
    const getArtistSpy = jest.fn();
    const clearArtistSearchSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchClearArtistSearch={clearArtistSearchSpy} dispatchArtist={getArtistSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getArtistSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearArtistSearchSpy).toBeCalled();
  });

  it('should call dispatchArtist on change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchArtist={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
