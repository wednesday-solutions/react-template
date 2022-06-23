/**
 *
 * Tests for ItunesTracks
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import ItunesTracks from '../index';

describe('<ItunesTracks />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ItunesTracks />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 ItunesTracks component', () => {
    const { getAllByTestId } = renderWithIntl(
      <ItunesTracks
        artistName="Jack Johnson"
        trackName="Jack Johnson"
        artworkUrl="https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/d2/0811d2b3-b4d5-dc22-1107-3625511844b5/00602537869770.rgb.jpg/100x100bb.jpg"
      />
    );
    expect(getAllByTestId('itunes-tracks').length).toBe(1);
  });
});
