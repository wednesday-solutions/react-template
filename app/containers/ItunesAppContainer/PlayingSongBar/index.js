/**
 *
 * PlayingSongBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { PauseCircleOutlined } from '@ant-design/icons';

import { PAUSE_SONG } from '@app/utils/constants';
import If from '@app/components/If';

const CustomPauseButton = styled(PauseCircleOutlined)`
  && {
    color: red;
    font-size: 30px;
    cursor: pointer;
  }
`;
const Container = styled.div`
  && {
    display: flex;
    align-items: baseline;
  }
  .song {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  .tracktype {
    text-transform: uppercase;
    font-size: 12px;
  }
`;

const TrackType = styled.div`
  && {
    text-transform: uppercase;
    font-size: 12px;
  }
`;
function PlayingSongBar({ song, dispatchPlayingSong }) {
  return (
    <Container data-testid="playing-song-bar">
      <div>
        <If condition={song}>
          <CustomPauseButton data-testid="pause_btn" onClick={() => dispatchPlayingSong(PAUSE_SONG)} />
        </If>
      </div>
      <div className="song">
        <span style={{ fontSize: 20 }}>{song?.trackName}</span>
        <If condition={song?.primaryGenreName}>
          <TrackType>
            <span>{song?.primaryGenreName}</span>:
            <span style={{ marginLeft: 10 }}>{moment(song?.releaseDate).year()}</span>
          </TrackType>
        </If>
      </div>
    </Container>
  );
}

PlayingSongBar.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    previewUrl: PropTypes.string.isRequired
  }),
  dispatchPlayingSong: PropTypes.func.isRequired
};

export default PlayingSongBar;
