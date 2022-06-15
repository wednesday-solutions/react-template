/**
 *
 * Tests for MusicInfoCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import MusicInfoCard from '../index';

describe('<MusicInfoCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<MusicInfoCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 MusicInfoCard component', () => {
    const { getAllByTestId } = renderWithIntl(<MusicInfoCard />);
    expect(getAllByTestId('music-info-card').length).toBe(1);
  });
});
