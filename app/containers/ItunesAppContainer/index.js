/**
 *
 * ItunesAppContainer
 *
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import debounce from 'lodash/debounce';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import makeSelectItunesAppContainer, { selectSongsData, selectShowLoader } from './selectors';
import saga from './saga';
import { itunesAppContainerCreators } from './reducer';
import { Input, Skeleton } from 'antd';
import styled from 'styled-components';
import SongList from '../SongList/index';

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
&&
{
  margin:20px;
  width:100%;
}
p{
  color: gray;
  text-align:center;
}
`
export function ItunesAppContainer({ dispatchRequestSearchSong, songsData, showLoader }) {
  useInjectSaga({ key: 'itunesAppContainer', saga });
  const [loading, setLoading] = useState(false);

  const onSearchChange = (artistName) => dispatchRequestSearchSong(artistName)


  const debounceHandler = debounce(onSearchChange, 200)

  return (
    <div>
      <Helmet>
        <title>ItunesAppContainer</title>
        <meta name="description" content="Description of ItunesAppContainer" />
      </Helmet>

      <Container>




        <SearchBarLayout>
          <Search
            data-testid="search-bar"
            type="text"
            onChange={e => debounceHandler(e.target.value)}
            onSearch={searchText => debounceHandler(searchText)}
            placeholder="Search By Artist Name"
          />

        </SearchBarLayout>
        <Skeleton loading={showLoader || !songsData} active >
          <SongListContainer>
            {songsData && !!songsData.length ? <SongList songs={songsData} />
              : <p>
                Search for a song by entering Artists name in the search box
              </p>
            }
          </SongListContainer>
        </Skeleton>

      </Container>
    </div>
  );
}

ItunesAppContainer.propTypes = {
  dispatchRequestSearchSong: PropTypes.func,
  songs: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  itunesAppContainer: makeSelectItunesAppContainer(),
  songsData: selectSongsData(),
  showLoader: selectShowLoader()
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
