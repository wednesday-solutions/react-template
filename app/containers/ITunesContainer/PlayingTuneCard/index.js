/**
 *
 * PlayingTuneCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '@themes';
import { Row, Col } from 'antd';
import { PauseCircleOutlined } from '@ant-design/icons';
import { FormattedMessage as T } from 'react-intl';

const CustomPauseButton = styled(PauseCircleOutlined)`
  float: right;
  font-size: 2rem;
  margin-top: 1rem;
  margin-right: 2rem;
  cursor: pointer;
`;
const CustomPlayingTuneCard = styled.div`
  position: fixed;
  bottom: 0;
  margin: 2vw;
  margin-left: 75vw;
  width: 20vw;
  height: 6rem;
  padding: 1rem;
  background-color: ${colors.primary};
  @media (max-width: 500px) {
    width: 60vw;
    margin-left: 35vw;
  }
`;
function PlayingTuneCard({ currentTune, dispatchCurrentTune }) {
  return (
    <CustomPlayingTuneCard data-testid="playing-tune-card">
      <Row>
        <Col span={12}>
          <div>
            <T id={currentTune.trackName} />
          </div>
          <div>
            <T id={currentTune.artistName} />
          </div>
        </Col>

        <Col span={12}>
          <CustomPauseButton
            data-testid="btn1"
            onClick={e => {
              dispatchCurrentTune(null);
            }}
          />
        </Col>
      </Row>
    </CustomPlayingTuneCard>
  );
}

PlayingTuneCard.propTypes = {
  currentTune: PropTypes.object,
  dispatchCurrentTune: PropTypes.func
};
export default PlayingTuneCard;
