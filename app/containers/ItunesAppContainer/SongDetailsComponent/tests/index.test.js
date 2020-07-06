/**
 *
 * Tests for SongDetailsComponent
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import { SongDetailsComponent } from '../index';

describe('<SongDetailsComponent />', () => {
  let dispatchPlayingSongSpy;
  beforeEach(() => {
    dispatchPlayingSongSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SongDetailsComponent />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 SongDetailsComponent component', () => {
    const { getAllByTestId } = renderWithIntl(<SongDetailsComponent dispatchPlayingSong={dispatchPlayingSongSpy} />);
    expect(getAllByTestId('song-details-component').length).toBe(1);
  });
});
