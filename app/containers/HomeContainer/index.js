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
import T from '@components/T';
import { useInjectSaga } from 'utils/injectSaga';
import { selectHomeContainer, selectArtistData, selectArtistError, selectArtistName } from './selectors';
import { homeContainerCreators } from './reducer';
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
export function HomeContainer({
  dispatchItunesRepos,
  dispatchClearItunesRepos,
  intl,
  artistData = {},
  artistError = null,
  artistName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(artistData, 'results', null) || artistError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [artistData]);

  useEffect(() => {
    if (artistName && !artistData?.results?.length) {
      dispatchItunesRepos(artistName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
      dispatchItunesRepos(rName);
      setLoading(true);
    } else {
      dispatchClearItunesRepos();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(artistData, 'results', []);
    const totalCount = get(artistData, 'resultCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {artistName && (
              <div>
                <T id="search_query" values={{ artistName }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_artists" values={{ totalCount }} />
              </div>
            )}
            {items.map((item, index) => (
              <CustomCard key={index}>
                <T id="artist_name" values={{ name: item.artistName }} />
                <T id="collection_name" values={{ collectionName: item.collectionName }} />
                <T id="track_count" values={{ trackCount: item.trackCount }} />
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (artistError) {
      repoError = artistError;
    } else if (!get(artistData, 'resultCount', 0)) {
      repoError = 'artist_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard color={artistError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'artist_list' })}>
          <T id={repoError} />
        </CustomCard>
      )
    );
  };
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <CustomCard title={intl.formatMessage({ id: 'artist_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_artist_details" />
        <Search
          data-testid="search-bar"
          defaultValue={artistName}
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

HomeContainer.propTypes = {
  dispatchItunesRepos: PropTypes.func,
  dispatchClearItunesRepos: PropTypes.func,
  intl: PropTypes.object,
  artistData: PropTypes.shape({
    resultCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    results: PropTypes.array
  }),
  artistError: PropTypes.object,
  artistName: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  artistData: selectArtistData(),
  artistError: selectArtistError(),
  artistName: selectArtistName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetGithubRepos, clearGithubRepos } = homeContainerCreators;
  return {
    dispatchItunesRepos: artistName => dispatch(requestGetGithubRepos(artistName)),
    dispatchClearItunesRepos: () => dispatch(clearGithubRepos())
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
