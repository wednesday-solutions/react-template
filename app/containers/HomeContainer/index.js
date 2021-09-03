import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input, Avatar } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { injectSaga } from 'redux-injectors';
import { selectHomeContainer, selectSearchData, selectSearchError, selectSearchTerm } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';
import For from '@app/components/For/index';

const { Search } = Input;
const { Meta } = Card;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
const Audio = styled.audio`
  width: 100%;
`;
export function HomeContainer({
  dispatchItunesSearch,
  dispatchClearItunesSearch,
  intl,
  itunesSearchData = {},
  itunesSearchError = null,
  itunesSearchTerm,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // second param is the key. Here we will look for results.
    const loaded = get(itunesSearchData, 'results', null) || itunesSearchError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [itunesSearchData]);

  useEffect(() => {
    if (itunesSearchTerm && !itunesSearchData?.items?.length) {
      // eslint-disable-next-line no-console
      dispatchItunesSearch(itunesSearchTerm);
      setLoading(true);
    }
  }, []);

  const history = useHistory();

  const getSecondValue = (item) => {
    if (item.wrapperType === 'track') {
      return item.trackName;
    } else {
      return item.collectionName;
    }
  };

  const handleOnChange = (rName) => {
    if (!isEmpty(rName)) {
      dispatchItunesSearch(rName);
      setLoading(true);
    } else {
      dispatchClearItunesSearch();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderSearchResult = () => {
    const items = get(itunesSearchData, 'results', []);
    const totalCount = get(itunesSearchData, 'resultCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {itunesSearchTerm && (
              <div>
                <T id="search_query" values={{ itunesSearchTerm }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_results" values={{ totalCount }} />
              </div>
            )}
            {/* {items.map((item, index) => (
              <CustomCard key={index}>
                <T id="artist_name" values={{ artistName: item.artistName }} />
                <T id="second_value" values={{ value: getSecondValue(item) }} />
                <T id="track_audiobook" values={{ trackOrAudioBook: capitalize(item.wrapperType) }} />
              </CustomCard>
            ))} */}
            {/* Using the for component */}
            <For
              of={items}
              renderItem={(item, index) => {
                return (
                  <CustomCard key={index}>
                    <Meta
                      avatar={
                        <Avatar
                          size={{
                            xs: 24,
                            sm: 32,
                            md: 40,
                            lg: 64,
                            xl: 80,
                            xxl: 100
                          }}
                          src={item.artworkUrl100}
                        />
                      }
                      description={
                        <figure>
                          <figcaption>{intl.formatMessage({ id: 'listen_to_it' })}</figcaption>
                          <Audio controls src={item.previewUrl}>
                            <T id="no_audio_support" values={{ code: (chunks) => <code>{chunks}</code> }} />
                          </Audio>
                        </figure>
                      }
                    />
                    <T id="artist_name" values={{ artistName: item.artistName }} clearFloat={true} />
                    <T id="second_value" values={{ value: getSecondValue(item) }} />
                  </CustomCard>
                );
              }}
              noParent={true}
            />
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (itunesSearchError) {
      repoError = itunesSearchError;
    } else if (!get(itunesSearchData, 'resultCount', 0)) {
      repoError = 'itunes_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard color={itunesSearchError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'itunes_search_list' })}>
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
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard title={intl.formatMessage({ id: 'itunes_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_itunes_details" />
        <Search
          data-testid="search-bar"
          defaultValue={itunesSearchTerm}
          type="text"
          onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
          onSearch={(searchText) => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderSearchResult()}
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchItunesSearch: PropTypes.func,
  dispatchClearItunesSearch: PropTypes.func,
  intl: PropTypes.object,
  itunesSearchData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  itunesSearchError: PropTypes.object,
  itunesSearchTerm: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer,
  itunesSearchData: selectSearchData(),
  itunesSearchError: selectSearchError(),
  itunesSearchTerm: selectSearchTerm()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTracks, clearTracks } = homeContainerCreators;
  return {
    dispatchItunesSearch: (searchTerm) => dispatch(requestGetTracks(searchTerm)),
    dispatchClearItunesSearch: () => dispatch(clearTracks())
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
