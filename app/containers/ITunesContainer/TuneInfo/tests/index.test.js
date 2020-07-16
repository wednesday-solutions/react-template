/**
 *
 * Tests for TuneInfo
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import { TuneContainerTest as TuneInfo } from '../index';

describe('<TuneInfo />', () => {
  const mockSongData = {
    trackId: 1,
    artistName: 'Ed',
    trackName: 'Perfect',
    releaseDate: '2017-05-10'
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TuneInfo selectedTune={mockSongData} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TuneInfo component', () => {
    const { getAllByTestId } = renderWithIntl(<TuneInfo selectedTune={mockSongData} />);
    expect(getAllByTestId('tune-info').length).toBe(1);
  });
});
