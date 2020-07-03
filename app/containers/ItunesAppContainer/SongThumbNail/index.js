/**
 *
 * SongThumbNail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PlayCircleOutlined } from '@ant-design/icons';

const CustomPlayCircleOutlined = styled(PlayCircleOutlined)`
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
    border-radius:${props => props.borderRadius}px;
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
    border-radius:${props => props.borderRadius}px;
  }
`;

function SongThumbNail({ song, height = 280, borderRadius = 0 }) {
  return (
    <StyledImage url={song?.artworkUrl100} height={height} borderRadius={borderRadius}>
      <div className="thumbNailContainer" borderRadius={borderRadius}>
        <div className="thumbNail">
          <div className="thumbNailWrapper">
            <div style={{ flex: 1 }} />
            <div>
              <CustomPlayCircleOutlined
                onClick={e => {
                  e.stopPropagation();
                  window.open(song?.previewUrl, '_blank');
                }}
              />
            </div>
            <div style={{ flex: 1 }} />
          </div>
        </div>
      </div>
    </StyledImage>
  );
}
SongThumbNail.propTypes = { song: PropTypes.Object, height: PropTypes.Number, borderRadius: PropTypes.Number };

export default SongThumbNail;
