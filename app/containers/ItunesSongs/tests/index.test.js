import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent, cleanup } from '@testing-library/react';
import { ItunesSongsTest as ItunesSongs } from '../index';
import {
  normalizedSongsState,
  artistName
} from '../../HomeContainer/tests/__mocks__/songs.mocks';

describe('<ItunesSongs/> tests', () => {
  let onChangeSpy;

  beforeEach(() => {
    onChangeSpy = jest.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render ItunesSongs component and match snapshot', () => {
    const { baseElement } = renderProvider(
      <ItunesSongs dispatchGetArtistSongs={onChangeSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should render ItunesSongs songs list on dispatchGetArtistSongs and match snapshot', async () => {
    const { baseElement, getByTestId, getAllByTestId } = renderProvider(
      <ItunesSongs
        dispatchGetArtistSongs={onChangeSpy}
        allTrackIds={normalizedSongsState.allTrackIds}
        artistName={artistName}
        songsData={normalizedSongsState.songsData}
      />
    );
    fireEvent.change(getByTestId('songs-search-bar'), {
      target: {
        value: artistName
      }
    });
    await timeout(500);

    expect(baseElement).toMatchSnapshot();

    const listItems = getAllByTestId('songs-meta');

    expect(listItems).toHaveLength(2);
  });

  it('should clear ItunesSongs container songs list on dispatchClearArtistSongs and match snapshot', async () => {
    const getArtistSongsSpy = jest.fn();
    const clearArtistSongsSpy = jest.fn();
    const { baseElement, getByTestId, queryAllByTestId } = renderProvider(
      <ItunesSongs
        dispatchGetArtistSongs={getArtistSongsSpy}
        dispatchClearArtistSongs={clearArtistSongsSpy}
      />
    );
    fireEvent.change(getByTestId('songs-search-bar'), {
      target: { value: artistName }
    });
    await timeout(500);
    expect(getArtistSongsSpy).toBeCalled();

    fireEvent.change(getByTestId('songs-search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearArtistSongsSpy).toBeCalled();

    expect(baseElement).toMatchSnapshot();

    const listItems = queryAllByTestId('songs-meta');

    expect(listItems).toHaveLength(0);
  });
});
