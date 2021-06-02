/**
 *
 * Tests for SoundCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import SoundCard from '../index';

describe('<SoundCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SoundCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 SoundCard component', () => {
    const { getAllByTestId } = renderWithIntl(<SoundCard />);
    expect(getAllByTestId('sound-card').length).toBe(1);
  });
});
