/**
 *
 * Tests for LazyImage
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import AudioPlayer from '../index';

describe('<AudioPlayer />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<AudioPlayer />);
    expect(baseElement).toMatchSnapshot();
  });
});
