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
import { Input, Skeleton } from 'antd';

import T from '@components/T';
import styled from 'styled-components';
import SongList from '../SongList/index';
import saga from './saga';
import makeSelectItunesAppContainer, { selectSongsData, selectShowLoader, selectShowError } from './selectors';
import ErrorMessage from './ErrorMessage/index';
import If from '@app/components/If/index';

const { Search } = Input;

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
export function ItunesAppContainer({ dispatchRequestSearchSong, songsData, showLoader, showError }) {
  useInjectSaga({ key: 'itunesAppContainer', saga });

  const handleOnSearchChange = artistName => dispatchRequestSearchSong(artistName);

  const debounceHandler = debounce(handleOnSearchChange, 200);

  return (
    <div>
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
        <Skeleton data-testid="skeleton" loading={showLoader || !songsData} active>
          <SongListContainer>
            <If condition={!showError && songsData?.length}>
              <SongList songs={songsData} />
            </If>
            <If condition={showError && !showLoader}>
              <ErrorMessage />
            </If>
            <If condition={!songsData?.length}>
              <p>
                <T marginBottom={10} id="itunes_empty_message" />
              </p>
            </If>
          </SongListContainer>
        </Skeleton>
      </Container>
    </div>
  );
}

ItunesAppContainer.propTypes = {
  dispatchRequestSearchSong: PropTypes.func,
  songsData: PropTypes.array,
  showLoader: PropTypes.bool,
  showError: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  itunesAppContainer: makeSelectItunesAppContainer(),
  songsData: selectSongsData(),
  showLoader: selectShowLoader(),
  showError: selectShowLoader()
});

function mapDispatchToProps(dispatch) {
  const { requestSearchSong } = itunesAppContainerCreators;
  return {
    dispatchRequestSearchSong: artistName => dispatch(requestSearchSong(artistName))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ItunesAppContainer);

export const ItunesAppContainerTest = compose(injectIntl)(ItunesAppContainer);
