/**
 *
 * ItunesAppContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import { itunesAppContainerCreators } from './reducer';
import { Input, Modal, Card } from 'antd';

import T from '@components/T';
import styled from 'styled-components';
import SongList from '../SongList/index';
import saga from './saga';
import makeSelectItunesAppContainer, {
  selectSongsData,
  selectShowLoader,
  selectShowError,
  selectSelectedSong,
  selectPlayingSong
} from './selectors';
import ErrorMessage from './ErrorMessage/index';
import If from '@app/components/If/index';
import SongDetailsComponent from './SongDetailsComponent/index';
import PlayingSongBar from './PlayingSongBar/index';

const { Search } = Input;


const PlayingSongCard = styled(Card)`
&&{
  position:fixed;
  width:100%;
  bottom:0;
  border: 1px solid;

}`
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    margin: 0 auto;
  }
   
`;

const SearchBarLayout = styled.div`
  && {
    width: ${props => props.maxwidth || '50%'};
  }
`;

const SongListContainer = styled.div`
  && {
    margin: 20px;
    width: 100%;
  }
  p {
    color: gray;
    text-align: center;
  }
   
`;
export function ItunesAppContainer({
  dispatchRequestSearchSong,
  songsData,
  showLoader,
  showError,
  selectedSong,
  dispatchSelectedSong,
  dispatchPlayingSong,
  playingSong
}) {
  useInjectSaga({ key: 'itunesAppContainer', saga });

  const handleOnSearchChange = artistName => dispatchRequestSearchSong(artistName);

  const debounceHandler = debounce(handleOnSearchChange, 200);

  return (
    <div>
      <Modal
        width="90%"
        style={{ top: 10 }}
        bodyStyle={{ height: '80vh' }}
        title={selectedSong?.trackName}
        visible={selectedSong}
        onCancel={() => dispatchSelectedSong(null)}
        closable
        footer={null}
      >
        <SongDetailsComponent song={selectedSong} />
      </Modal>
      <Helmet>
        <title>ItunesAppContainer</title>
        <meta name="description" content="Description of ItunesAppContainer" />
      </Helmet>
      <Container>
        <SearchBarLayout>
          <Search
            data-testid="song-search-bar"
            type="text"
            onChange={e => debounceHandler(e.target.value)}
            onSearch={searchText => debounceHandler(searchText)}
            placeholder="Search By Artist Name"
          />
        </SearchBarLayout>
        <SongListContainer>
          <If condition={!showError && songsData?.length}>
            <SongList songs={songsData} />
          </If>
          <If condition={showError && !showLoader}>
            <ErrorMessage />
          </If>
          <If condition={!showError && !songsData?.length}>
            <p>
              <T marginBottom={10} id="itunes_empty_message" />
            </p>
          </If>
        </SongListContainer>
        <If condition={playingSong}>
          <PlayingSongCard borderd={true}>
            <PlayingSongBar song={playingSong} dispatchPlayingSong={dispatchPlayingSong} />
          </PlayingSongCard>
        </If>
      </Container>
    </div>
  );
}

ItunesAppContainer.propTypes = {
  dispatchRequestSearchSong: PropTypes.func,
  songsData: PropTypes.array,
  showLoader: PropTypes.bool,
  showError: PropTypes.bool,
  selectedSong: PropTypes.Object,
  dispatchSelectedSong: PropTypes.func,
  playingSong: PropTypes.Object
};

const mapStateToProps = createStructuredSelector({
  itunesAppContainer: makeSelectItunesAppContainer(),
  songsData: selectSongsData(),
  showLoader: selectShowLoader(),
  showError: selectShowError(),
  selectedSong: selectSelectedSong(),
  playingSong: selectPlayingSong()
});

function mapDispatchToProps(dispatch) {
  const { requestSearchSong, setSelectedSong, setPlayingSong } = itunesAppContainerCreators;
  return {
    dispatchRequestSearchSong: artistName => dispatch(requestSearchSong(artistName)),
    dispatchSelectedSong: song => dispatch(setSelectedSong(song)),
    dispatchPlayingSong: song => dispatch(setPlayingSong(song))
  };

}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ItunesAppContainer);

export const ItunesAppContainerTest = compose(injectIntl)(ItunesAppContainer);
