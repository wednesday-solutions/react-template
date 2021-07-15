import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { get } from 'lodash';
import { Card, Skeleton } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectSongContainer, selectSongsData, selectSongsError, selectLoading } from '../selectors';
import { songContainerCreators } from '../reducer';
import { songContainerSaga } from '../saga';
import T from '@components/T';
import LazyImage from '@app/components/LazyImage';
import AudioPlayer from '@app/components/AudioPlayer';

const { Meta } = Card;

const LinkButton = styled.a`
  && {
    margin-top: 1em;
    padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: rgba(0, 0, 0, 0.45);
    color: #fff;
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
  intl,
  songsData = {},
  songsError = null,
  maxwidth,
  padding,
  loading
}) {
  const { trackId } = useParams();
  useEffect(() => {
    if (!get(songsData, 'results')?.find(result => result.trackId == trackId)) {
      dispatchTrack(trackId);
    }
  }, []);
  const renderResultList = () => {
    const item = get(songsData, 'results')?.find(result => result.trackId == trackId);
    if (item) {
      return (
        <Skeleton loading={loading} active>
          <ContentContainer>
            <LazyImage
              lowResUrl={item?.artworkUrl100.replace('/100x100bb', '/30x30bb')}
              highResUrl={item?.artworkUrl100.replace('/100x100bb', '/250x250bb')}
            />
            <TextContainer>
              <Meta
                title={intl.formatMessage({ id: 'track_name' }, { name: item.trackName })}
                description={[
                  <TextContainer key={`text-container ${item.trackId}`}>
                    <div>{intl.formatMessage({ id: 'artist_name' }, { name: item.artistName })}</div>
                    <div>{intl.formatMessage({ id: 'collection_name' }, { name: item.collectionName })}</div>
                    <AudioPlayer source={item.previewUrl} />
                    <div>{intl.formatMessage({ id: 'description' }, { description: item.description })}</div>
                    <LinkButton href={item.trackViewUrl} target="_blank">
                      Listen on Apple Music
                    </LinkButton>
                  </TextContainer>
                ]}
              />
            </TextContainer>
          </ContentContainer>
        </Skeleton>
      );
    }
  };
  const renderErrorState = () => {
    let songError;
    if (songsError) {
      songError = songsError;
    }
    return !loading && songError && <T id={songError} />;
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
  intl: PropTypes.object,
  songsData: PropTypes.shape({
    results: PropTypes.array,
    resultCount: PropTypes.number
  }),
  songsError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  loading: PropTypes.bool
};

DetailContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  songContainer: selectSongContainer(),
  songsData: selectSongsData(),
  songsError: selectSongsError(),
  loading: selectLoading()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTrack, clearSongs } = songContainerCreators;
  return {
    dispatchTrack: id => dispatch(requestGetTrack(id)),
    dispatchClearTrack: () => dispatch(clearSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  injectSaga({ key: 'detailContainer', saga: songContainerSaga }),
  withConnect
)(DetailContainer);
