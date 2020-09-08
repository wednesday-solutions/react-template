import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import { selectItunesContainer, selectSongsData, selectSongsError, selectSongName } from './selectors';
import { itunesContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function ItunesContainer({
  dispatchItunesSongs,
  dispatchClearItunesSongs,
  intl,
  songsData = {},
  songsError = null,
  songName,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(songsData, 'results', null) || songsError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songsData]);

  useEffect(() => {
    if (songName && !songsData?.results?.length) {
      dispatchItunesSongs(songName);
      setLoading(true);
    }
  }, []);
  useInjectSaga({ key: 'itunesContainer', saga });

  const history = useHistory();

  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
      dispatchItunesSongs(rName);
      setLoading(true);
    } else {
      dispatchClearItunesSongs();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(songsData, 'results', []);
    const resultCount = get(songsData, 'resultCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {songName && (
              <div>
                <T id="search_query" values={{ songName }} />
              </div>
            )}
            {resultCount !== 0 && (
              <div>
                <T id="matching_results" values={{ resultCount }} />
              </div>
            )}
            {items.map((item, index) => (
              <CustomCard key={index}>
                <T id="song_name" values={{ name: item.trackName }} />
                <T id="song_artist" values={{ fullName: item.artistName }} />
                <T id="release_date" values={{ stars: item.releaseDate }} />
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (songsError) {
      repoError = songsError;
    } else if (!get(songsData, 'resultCount', 0)) {
      repoError = 'song_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard color={songsError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'song_list' })}>
          <T id={repoError} />
        </CustomCard>
      )
    );
  };
  const refreshPage = () => {
    history.push('itunes');
    window.location.reload();
  };
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <Clickable textId="itunes_page" onClick={refreshPage} />
      </RightContent>
      <CustomCard title={intl.formatMessage({ id: 'song_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_repo_songs" />
        <Search
          data-testid="search-bar"
          defaultValue={songName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

ItunesContainer.propTypes = {
  dispatchItunesSongs: PropTypes.func,
  dispatchClearItunesSongs: PropTypes.func,
  intl: PropTypes.object,
  songsData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  songsError: PropTypes.object,
  songName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

ItunesContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  itunesContainer: selectItunesContainer(),
  songsData: selectSongsData(),
  songsError: selectSongsError(),
  songName: selectSongName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItunesSongs, clearItunesSongs } = itunesContainerCreators;
  return {
    dispatchItunesSongs: songName => dispatch(requestGetItunesSongs(songName)),
    dispatchClearItunesSongs: () => dispatch(clearItunesSongs())
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
)(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
