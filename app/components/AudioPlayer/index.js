import React, { useState, useRef } from 'react';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { colors } from '@app/themes/';

const PlayIcon = styled(PlayCircleFilled)`
  && {
    font-size: 2.5em;
  }
`;
const PauseIcon = styled(PauseCircleFilled)`
  && {
    font-size: 2.5em;
  }
`;
const Timeline = styled.div`
  && {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${colors.background};
    border: 1px solid ${colors.border};
  }
`;
const TimelineContainer = styled.div`
  && {
    position: relative;
    width: 100%;
    margin: 1em 0em;
    height: 0.4em;
  }
`;

const Progress = styled.div`
  && {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: ${colors.progress};
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
  const [percentPlayed, setPercentPlayed] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const audio = useRef(null);
  const timeline = useRef(null);

  const calculatePercentPlayed = () => {
    setPercentPlayed((audio.current.currentTime / audio.current.duration).toFixed(2) * 100);
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
    setCurrentTime(time);
    timeline.current.addEventListener('click', seek);
    calculatePercentPlayed();
  };

  const onEnded = () => {
    setPercentPlayed(0);
    setCurrentTime('00:00');
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

  const Play = () => {
    return (
      <Tooltip title={intl.formatMessage({ id: 'play' })}>
        <PlayIcon onClick={e => play(e)} />
      </Tooltip>
    );
  };

  const Pause = () => {
    return (
      <Tooltip title={intl.formatMessage({ id: 'pause' })}>
        <PauseIcon onClick={e => pause(e)} />
      </Tooltip>
    );
  };

  return (
    <div>
      <Controls>
        {playing ? <Pause /> : <Play />}
        <TimelineContainer>
          <Timeline ref={timeline}>
            <Progress style={{ width: `${percentPlayed}%` }}></Progress>
          </Timeline>
        </TimelineContainer>

        <small id="currentTime">{currentTime}</small>
      </Controls>
      <audio ref={audio} src={source} onTimeUpdate={initProgressBar} onEnded={onEnded} />
    </div>
  );
};

AudioPlayer.propTypes = {
  source: PropTypes.string,
  intl: PropTypes.object
};

export default compose(injectIntl)(AudioPlayer);
