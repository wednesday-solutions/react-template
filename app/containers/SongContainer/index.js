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
import { selectSongContainer, selectSongsData, selectSongsError, selectSongName } from './selectors';
import { songContainerCreators } from './reducer';
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
export function SongContainer({
  dispatchSong,
  dispatchClearSong,
  intl,
  itunesData = {},
  itunesError = null,
  artistName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'songContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(itunesData, 'results', null) || itunesError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [itunesData]);

  useEffect(() => {
    if (artistName && !itunesData?.results?.length) {
      dispatchSong(artistName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = artistName => {
    if (!isEmpty(artistName)) {
      dispatchSong(artistName);
      setLoading(true);
    } else {
      dispatchClearSong();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderSongsList = () => {
    const results = get(itunesData, 'results', []);
    const resultCount = get(itunesData, 'resultCount', 0);
    return (
      (results.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {artistName && (
              <div>
                <T id="search_itunes_query" values={{ artistName }} />
              </div>
            )}
            {resultCount !== 0 && (
              <div>
                <T id="matching_itunes" values={{ resultCount }} />
              </div>
            )}
            {results.map((item, index) => (
              <CustomCard key={index}>
                <div>Song Name: {item.trackName}</div>
                <div>Artist Name: {item.artistName}</div>
                <div>Collection Name: {item.collectionName}</div>
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let ituneError;
    if (itunesError) {
      ituneError = itunesError;
    } else if (!get(itunesData, 'resultCount', 0)) {
      ituneError = 'itunes_search_default';
    }
    return (
      !loading &&
      ituneError && (
        <CustomCard color={itunesError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'itunes_list' })}>
          <T id={ituneError} />
        </CustomCard>
      )
    );
  };
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <CustomCard title={intl.formatMessage({ id: 'itunes_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_itunes_details" />
        <Search
          data-testid="search-bar"
          defaultValue={artistName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderSongsList()}
      {renderErrorState()}
    </Container>
  );
}

SongContainer.propTypes = {
  dispatchSong: PropTypes.func,
  dispatchClearSong: PropTypes.func,
  intl: PropTypes.object,
  itunesData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  itunesError: PropTypes.object,
  artistName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

SongContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  songContainer: selectSongContainer(),
  itunesData: selectSongsData(),
  ituneError: selectSongsError(),
  artistName: selectSongName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = songContainerCreators;
  return {
    dispatchSong: artistName => dispatch(requestGetSongs(artistName)),
    dispatchClearSong: () => dispatch(clearSongs())
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
)(SongContainer);

export const SongContainerTest = compose(injectIntl)(SongContainer);
