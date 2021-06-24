/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import TrackCard from '../index';
import MOCK_TRACK from '../mockData';
describe('<TrackCard />', () => {
  it('should render and match the snapshot', () => {
    console.log('before testing');
    const { getAllByTestId, baseElement } = renderWithIntl(<TrackCard track={MOCK_TRACK} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackCard component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackCard track={MOCK_TRACK} />);
    expect(getAllByTestId('track-card').length).toBe(1);
  });
});
