/**
 *
 * SongThumbNail
 *
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import If from '@app/components/If/index';
import { SONG_THUMBNAIL_HEIGHT } from '@app/utils/constants';

const CustomPlayCircleOutlined = styled(PlayCircleOutlined)`
  && {
    font-size: 50px;
    color: red;
  }
`;
const CustomPauseCircleOutlined = styled(PauseCircleOutlined)`
  && {
    font-size: 50px;
    color: red;
  }
`;

export const StyledImage = styled.div`
  .thumbNail {
    width: 100%;
    height: 100%;
    text-align: center;
    display: none;
  }
  .thumbNailContainer {
    width: 100%;
    border-radius: ${props => props.borderRadius}px;
    height: 100%;
  }

  .thumbNailContainer:hover .thumbNail {
    display: block;
    text-align: center;
  }

  .thumbNailContainer:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .thumbNailWrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  && {
    display: block;
    background: url(${props => props.url});
    width: 100%;
    height: ${props => props.height}px;
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: ${props => props.borderRadius}px;
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
      <div className="thumbNailContainer" borderRadius={borderRadius}>
        <div className="thumbNail">
          <div className="thumbNailWrapper">
            <div style={{ flex: 1 }} />
            <div>
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
            </div>
            <div style={{ flex: 1 }} />
          </div>
        </div>
      </div>
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
