/**
 *
 * Tests for PlayingTuneCard
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import PlayingTuneCard from '../index';
import { fireEvent } from '@testing-library/dom';

describe('<PlayingTuneCard />', () => {
  let dispatchCurrentTuneSpy;
  const mockCurrentTune = {
    trackName: 'Perfect',
    artistName: 'Ed'
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<PlayingTuneCard currentTune={mockCurrentTune} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 PlayingTuneCard component', () => {
    const { getAllByTestId } = renderWithIntl(<PlayingTuneCard currentTune={mockCurrentTune} />);
    expect(getAllByTestId('playing-tune-card').length).toBe(1);
  });

  it('should show stop button', () => {
    const { getByTestId } = renderWithIntl(
      <PlayingTuneCard currentTune={mockCurrentTune} dispatchCurrentTune={dispatchCurrentTuneSpy} />
    );
    expect(getByTestId('btn1')).toBeTruthy();
  });

  it('should dispatch dispatchCurrentTune after clicking on the button', () => {
    dispatchCurrentTuneSpy = jest.fn();
    const { getByTestId } = renderWithIntl(
      <PlayingTuneCard dispatchCurrentTune={dispatchCurrentTuneSpy} currentTune={mockCurrentTune} />
    );
    fireEvent.click(getByTestId('btn1'));
    expect(dispatchCurrentTuneSpy).toBeCalled();
  });
});
