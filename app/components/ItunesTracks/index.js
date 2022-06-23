/**
 *
 * ItunesTracks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TrackCard = styled.div`
  padding: 20px;
  margin: 1px solid black;
  display: flex;
`;

const TrackImg = styled.div`
  width: 50%;
  overflow: hidden;
`;

const TrackInfo = styled.div`
  align-self: flex-center;
`;

export function ItunesTracks({ artistName, trackName, artworkUrl }) {
  return (
    <TrackCard data-testid="itunes-tracks">
      <TrackImg>
        <img src={artworkUrl} alt={artistName} />
      </TrackImg>
      <TrackInfo>
        Artist Name - {artistName}
        <br />
        Track Name - {trackName}
      </TrackInfo>
    </TrackCard>
  );
}

ItunesTracks.propTypes = {
  artistName: PropTypes.string,
  trackName: PropTypes.string,
  artworkUrl: PropTypes.string
};

export default ItunesTracks;
