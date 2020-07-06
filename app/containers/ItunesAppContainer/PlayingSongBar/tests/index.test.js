/**
 *
 * Tests for PlayingSongBar
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl } from '@utils/testUtils';
import PlayingSongBar from '../index';

describe('<PlayingSongBar />', () => {
  let dispatchPlayingSongSpy;
  beforeEach(() => {
    dispatchPlayingSongSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<PlayingSongBar />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 PlayingSongBar component', () => {
    const { getAllByTestId } = renderWithIntl(<PlayingSongBar />);
    expect(getAllByTestId('playing-song-bar').length).toBe(1);
  });

  it('should dispatch dispatchPlayingSong action', () => {
    const { getByTestId } = renderWithIntl(
      <PlayingSongBar song={{ trackId: 1, previewUrl: 'sampleurl' }} dispatchPlayingSong={dispatchPlayingSongSpy} />
    );
    fireEvent.click(getByTestId('pause_btn'));
    expect(dispatchPlayingSongSpy).toBeCalled();
  });
});
