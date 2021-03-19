/**
 *
 * TrackCard
 *
 */

import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import If from '@components/If';
import { PropTypes } from 'prop-types';
import { injectIntl } from 'react-intl';
const { Meta } = Card;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-height: 30rem;
    ${props => props.color && `color: ${props.color}`};
  }
`;
const MetaCard = styled(Meta)`
  && {
    margin: 0.5rem !important;
  }
`;
const TrackCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CustomPlay = styled(PlayCircleFilled)`
  font-size: 2rem;
  padding: 1rem;
  cursor: pointer;
`;
const CustomPause = styled(PauseCircleFilled)`
  font-size: 2rem;
  padding: 1rem;
  cursor: pointer;
`;
const ProgressBar = styled.progress`
  && {
    display: block;
    font-size: 1rem;
  }
`;

function TrackCard({ track, currentlyPlayingTrackId, currentTrack, onPlay, onPause, isPlaying }) {
  return (
    <CustomCard data-testid="track-card" cover={<img alt="artwork-url" src={track.artworkUrl100} />}>
      <TrackCardContainer>
        <If condition={isPlaying && track.trackId === currentlyPlayingTrackId}>
          <CustomPause onClick={() => onPause(track.previewUrl)} />
        </If>
        <If condition={!(isPlaying && track.trackId === currentlyPlayingTrackId)}>
          <CustomPlay onClick={() => onPlay(track.previewUrl, track.trackId)} />
        </If>
      </TrackCardContainer>
      <ProgressBar
        value={
          track.trackId === currentlyPlayingTrackId && currentTrack.currentTime !== 0 ? currentTrack?.currentTime : 0
        }
        max={track.trackTimeMillis / 10000}
      ></ProgressBar>
      <MetaCard title={track.trackName} description={track.artistName}>
        {' '}
      </MetaCard>
    </CustomCard>
  );
}

TrackCard.propTypes = {
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  track: PropTypes.object
};

export default injectIntl(TrackCard);
