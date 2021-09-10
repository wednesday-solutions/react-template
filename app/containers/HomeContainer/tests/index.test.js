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
  it.only('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchArtistData={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearArtistData on empty change', async () => {
    const getArtistDataSpy = jest.fn();
    const clearArtistSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchClearArtistData={clearArtistSpy} dispatchArtistData={getArtistDataSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getArtistDataSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearArtistSpy).toBeCalled();
  });

  it('should call dispatchArtistData on change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchArtistData={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
