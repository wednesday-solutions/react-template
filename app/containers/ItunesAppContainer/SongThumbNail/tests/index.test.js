/**
 *
 * Tests for SongThumbNail
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';

import { renderWithIntl } from '@utils/testUtils';
import { SongThumbNail } from '../index';

describe('<SongThumbNail />', () => {
  let dispatchPlayingSongSpy;

  beforeEach(() => {
    dispatchPlayingSongSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SongThumbNail />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should dispatch dispatchPlayingSong after click thumbnail', () => {
    dispatchPlayingSongSpy = jest.fn();
    const { getByTestId } = renderWithIntl(<SongThumbNail dispatchPlayingSong={dispatchPlayingSongSpy} />);
    fireEvent.click(getByTestId('pause_btn'));
    expect(dispatchPlayingSongSpy).toBeCalled();
  });
  it('should show play button', () => {
    const { getByTestId } = renderWithIntl(
      <SongThumbNail song={{ trackId: 1 }} playingSong={{ trackId: 2 }} dispatchPlayingSong={dispatchPlayingSongSpy} />
    );
    expect(getByTestId('play_btn')).toBeTruthy();
  });
  it('should show pause button', () => {
    const { getByTestId } = renderWithIntl(
      <SongThumbNail song={{ trackId: 1 }} playingSong={{ trackId: 1 }} dispatchPlayingSong={dispatchPlayingSongSpy} />
    );
    expect(getByTestId('pause_btn')).toBeTruthy();
  });
});
