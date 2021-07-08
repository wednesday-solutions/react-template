/**
 *
 * ITunesSearch
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Input, Skeleton } from 'antd';
import styled from 'styled-components';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import { makeSelectITunesSearch, selectArtistName, selectTracksData, selectTracksError } from './selectors';
import { iTunesSearchCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxWidth}px;
    width: 100%;
    margin: 0 auto;
  }
`;
export function ITunesSearch({
  maxWidth,
  dispatchFetchTracks,
  dispatchClearTracks,
  artistName,
  tracks = {},
  tracksError = null
}) {
  useInjectSaga({ key: 'iTunesSearch', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(tracks, 'results', null) || tracksError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [tracks]);

  useEffect(() => {
    if (artistName && !tracks?.items?.length) {
      dispatchFetchTracks(artistName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = aName => {
    if (!isEmpty(aName)) {
      dispatchFetchTracks(aName);
      setLoading(true);
    } else {
      dispatchClearTracks();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  const renderTracks = () => {
    const trackList = get(tracks, 'results', []);
    return (
      (trackList.length !== 0 || loading) && (
        <Skeleton loading={loading} active>
          {trackList.map((item, index) => (
            <p key={index}>{item.kind}</p>
          ))}
        </Skeleton>
      )
    );
  };
  return (
    <Container maxWidth={maxWidth}>
      <Search
        defaultValue={artistName}
        type="text"
        onChange={event => debouncedHandleOnChange(event.target.value)}
        onSearch={searchText => debouncedHandleOnChange(searchText)}
      />
      {renderTracks()}
    </Container>
  );
}

ITunesSearch.propTypes = {
  dispatchFetchTracks: PropTypes.func,
  dispatchClearTracks: PropTypes.func,
  maxWidth: PropTypes.number,
  artistName: PropTypes.string,
  tracks: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  tracksError: PropTypes.object
};

ITunesSearch.defaultProps = {
  maxWidth: 500
};

const mapStateToProps = createStructuredSelector({
  iTunesSearch: makeSelectITunesSearch(),
  tracks: selectTracksData(),
  tracksError: selectTracksError(),
  artistName: selectArtistName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTrackNames, clearTrackNames } = iTunesSearchCreators;
  return {
    dispatchFetchTracks: artistName => dispatch(requestGetTrackNames(artistName)),
    dispatchClearTracks: () => dispatch(clearTrackNames())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ITunesSearch);

export const ITunesSearchTest = compose(injectIntl)(ITunesSearch);
