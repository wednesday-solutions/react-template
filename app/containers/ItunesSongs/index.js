import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Input, Skeleton } from 'antd';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import T from '@components/T';
import { homeContainerCreators } from '../HomeContainer/reducer';
import { CustomCard, Container } from '../HomeContainer/styles';
import {
  selectArtistName,
  selectSongsData,
  selectSongsCount,
  selectSongsError
} from '../HomeContainer/selectors';

const { Search } = Input;

function ItunesSongs({
  artistName,
  songsCount,
  songsData,
  songsError,
  intl,
  maxwidth,
  padding,
  dispatchGetArtistSongs,
  dispatchClearArtistSongs
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = songsData || songsError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songsData]);

  const handleOnChange = artistName => {
    if (!isEmpty(artistName)) {
      dispatchGetArtistSongs(artistName);
      setLoading(true);
    } else {
      dispatchClearArtistSongs();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderSongList = () => {
    return (
      (songsCount > 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {artistName && (
              <T id="search_query" values={{ name: artistName }} />
            )}
          </Skeleton>
        </CustomCard>
      )
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <CustomCard
        title={intl.formatMessage({ id: 'songs_search' })}
        maxwidth={maxwidth}
      >
        <T marginBottom={10} id="get_song_details" />
        <Search
          type="text"
          defaultValue={artistName}
          onChange={e => debouncedHandleOnChange(e.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderSongList()}
    </Container>
  );
}

ItunesSongs.propTypes = {
  artistName: PropTypes.string,
  songsCount: PropTypes.number,
  songsData: PropTypes.object,
  songsError: PropTypes.object,
  intl: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  dispatchGetArtistSongs: PropTypes.func,
  dispatchClearArtistSongs: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  artistName: selectArtistName(),
  songsData: selectSongsData(),
  songsCount: selectSongsCount(),
  songsError: selectSongsError()
});

const { requestGetArtistSongs, clearArtistSongs } = homeContainerCreators;

export default connect(
  mapStateToProps,
  {
    dispatchGetArtistSongs: requestGetArtistSongs,
    dispatchClearArtistSongs: clearArtistSongs
  }
)(ItunesSongs);
