/**
 *
 * SongDetailsComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SongThumbNail from '../SongThumbNail/index';
import styled from 'styled-components'

const Container = styled.div`
.collectionName{
  font-size:20px;
}
.artistName{
  font-size:16px;
  color:#007aff;
  font-weight:bold;
}
.artistName:hover{

  text-decoration:underline;
}
&&{
   display:flex;
    flex:2;
   flex-direction:column;
}
`


function SongDetailsComponent({ song }) {
  console.log(song);

  return (
    <div data-testid="song-details-component">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, margin: 20 }}>
          <SongThumbNail song={song} height={280} borderRadius={50} />
        </div>
        <Container>
          <span className='collectionName'>
            {song?.collectionName}
          </span>
          <a className='artistName' href={song?.artistViewUrl} target="_blank">
            {song?.artistName}
          </a>

        </Container>
      </div>
    </div>
  );
}

SongDetailsComponent.propTypes = { song: PropTypes.Object };

export default SongDetailsComponent;
