/**
 *
 * SongThumbNail
 *
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icons from '@app/icons';
import { SONG_THUMBNAIL_HEIGHT } from '@app/utils/constants';
import If from '@app/components/If';

const CustomPlayCircleOutlined = styled(Icons.PlayIcon)`
  && {
    font-size: 50px;
    color: red;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const CustomPauseCircleOutlined = styled(Icons.PauseIcon)`
  && {
    font-size: 50px;
    color: red;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const StyledImage = styled.div`
  && {
    display: block;
    background: url(${props => props.url});
    width: 100%;
    height: ${props => props.height}px;
    background-size: 100%;
    background-repeat: no-repeat;
  }
`;

const ThumbNailContainer = styled.div`
  && {
    width: 100%;
    height: 100%;
    div {
      display: none;
    }
  }
  &:hover {
    div {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
    }
  }
`;

SongThumbNail.defaultProps = {
  song: {},
  height: SONG_THUMBNAIL_HEIGHT
};

export function SongThumbNail({ song, height, borderRadius = 0, playingSong, dispatchPlayingSong }) {
  const audioElementRef = useRef(null);
  useEffect(() => {
    (() =>
      playingSong && song && playingSong?.trackId === song?.trackId
        ? audioElementRef.current.play()
        : audioElementRef?.current?.pause())();
  }, [playingSong, song]);

  return (
    <StyledImage url={song?.artworkUrl100} height={height} borderRadius={borderRadius}>
      <ThumbNailContainer>
        <div>
          <div style={{ flex: 1 }} />
          <If condition={playingSong?.trackId === song?.trackId}>
            <CustomPauseCircleOutlined
              data-testid="pause_btn"
              onClick={e => {
                e.stopPropagation();
                dispatchPlayingSong(null);
              }}
            />
          </If>
          <If condition={playingSong?.trackId !== song?.trackId}>
            <CustomPlayCircleOutlined
              data-testid="play_btn"
              onClick={e => {
                e.stopPropagation();
                dispatchPlayingSong(song);
              }}
            />
          </If>
          <div style={{ flex: 1 }} />
        </div>
      </ThumbNailContainer>

      <audio ref={audioElementRef}>
        <source src={song?.previewUrl}></source>
      </audio>
    </StyledImage>
  );
}
SongThumbNail.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.Number,
    previewUrl: PropTypes.string
  }),
  height: PropTypes.Number,
  borderRadius: PropTypes.Number,
  dispatchPlayingSong: PropTypes.func,
  playingSong: PropTypes.shape({
    trackId: PropTypes.Number,
    previewUrl: PropTypes.string
  })
};

export default SongThumbNail;
