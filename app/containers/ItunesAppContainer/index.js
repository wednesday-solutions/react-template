/**
 *
 * ItunesAppContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import makeSelectItunesAppContainer from './selectors';
import saga from './saga';
import { itunesAppContainerCreators } from './reducer';
import { Input } from 'antd';
import styled from 'styled-components';

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

export function ItunesAppContainer({ dispatchRequestSearchSong }) {
  useInjectSaga({ key: 'itunesAppContainer', saga });

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
            onChange={evt => {}}
            onSearch={searchText => {}}
            placeholder="Search By Artist Name"
          />
        </SearchBarLayout>
      </Container>
    </div>
  );
}

ItunesAppContainer.propTypes = {
  dispatchRequestSearchSong: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  itunesAppContainer: makeSelectItunesAppContainer()
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
