import React, { useState, useRef } from 'react';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

const PlayIcon = styled(PlayCircleFilled)`
  && {
    font-size: 250%;
  }
`;
const PauseIcon = styled(PauseCircleFilled)`
  && {
    font-size: 250%;
  }
`;
const Timeline = styled.div`
  && {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #e3e3e3;
    border: 1px solid black;
  }
`;
const TimelineContainer = styled.div`
  && {
    position: relative;
    width: 100%;
    margin: 1em 5px;
    height: 5px;
  }
`;

const Progress = styled.div`
  && {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: coral;
  }
`;
const Controls = styled.div`
  && {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1em;
  }
`;

const AudioPlayer = ({ source, intl }) => {
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null);
  const timeline = useRef(null);
  const progress = useRef(null);
  const controls = useRef(null);
  const currentTime = useRef(null);

  const calculatePercentPlayed = () => {
    let percentPlayed = (audio.current.currentTime / audio.current.duration).toFixed(2) * 100;
    progress.current.style.width = `${percentPlayed}%`;
  };
  const calculateCurrentValue = currentTime => {
    const currentMinute = parseInt(currentTime / 60) % 60;
    const currentSecondsLong = currentTime % 60;
    const currentSeconds = currentSecondsLong.toFixed();
    const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
      currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
    }`;

    return currentTimeFormatted;
  };
  const initProgressBar = () => {
    const media = audio.current;
    const time = calculateCurrentValue(media.currentTime);

    function seek(e) {
      e.stopPropagation();
      const percent = e.offsetX / timeline.current.offsetWidth;
      media.currentTime = percent * media.duration;
    }

    currentTime.current.innerHTML = time;
    timeline.current.addEventListener('click', seek);
    calculatePercentPlayed();
  };

  const onEnded = () => {
    progress.current.style.width = 0;
    currentTime.current.innerHTML = '00:00';

    setPlaying(false);
  };

  const play = e => {
    e.stopPropagation();
    setPlaying(true);
    audio.current.play();
  };

  const pause = e => {
    e.stopPropagation();
    setPlaying(false);
    audio.current.pause();
  };

  return (
    <div>
      <Controls ref={controls}>
        {playing ? (
          <Tooltip title={intl.formatMessage({ id: 'pause' })}>
            <PauseIcon onClick={e => pause(e)} />
          </Tooltip>
        ) : (
          <Tooltip title={intl.formatMessage({ id: 'play' })}>
            <PlayIcon onClick={e => play(e)} />
          </Tooltip>
        )}
        <TimelineContainer>
          <Timeline ref={timeline}>
            <Progress ref={progress}></Progress>
          </Timeline>
        </TimelineContainer>

        <small id="currentTime" ref={currentTime}>
          00:00
        </small>
      </Controls>
      <audio ref={audio} src={source} onTimeUpdate={initProgressBar} onEnded={onEnded} />
    </div>
  );
};

AudioPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  intl: PropTypes.object
};

export default compose(injectIntl)(AudioPlayer);
