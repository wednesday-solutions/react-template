/**
 *
 * Tests for SongContainer
 *
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { SongContainerTest as SongContainer } from '../index';

describe('<SongContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SongContainer />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should call dispatchClearSongs on empty change', async () => {
    const getSongsSpy = jest.fn();
    const clearSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <SongContainer dispatchClearSongs={clearSongsSpy} dispatchSongs={getSongsSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getSongsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearSongsSpy).toBeCalled();
  });
  it('should call dispatchGetSongs on non-empty change', async () => {
    const getSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(<SongContainer dispatchSongs={getSongsSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'aa' }
    });
    await timeout(500);
    expect(getSongsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getSongsSpy).toBeCalled();
  });

  it('should call dispatchSongs on change', async () => {
    const { getByTestId } = renderProvider(<SongContainer dispatchSongs={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
