/**
 *
 * PlayingSongBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PauseCircleOutlined } from '@ant-design/icons';
import If from '@app/components/If/index';

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
  .song-name {
    font-size: 20px;
  }

  .tracktype {
    text-transform: uppercase;
    font-size: 12px;
  }
`;
function PlayingSongBar({ song, dispatchPlayingSong }) {
  return (
    <Container data-testid="playing-song-bar">
      <div>
        <If condition={song}>
          <CustomPauseButton onClick={() => dispatchPlayingSong(null)} />
        </If>
      </div>
      <div className="song">
        <span className="song-name">{song?.trackName}</span>

        <span className="tracktype">
          <span>{song?.primaryGenreName}</span>:
          <span style={{ marginLeft: 10 }}>{new Date(song?.releaseDate).getFullYear()}</span>
        </span>
      </div>
    </Container>
  );
}

PlayingSongBar.propTypes = { song: PropTypes.Object, dispatchPlayingSong: PropTypes.func };

export default PlayingSongBar;
