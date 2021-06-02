import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import { selectSongName, selectSongsData, selectSongsError } from './selectors';
import saga from './saga';
import styled from 'styled-components';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useInjectReducer } from '@utils/injectReducer';
import reducer, { homeContainerCreators } from './reducer';
import get from 'lodash/get';
import If from '@components/If';
import Search from 'antd/es/input/Search';
import SoundCard from '@components/SoundCard';

const SearchBoxContainer = styled(Card)`
  && {
    text-align: center;
    margin: 1em auto;
  }
`;
const MusicBoxContainer = styled.div`
  && {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    width: 90%;
    margin: 1.3em auto;
    max-height: 35em;
    overflow: scroll;
  }
`;

export function HomeContainer({ dispatchSongs, songsData, songName, intl }) {
  // eslint-disable-next-line no-console
  useInjectReducer({ key: 'HomeContainer', reducer });
  useInjectSaga({ key: 'HomeContainer', saga });
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = value => {
    dispatchSongs(value);
    setLoading(true);
  };
  const renderSongs = () => {
    const songs = get(songsData, 'results', []);
    return <SoundCard songs={songs} />;
  };

  return (
    <div>
      <SearchBoxContainer>
        <Search
          placeholder={intl.formatMessage({ id: 'placeHolder_Home' })}
          style={{ width: '60%', margin: '0 auto' }}
          type="text"
          onPressEnter={e => handleOnSubmit(e.target.value)}
        />
      </SearchBoxContainer>
      <If condition={loading}>
        <MusicBoxContainer>{renderSongs()}</MusicBoxContainer>
      </If>
    </div>
  );
}

HomeContainer.propTypes = {
  intl: PropTypes.object,
  dispatchSongs: PropTypes.func,
  songsData: PropTypes.object,
  songName: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  songsData: selectSongsData(),
  songName: selectSongName(),
  songsError: selectSongsError()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongsPlaylist } = homeContainerCreators;
  return {
    dispatchSongs: songName => {
      dispatch(requestGetSongs(songName));
    },
    dispatchClearSongsPlaylist: () => dispatch(clearSongsPlaylist())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo,
  withRouter
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
