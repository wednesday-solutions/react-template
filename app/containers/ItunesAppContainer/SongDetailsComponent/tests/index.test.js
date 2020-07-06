/**
 *
 * Tests for SongDetailsComponent
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import { SongDetailsComponent } from '../index';

describe('<SongDetailsComponent />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SongDetailsComponent />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 SongDetailsComponent component', () => {
    const { getAllByTestId } = renderWithIntl(<SongDetailsComponent />);
    expect(getAllByTestId('song-details-component').length).toBe(1);
  });
});
