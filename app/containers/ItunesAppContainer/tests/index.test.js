/**
 *
 * Tests for ItunesAppContainer
 *
 *
 */

import React from 'react';
import { ItunesAppContainerTest as ItunesAppContainer } from '../index';
import { Input } from 'antd';
import { timeout, renderWrappedComponent } from '@app/utils/testUtils';
import { SongList } from '@app/containers/SongList/index';

const { Search } = Input;

describe('<ItunesAppContainer /> container tests', () => {
  it('should call dispatchRequestSong after onchange and onsearch', async () => {
    const mockOnSearchChange = jest.fn();
    const rootComponent = renderWrappedComponent(
      <ItunesAppContainer dispatchRequestSearchSong={mockOnSearchChange} songsData={[]} showLoader={true} />
    ).root;
    const searchComponent = rootComponent.findByType(Search);
    searchComponent.props.onChange({ target: { value: 'k' } });
    await timeout(200);
    expect(mockOnSearchChange).toBeCalled();
    searchComponent.props.onSearch('searchedItem');
    await timeout(200);
    expect(mockOnSearchChange).toBeCalled();
  });

  it('should show SongList component', () => {
    const rootComponent = renderWrappedComponent(
      <ItunesAppContainer
        songsData={[{ collectionId: 1, collectionViewUrl: 'sampleUrl', trackName: 'sample track' }]}
      />
    ).root;
    expect(rootComponent.findByType(SongList)).toBeTruthy();
  });

  it('should show empty message', () => {
    const rootComponent = renderWrappedComponent(<ItunesAppContainer songsData={[]} />).root;
    const emptyMessage = rootComponent.findByType('p');
    expect(emptyMessage).toBeTruthy();
  });
});
