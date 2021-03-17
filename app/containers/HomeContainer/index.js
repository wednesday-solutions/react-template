import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input, Row, Col } from 'antd';

import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import { selectHomeContainer, selectitunesData, selectitunesError, selectartistName } from './selectors';
import { homeContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;
const { Meta } = Card;
const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    width=250pxcolor: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;

const MainContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
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
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;

export function HomeContainer({
  dispatchSongs,
  dispatchClearSongs,
  intl,
  itunesData,
  itunesError,
  artistName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(itunesData, 'results', null) || itunesError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [itunesData]);

  useEffect(() => {
    if (artistName && !itunesData?.results?.length) {
      dispatchSongs(artistName);
      setLoading(true);
    }
  }, []);
  const history = useHistory();

  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
      dispatchSongs(rName);
      setLoading(true);
    } else {
      dispatchClearSongs();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(itunesData, 'results', []);
    const resultCount = get(itunesData, 'resultCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {artistName && (
              <div>
                <T id="search_query" values={{ artistName }} />
              </div>
            )}
            {resultCount !== 0 && (
              <div>
                <T id="matching_repos" values={{ resultCount }} />
              </div>
            )}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {items.map((item, index) => (
                <Col key={index} className="gutter-row" span={6}>
                  <CustomCard
                    onClick={() => history.push(`/tune/${item.trackId}`)}
                    hoverable
                    cover={<img alt="artwork-url" src={item.artworkUrl100} />}
                  >
                    <Meta title={item.trackName} description={item.artistName} />
                  </CustomCard>
                </Col>
              ))}
            </Row>
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (itunesError) {
      repoError = itunesError;
    } else if (!get(itunesData, 'resultCount', 0)) {
      repoError = 'respo_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard color={itunesError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'repo_list' })}>
          <T id={repoError} />
        </CustomCard>
      )
    );
  };
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };
  return (
    <MainContainer>
      <Container maxwidth={maxwidth} padding={padding}>
        <RightContent>
          <Clickable textId="stories" onClick={refreshPage} />
        </RightContent>
        <CustomCard title={intl.formatMessage({ id: 'repo_search' })} maxwidth={maxwidth}>
          <T marginBottom={10} id="get_repo_details" />
          <Search
            data-testid="search-bar"
            defaultValue={artistName}
            type="text"
            onChange={evt => debouncedHandleOnChange(evt.target.value)}
            onSearch={searchText => debouncedHandleOnChange(searchText)}
          />
        </CustomCard>
      </Container>
      {renderRepoList()}
      {renderErrorState()}
    </MainContainer>
  );
}

HomeContainer.propTypes = {
  dispatchSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
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

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  itunesData: {},
  itunesError: null
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  itunesData: selectitunesData(),
  itunesError: selectitunesError(),
  artistName: selectartistName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = homeContainerCreators;
  return {
    dispatchSongs: artistName => dispatch(requestGetSongs(artistName)),
    dispatchClearSongs: () => dispatch(clearSongs())
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
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
