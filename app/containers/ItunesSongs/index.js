import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import T from '@components/T';
import { homeContainerCreators } from '../HomeContainer/reducer';
import { CustomCard, Container } from '../HomeContainer/styles';

const { Search } = Input;

function ItunesSongs({
  intl,
  maxwidth,
  padding,
  dispatchGetArtistSongs,
  dispatchClearArtistSongs
}) {
  // const [setLoading] = useState(false);

  const handleOnChange = artistName => {
    if (!isEmpty(artistName)) {
      dispatchGetArtistSongs(artistName);
      // setLoading(true);
    } else {
      dispatchClearArtistSongs();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <CustomCard
        title={intl.formatMessage({ id: 'songs_search' })}
        maxwidth={maxwidth}
      >
        <T marginBottom={10} id="get_song_details" />
        <Search
          type="text"
          onChange={e => debouncedHandleOnChange(e.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
    </Container>
  );
}

ItunesSongs.propTypes = {
  intl: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  dispatchGetArtistSongs: PropTypes.func,
  dispatchClearArtistSongs: PropTypes.func
};

const { requestGetArtistSongs, clearArtistSongs } = homeContainerCreators;

export default connect(
  null,
  {
    dispatchGetArtistSongs: requestGetArtistSongs,
    dispatchClearArtistSongs: clearArtistSongs
  }
)(ItunesSongs);
