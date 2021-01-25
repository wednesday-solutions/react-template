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
import { selectHomeContainer, selectArtistData, selectArtistSearchError, selectArtistName } from './selectors';
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
  dispatchArtist,
  dispatchClearArtistSearch,
  intl,
  artistData = {},
  artistSearchError = null,
  artistName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(artistData, 'results', null) || artistSearchError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [artistData]);

  useEffect(() => {
    if (artistName && !artistData?.results?.length) {
      dispatchArtist(artistName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = aName => {
    if (!isEmpty(aName)) {
      dispatchArtist(aName);
      setLoading(true);
    } else {
      dispatchClearArtistSearch();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderArtistList = () => {
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
                <T id="matching_search" values={{ totalCount }} />
              </div>
            )}
            {items.map((item, index) => (
              <CustomCard key={index}>
                <T id="artist_name" values={{ artistName: item.artistName }} />
                <T id="collection_name" values={{ collectionName: item.collectionName }} />
                <T id="track_name" values={{ trackName: item.trackName }} />
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let artistError;
    if (artistSearchError) {
      artistError = artistSearchError;
    } else if (!get(artistData, 'resultCount', 0)) {
      artistError = 'respo_search_default';
    }
    return (
      !loading &&
      artistError && (
        <CustomCard color={artistSearchError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'artist_list' })}>
          <T id={artistError} />
        </CustomCard>
      )
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <CustomCard maxwidth={maxwidth}>
        <T marginBottom={10} id="get_artist_details" />
        <Search
          data-testid="search-bar"
          defaultValue={artistName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderArtistList()}
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchArtist: PropTypes.func,
  dispatchClearArtistSearch: PropTypes.func,
  intl: PropTypes.object,
  artistData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  artistSearchError: PropTypes.object,
  artistName: PropTypes.string,
  history: PropTypes.object,
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
  artistSearchError: selectArtistSearchError(),
  artistName: selectArtistName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetArtist, clearArtistSearch } = homeContainerCreators;
  return {
    dispatchArtist: artistName => dispatch(requestGetArtist(artistName)),
    dispatchClearArtistSearch: () => dispatch(clearArtistSearch())
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
