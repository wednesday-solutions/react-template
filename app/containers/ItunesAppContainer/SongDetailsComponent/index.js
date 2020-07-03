/**
 *
 * SongDetailsComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import SongThumbNail from '../SongThumbNail/index';
import { selectPlayingSong } from '../selectors';
import { itunesAppContainerCreators } from '../reducer';

const Container = styled.div`
  .collectionName {
    font-size: 20px;
  }
  .artistName {
    font-size: 16px;
    color: #007aff;
    font-weight: bold;
  }
  .artistName:hover {
    text-decoration: underline;
  }
  .censor{
    font-size:10px;
  }
  .tracktype{
    text-transform: uppercase;
  }
  && {
    display: flex;
    flex: 2;
    flex-direction: column;
  }
`;

function SongDetailsComponent({ song, playingSong, dispatchPlayingSong }) {

  return (
    <div data-testid="song-details-component">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, margin: 20 }}>
          <SongThumbNail dispatchPlayingSong={dispatchPlayingSong} song={song} playingSong={playingSong} height={280} borderRadius={50} />
        </div>
        <Container>
          <span className="collectionName">{song?.collectionName}</span>
          <span className="censor">
            {song?.trackCensoredName}
          </span>
          <a className="artistName" href={song?.artistViewUrl} target="_blank">
            {song?.artistName}
          </a>
          <span className="tracktype">
            {song?.primaryGenreName}:
            <span style={{ marginLeft: 10 }}>
              {new Date(song?.releaseDate).getFullYear()}
            </span>
          </span>

        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  playingSong: selectPlayingSong(),
});

const mapDispatchToProps = dispatch => {
  const { setPlayingSong } = itunesAppContainerCreators;
  return {
    dispatchPlayingSong: song => dispatch(setPlayingSong(song))
  };
};


SongDetailsComponent.propTypes = { song: PropTypes.Object };

export default connect(mapStateToProps, mapDispatchToProps)(SongDetailsComponent);
