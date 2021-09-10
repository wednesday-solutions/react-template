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
import { injectSaga } from 'redux-injectors';
import { selectHomeContainer, selectItunesData, selectItunesError, selectItunesName } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';

const { Search } = Input;
const { Meta } = Card;

const OuterContainer = styled.div`
   max-width: 2000px,
   padding: 20px;
 `;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    width: 800px;
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;

    width: 800px;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function HomeContainer({
  dispatchArtistData,
  dispatchClearArtistData,
  intl,
  itunesData,
  itunesError,
  artistName,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(itunesData, 'results', null) || itunesError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [itunesData]);

  useEffect(() => {
    if (artistName && !itunesData?.results?.length) {
      dispatchArtistData(artistName);
      setLoading(true);
    }
  }, []);

  const history = useHistory();

  const handleOnChange = (rName) => {
    if (!isEmpty(rName)) {
      dispatchArtistData(rName);
      setLoading(true);
    } else {
      dispatchClearArtistData();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderArtistList = () => {
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
            <Row gutter={[16, 16]}>
              {items.map((item, index) => (
                <Col key={index} span={8}>
                  <Card hoverable style={{ width: '90%' }} cover={<img alt="example" src={item.artworkUrl100} />}>
                    <Meta title={item.artistName} description={item.trackName} />
                  </Card>
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
    <OuterContainer>
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
            onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
            onSearch={(searchText) => debouncedHandleOnChange(searchText)}
          />
        </CustomCard>
        {renderArtistList()}
        {renderErrorState()}
      </Container>
    </OuterContainer>
  );
}

HomeContainer.propTypes = {
  dispatchArtistData: PropTypes.func,
  dispatchClearArtistData: PropTypes.func,
  intl: PropTypes.object,
  itunesData: PropTypes.shape({
    resultCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
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
  itunesData: selectItunesData(),
  itunesError: selectItunesError(),
  artistName: selectItunesName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetArtist, clearArtist } = homeContainerCreators;
  return {
    dispatchArtistData: (artistName) => dispatch(requestGetArtist(artistName)),
    dispatchClearArtistData: () => dispatch(clearArtist())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'homeContainer', saga: homeContainerSaga })
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
