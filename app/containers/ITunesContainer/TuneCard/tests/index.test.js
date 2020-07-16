/**
 *
 * Tests for TuneCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl } from '@utils/testUtils';
import TuneCard from '../index';

describe('<TuneCard />', () => {
  let dispatchCurrentTuneSpy;
  const mockSongData = {
    trackId: 1,
    artistName: 'Ed',
    trackName: 'Perfect',
    releaseDate: '2017-05-10'
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TuneCard song={mockSongData} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should dispatch dispatchCurrentTune when clicked on button', () => {
    dispatchCurrentTuneSpy = jest.fn();
    const { getByTestId } = renderWithIntl(
      <TuneCard dispatchCurrentTune={dispatchCurrentTuneSpy} song={mockSongData} />
    );
    fireEvent.click(getByTestId('btn1'));
    expect(dispatchCurrentTuneSpy).toBeCalled();
  });

  it('should show play button', () => {
    const { getByTestId } = renderWithIntl(
      <TuneCard song={mockSongData} currentTune={{ trackId: 2 }} dispatchCurrentTune={dispatchCurrentTuneSpy} />
    );
    expect(getByTestId('btn1')).toBeTruthy();
  });
  it('should show pause button', () => {
    const { getByTestId } = renderWithIntl(
      <TuneCard song={mockSongData} currentTune={{ trackId: 1 }} dispatchCurrentTune={dispatchCurrentTuneSpy} />
    );
    expect(getByTestId('btn2')).toBeTruthy();
  });
});
