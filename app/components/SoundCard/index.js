import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Input } from 'antd';

const SongContainer = styled(Card)`
  && {
    min-height: 14em;
    position: relative;
    box-sizing: border-box;
    width: 31%;
    border-radius: 0.6em;
    margin: 0.6em auto;
  }
`;
const SearchBox = styled(Input)`
  && {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 60%;
  }
`;
const SongPrimary = styled.div`
  && {
    margin: 0.6em 0 0.3em 0;
    width: 95%;
    font-size: 1.1em;
    color: #083445;
  }
`;
const SongSecondary = styled.div`
  && {
    margin-bottom: 1em;
    font-size: 1em;
    color: #149cd0;
  }
`;
const AudioBox = styled.audio`
  && {
    width: 85%;
    position: absolute;
    bottom: 1em;
  }
`;

function SoundCard({ songs }) {
  return songs.map(song => (
    <SongContainer key={song.collectionId}>
      <SongPrimary>{song.trackName}</SongPrimary>
      <SongSecondary>{song.artistName}</SongSecondary>
      <AudioBox controls>
        <source src={song.previewUrl} />
      </AudioBox>
    </SongContainer>
  ));
}

SoundCard.propTypes = {
  songs: PropTypes.array
};

export default SoundCard;
