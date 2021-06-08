import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { selectSongName, selectSongsData, selectSongsError } from './selectors';
import saga from './saga';
import styled from 'styled-components';
import { Card, Input, Skeleton, Spin } from 'antd';
import PropTypes from 'prop-types';
import { homeContainerCreators } from './reducer';
import get from 'lodash/get';
import SoundCard from '@components/SoundCard';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
const { Search } = Input;

const SearchBoxContainer = styled(Card)`
  && {
    text-align: center;
    margin: 1em auto;
  }
`;
const MusicBoxContainer = styled.div`
  && {
    margin: 1.3em auto;
    max-height: 35em;
    overflow: scroll;
  }
`;
const SearchBox = styled(Search)`
  && {
    width: 60%;
    margin: 0 auto;
  }
`;
const Spinner = styled(Spin)`
  && {
    width: 100%;
    margin: 0 auto;
  }
`;

export function HomeContainer({ dispatchSongs, songsData, songName, intl }) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (songsData && loading) {
      setLoading(false);
    }
  }, [songsData]);

  useEffect(() => {
    if (songName && !songsData?.items?.length) {
      dispatchSongs(songName);
      setLoading(true);
    }
  }, []);
  const handleOnChange = sName => {
    if (!isEmpty(sName)) {
      dispatchSongs(sName);
      setLoading(true);
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <div>
      <SearchBoxContainer>
        <SearchBox
          data-testid="search-box"
          placeholder={intl.formatMessage({ id: 'search_song' })}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </SearchBoxContainer>
      <MusicBoxContainer>
        <Skeleton loading={loading} active>
          <SoundCard songs={songsData} complete={false} />
        </Skeleton>
      </MusicBoxContainer>
    </div>
  );
}

HomeContainer.propTypes = {
  intl: PropTypes.object,
  dispatchSongs: PropTypes.func,
  songsData: PropTypes.array,
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
  memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
