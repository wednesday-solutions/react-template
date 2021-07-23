/**
 *
 * Tests for LazyImage
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import LazyImage from '../index';
import logo from '@images/logo.png';

describe('<LazyImage />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<LazyImage lowResUrl={logo} highResUrl={logo} />);
    expect(baseElement).toMatchSnapshot();
  });
});
