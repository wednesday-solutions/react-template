/**
 *
 * TrackCard
 *
 */

import React from 'react'
import { Card } from 'antd';
import styled from 'styled-components';
import {PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons'
import If from '@components/If'
import { PropTypes } from 'prop-types';
import { injectIntl } from 'react-intl';
const {Meta} = Card

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    color: ${props => props.color};
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


function TrackCard ({item,condition,onPause,onPlay,value,max}){
  return (
    <CustomCard datatestid="track-card" cover={<img alt="artwork-url" src={item.artworkUrl100} />}>
      <TrackCardContainer>
    <If condition={condition}>
      <CustomPause onClick={(()=>onPause(item.previewUrl))} />
      </If>
      <If condition={!condition}  >
      <CustomPlay onClick={()=>onPlay(item.previewUrl,item.trackId)} /> 
      </If>
      </TrackCardContainer>
      <ProgressBar value={value} max={max}></ProgressBar>
      <MetaCard title={item.trackName} description={item.artistName}>
        {' '}
      </MetaCard>
    </CustomCard>
  );
};


TrackCard.propTypes= {
onPause: PropTypes.func,
onPlay: PropTypes.func,
items: PropTypes.object,
condition: PropTypes.bool, 
}

export default injectIntl(TrackCard)
