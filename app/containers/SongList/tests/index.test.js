/**
 *
 * Tests for SongList
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import SongList from '../index';

describe('<SongList />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SongList />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 SongList component', () => {
    const { getAllByTestId } = renderWithIntl(<SongList />);
    expect(getAllByTestId('song-list').length).toBe(1);
  });
});
