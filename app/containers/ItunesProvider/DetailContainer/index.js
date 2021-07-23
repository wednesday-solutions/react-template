import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, Skeleton } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { selectSongContainer, selectTrackData, selectTrackError, selectLoading } from '../selectors';
import { songContainerCreators } from '../reducer';
import { songContainerSaga } from '../saga';
import T from '@components/T';
import LazyImage from '@components/LazyImage';
import AudioPlayer from '@components/AudioPlayer';
import If from '@components/If';

const { Meta } = Card;

const LinkButton = styled.a`
  && {
    margin-top: 1em;
    padding: 1em 2em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }
`;

const TextContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  && {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-width: ${props => props.maxwidth}px;
    padding: ${props => props.padding}px;
  }
`;
const ResultContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    width: 100%;
    margin: 20px auto;
    padding: ${props => props.padding}px;
  }
`;

export function DetailContainer({
  dispatchTrack,
  dispatchClearTrack,
  intl,
  trackData,
  trackError,
  maxwidth,
  padding,
  loading
}) {
  const { trackId } = useParams();
  useEffect(() => {
    dispatchTrack(trackId);
    return () => {
      dispatchClearTrack();
    };
  }, []);

  const renderResult = item => {
    return (
      <ContentContainer>
        <LazyImage
          lowResUrl={item?.artworkUrl100?.replace('/100x100bb', '/30x30bb')}
          highResUrl={item?.artworkUrl100?.replace('/100x100bb', '/250x250bb')}
        />
        <TextContainer>
          <Meta
            title={<T id="track_name" type="title" values={{ name: item.trackName }} />}
            description={[
              <TextContainer key={`${item.trackId}`}>
                <T id="artist_name" type="description" values={{ name: item.artistName }} />
                <T id="collection_name" type="description" values={{ name: item.collectionName }} />
                <AudioPlayer source={item.previewUrl} />
                <LinkButton href={item.trackViewUrl} target="_blank">
                  <T id="apple_music" />
                </LinkButton>
              </TextContainer>
            ]}
          />
        </TextContainer>
      </ContentContainer>
    );
  };

  const renderResultList = () => {
    const item = trackData;
    return (
      <Skeleton loading={loading} active>
        <If condition={!isEmpty(item)}>{renderResult(item)}</If>
      </Skeleton>
    );
  };
  const renderErrorState = () => {
    let error;
    if (trackError) {
      error = trackError;
    }
    return !loading && error && <T id={trackError} />;
  };
  return (
    <ResultContainer maxwidth={maxwidth} padding={padding}>
      {renderErrorState()}
      {renderResultList()}
    </ResultContainer>
  );
}

DetailContainer.propTypes = {
  dispatchTrack: PropTypes.func,
  dispatchClearTrack: PropTypes.func,
  item: PropTypes.object,
  intl: PropTypes.object,
  trackData: PropTypes.object,
  trackError: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  loading: PropTypes.bool
};

DetailContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  trackData: [],
  trackError: null
};

const mapStateToProps = createStructuredSelector({
  songContainer: selectSongContainer(),
  trackData: selectTrackData(),
  trackError: selectTrackError(),
  loading: selectLoading()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTrack, clearTrack } = songContainerCreators;
  return {
    dispatchTrack: id => dispatch(requestGetTrack(id)),
    dispatchClearTrack: () => dispatch(clearTrack())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  injectSaga({ key: 'detailContainer', saga: songContainerSaga }),
  withConnect
)(DetailContainer);

export const DetailContainerTest = compose(injectIntl)(DetailContainer);
