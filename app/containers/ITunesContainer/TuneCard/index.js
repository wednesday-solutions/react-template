/**
 *
 * TuneCard
 *
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage as T } from 'react-intl';
import { Row, Col } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { colors } from '@themes';
import If from '@app/components/If';

const CustomTuneCard = styled.div`
  && {
    margin: 2rem 0;
    height: 10rem;
    padding: 1rem;
    border: 2px solid ${colors.primary};
    cursor: pointer;
  }
`;

const CustomPlayButton = styled(PlayCircleOutlined)`
  float: right;
  font-size: 2rem;
  margin-top: 3rem;
  margin-right: 3rem;
  cursor: pointer;
`;
const CustomPauseButton = styled(PauseCircleOutlined)`
  float: right;
  font-size: 2rem;
  margin-top: 3rem;
  margin-right: 3rem;
  cursor: pointer;
`;
const CustomInfoButton = styled(InfoCircleOutlined)`
  float: right;
  font-size: 2rem;
  margin-top: 3rem;
  margin-right: 5rem;
  cursor: pointer;
`;
function TuneCard({ song, currentTune, dispatchCurrentTune, dispatchSelectedTune }) {
  const tuneRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    (() =>
      currentTune && song && currentTune?.trackId === song?.trackId
        ? tuneRef.current.play()
        : tuneRef?.current?.pause())();
  }, [currentTune, song]);

  const artistName = song.artistName;
  const trackName = song.trackName;
  const release = song.releaseDate.substring(0, 4);
  return (
    <CustomTuneCard data-testid="tune-card">
      <Row>
        <Col span={12}>
          <div style={{ marginTop: '1.5rem' }}>
            <T id="track_name" values={{ trackName }} />
          </div>
          <div>
            <T id="artist_name" values={{ artistName }} />
          </div>
          <div>
            <T id="released" values={{ release }} />
          </div>
        </Col>
        <Col span={12}>
          <If condition={currentTune?.trackId !== song?.trackId}>
            <CustomPlayButton
              data-testid="btn1"
              onClick={e => {
                dispatchCurrentTune(song);
              }}
            />
          </If>
          <If condition={currentTune?.trackId === song?.trackId}>
            <CustomPauseButton
              data-testid="btn2"
              onClick={e => {
                dispatchCurrentTune(null);
              }}
            />
          </If>

          <CustomInfoButton
            data-testid="info_btn"
            onClick={() => {
              dispatchSelectedTune(song);
              history.push(`/tune/${song.trackId}`);
            }}
          />
        </Col>
      </Row>
      <audio ref={tuneRef}>
        <source src={song?.previewUrl}></source>
      </audio>
    </CustomTuneCard>
  );
}

TuneCard.propTypes = {
  song: PropTypes.object,
  currentTune: PropTypes.object,
  dispatchCurrentTune: PropTypes.func,
  dispatchSelectedTune: PropTypes.func
};

export default TuneCard;
