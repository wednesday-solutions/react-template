/**
 *
 * ITunes
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { useInjectSaga } from '@utils/injectSaga'
import { injectSaga } from 'redux-injectors';
import { Input, Col, Row } from 'antd';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import saga from './saga';
import { selectSongs, selectError, selectSearchTerm } from './selectors';
import { iTunesCreators } from './reducer';
import MusicInfoCard from '@components/MusicInfoCard';

const { Search } = Input;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 36px 0;
`;

const SearchBox = styled(Search)`
  max-width: 500px;
`;

export function ITunes({ dispatchRequestGetSongs, dispatchClearSongs, songs }) {
  const [searchValue, setSearchValue] = useState('');

  const handleOnChange = (search) => {
    if (!isEmpty(search)) {
      dispatchRequestGetSongs(search);
    } else {
      dispatchClearSongs();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 400);

  return (
    <div>
      <Helmet>
        <title>ITunes</title>
        <meta name="description" content="Description of ITunes" />
      </Helmet>
      <SearchContainer>
        <SearchBox
          defaultValue={searchValue}
          type="text"
          placeholder="search for songs..."
          onChange={(evt) => setSearchValue(evt.target.value)}
          onSearch={(searchText) => {
            debouncedHandleOnChange(searchText);
          }}
        />
      </SearchContainer>
      <Row gutter={[16, 16]} justify="space-evenly">
        {songs.map((song) => (
          <Col key={song.trackId} xs={24} sm={12} md={6}>
            <MusicInfoCard
              trackName={song.trackName}
              coverImgUrl={song.artworkUrl100}
              artistName={song.artistName}
              detailsUrl={`/tracks/${song.trackId}`}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

ITunes.propTypes = {
  dispatchRequestGetSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  songs: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  songs: selectSongs(),
  error: selectError(),
  searchTerm: selectSearchTerm()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = iTunesCreators;
  return {
    dispatchRequestGetSongs: (searchTerm) => dispatch(requestGetSongs(searchTerm)),
    dispatchClearSongs: () => dispatch(clearSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'iTunes', saga }))(ITunes);

export const ITunesTest = compose(injectIntl)(ITunes);
