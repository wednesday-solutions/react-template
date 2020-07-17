/**
 *
 * Tests for TuneInfo
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderProvider } from '@utils/testUtils';
import { TuneContainerTest as TuneInfo } from '../index';

describe('<TuneInfo />', () => {
  const mockSongData = {
    trackId: 1,
    artistName: 'Ed',
    trackName: 'Perfect',
    releaseDate: '2017-05-10'
  };
  let dispatchTuneByIdSpy;
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TuneInfo selectedTune={mockSongData} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TuneInfo component', () => {
    const { getAllByTestId } = renderProvider(<TuneInfo selectedTune={mockSongData} />);
    expect(getAllByTestId('tune-info').length).toBe(1);
  });

  it('should render and match the snapshot when there is no redux store', () => {
    dispatchTuneByIdSpy = jest.fn();
    const { baseElement } = renderProvider(<TuneInfo dispatchTuneById={dispatchTuneByIdSpy} tuneData={mockSongData} />);
    expect(baseElement).toMatchSnapshot();
  });
});
