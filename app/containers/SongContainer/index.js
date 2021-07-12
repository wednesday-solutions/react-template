import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { get, debounce, isEmpty } from 'lodash';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import React, { useEffect } from 'react';
import { selectSongContainer, selectSongsData, selectSongsError, selectQuery, selectLoading } from './selectors';
import { songContainerCreators } from './reducer';
import songContainerSaga from './saga';
import T from '@components/T';
import LazyImage from '@app/components/LazyImage';
import For from '@app/components/For';

const { Search } = Input;
const { Meta } = Card;

const CustomCard = styled(Card)`
  && {
    width: ;
    display: flex;
    flex-wrap: wrap;
    color: ${props => props.color};
  }
`;
const SongCard = styled(Card)`
  && {
    margin: 1em;
  }
`;
const SongsContainer = styled.div`
  && {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-width: ${props => props.maxwidth}px;
    padding: ${props => props.padding}px;
  }
`;
const ResultContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    width: 100%;
    margin: 20px auto;
    padding: ${props => props.padding}px;
  }
`;

export function SongContainer({
  dispatchSongs,
  dispatchClearSongs,
  intl,
  songsData = {},
  songsError = null,
  query,
  maxwidth,
  padding,
  loading
}) {
  useEffect(() => {
    if (!isEmpty(query) && songsData?.songs?.length) {
      dispatchSongs(query);
    } else {
      dispatchClearSongs();
    }
  }, []);
  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
      dispatchSongs(rName);
    } else {
      dispatchClearSongs();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderResultList = () => {
    const items = get(songsData, 'results');
    return (
      (items?.length || loading) && (
        <Skeleton loading={loading} active>
          <For
            of={items}
            renderItem={result => {
              return (
                <SongCard
                  hoverable
                  style={{ width: 240 }}
                  cover={<LazyImage source={result.artworkUrl100.replace('/100x100bb', '/250x250bb')} />}
                >
                  <Meta
                    title={intl.formatMessage({ id: 'track_name' }, { name: result.trackName })}
                    description={intl.formatMessage({ id: 'artist_name' }, { name: result.artistName })}
                  />
                </SongCard>
              );
            }}
            ParentComponent={props => <SongsContainer {...props} />}
          />
        </Skeleton>
      )
    );
  };
  const renderErrorState = () => {
    let songError;
    if (songsError) {
      songError = songsError;
    } else if (!get(songsData, 'songCount', 0)) {
      songError = 'result_search_default';
    }
    return (
      !loading &&
      songError && (
        <CustomCard color={songsError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'result_list' })}>
          <T id={songError} />
        </CustomCard>
      )
    );
  };
  return (
    <ResultContainer maxwidth={maxwidth} padding={padding}>
      <T marginBottom={10} id="search_itunes" />
      <Search
        data-testid="search-bar"
        defaultValue={query}
        type="text"
        onChange={evt => debouncedHandleOnChange(evt.target.value)}
        onSearch={searchText => debouncedHandleOnChange(searchText)}
      />
      {renderErrorState()}
      {renderResultList()}
    </ResultContainer>
  );
}
SongContainer.propTypes = {
  dispatchSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  intl: PropTypes.object,
  songsData: PropTypes.shape({
    results: PropTypes.array,
    resultCount: PropTypes.number
  }),
  songsError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  query: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  loading: PropTypes.bool
};

SongContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  songContainer: selectSongContainer(),
  songsData: selectSongsData(),
  songsError: selectSongsError(),
  query: selectQuery(),
  loading: selectLoading()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = songContainerCreators;
  return {
    dispatchSongs: query => dispatch(requestGetSongs(query)),
    dispatchClearSongs: () => dispatch(clearSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  injectSaga({ key: 'songContainer', saga: songContainerSaga }),
  withConnect
)(SongContainer);
