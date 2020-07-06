/**
 *
 * SongDetailsComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { SONG_THUMBNAIL_HEIGHT } from '@app/utils/constants';

import SongThumbNail from '../SongThumbNail/index';
import { selectPlayingSong } from '../selectors';
import { itunesAppContainerCreators } from '../reducer';

const Container = styled.div`
  && {
    display: flex;
    flex: 2;
    flex-direction: column;
  }
`;

const ArtistName = styled.div`
  && {
    font-size: 16px;
    color: #007aff;
    font-weight: bold;
  }
`;

export function SongDetailsComponent({ song, playingSong, dispatchPlayingSong }) {
  return (
    <div data-testid="song-details-component">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, margin: 20 }}>
          <SongThumbNail
            dispatchPlayingSong={dispatchPlayingSong}
            song={song}
            playingSong={playingSong}
            height={SONG_THUMBNAIL_HEIGHT}
            borderRadius={50}
          />
        </div>
        <Container>
          <span style={{ fontSize: 20 }}>{song?.collectionName}</span>
          <span style={{ fontSize: 10 }}>{song?.trackCensoredName}</span>
          <ArtistName className="artistName" href={song?.artistViewUrl}>
            {song?.artistName}
          </ArtistName>
          <span style={{ textTransform: 'uppercase' }}>
            {song?.primaryGenreName}:
            <span style={{ marginLeft: 10 }}>
              {moment(song?.releaseDate, 'DD/MM/YYYY').year() || new Date(song?.releaseDate).getFullYear()}
            </span>
          </span>
        </Container>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  playingSong: selectPlayingSong()
});

const mapDispatchToProps = dispatch => {
  const { setPlayingSong } = itunesAppContainerCreators;
  return {
    dispatchPlayingSong: song => dispatch(setPlayingSong(song))
  };
};

SongDetailsComponent.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.Number,
    previewUrl: PropTypes.string
  }),
  playingSong: PropTypes.shape({
    trackId: PropTypes.Number,
    previewUrl: PropTypes.string
  }),
  dispatchPlayingSong: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongDetailsComponent);
