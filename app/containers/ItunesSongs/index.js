import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Input, Skeleton, Card, Empty } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import T from '@components/T';
import { homeContainerCreators } from '../HomeContainer/reducer';
import { CustomCard, Container } from '../HomeContainer/styles';
import {
  selectArtistName,
  selectSongsData,
  selectTrackIds,
  selectSongsError
} from '../HomeContainer/selectors';

const { Search } = Input;
const { Meta } = Card;

const Image = styled.img`
  && {
    width: 30%;
    height: 30%;
    margin: 10px auto;
  }
`;

function ItunesSongs({
  artistName,
  allTrackIds: trackIds,
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
      (trackIds?.length > 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {artistName && (
              <T id="search_query" values={{ name: artistName }} />
            )}
            {trackIds?.map(trackId => (
              <CustomCard
                key={trackId}
                cover={
                  <Image
                    src={songsData[trackId]?.artworkUrl100}
                    alt={<Empty />}
                  />
                }
              >
                <Meta
                  title={songsData[trackId]?.artistName}
                  description={songsData[trackId]?.trackName}
                />
              </CustomCard>
            ))}
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
  allTrackIds: PropTypes.array,
  songsData: PropTypes.object,
  songsError: PropTypes.string,
  intl: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  dispatchGetArtistSongs: PropTypes.func,
  dispatchClearArtistSongs: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  artistName: selectArtistName(),
  songsData: selectSongsData(),
  allTrackIds: selectTrackIds(),
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
