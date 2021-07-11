import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import { selectSongContainer, selectSongsData, selectSongsError, selectQuery } from './selectors';
import { songContainerCreators } from './reducer';
import songContainerSaga from './saga';
import T from '@components/T';


const { Search } = Input;
const { Meta } = Card;

const CustomCard = styled(Card)`
  && {
    width: ;
    display: flex;
    flex-wrap: wrap;
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;

const SongCard = styled(Card)`
  && {
    margin: 1em;
    
  }
`;

const ImageArt = styled.img`
&& {
    object-fit: cover;
    height: 250px
}
`

const Container = styled.div`
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
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;

const useProgressiveImg = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = React.useState(lowQualitySrc);
  React.useEffect(() => {
    setSrc(lowQualitySrc);
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [lowQualitySrc, highQualitySrc]);
  return [src, { blur: src === lowQualitySrc }];
};

export function SongContainer({
    dispatchSongs,
    dispatchClearSongs,
    intl,
    songsData = {},
    songsError = null,
    query,
    maxwidth,
    padding
}) {

    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const loaded = get(songsData, 'results', null) || songsError;
        if (loading && loaded) {
            setLoading(false);
        }
    }, [songsData])

    useEffect(() => {
        if (query!='' && songsData?.songs?.length) {
            setLoading(true)
            dispatchSongs(query);
        } 
        else {
            dispatchClearSongs()
            setLoading(false)
        }
    }, []);
    const handleOnChange = rName => {
        if (!isEmpty(rName)) {
            dispatchSongs(rName);
            setLoading(true);

        } else {
            dispatchClearSongs();
        }
    };
    const debouncedHandleOnChange = debounce(handleOnChange, 200);

    const refreshPage = () => {
        history.push('stories');
        window.location.reload();
    };

    const AlbumArt = ({source}) => {
        const [src, { blur }] = useProgressiveImg(`https://via.placeholder.com/250x250/ffffff/808080/?text=loading`, source);
        return (
          <ImageArt
            src={src}
            
          />
        );
      };
    const renderResultList = () => {
        const items = get(songsData, 'results') 
        const totalCount = get(songsData, 'resultCount', 0);
        return (
            (items?.length !== 0 || loading) && (
                <Skeleton loading={loading} active>
                        {/* {totalCount !== 0 && (
                            <div>
                                <T id="matching_results" values={{ totalCount }} />
                            </div>
                        )} */}
                    <Container>
                           {items?.map((result, index) => (
                                    <SongCard
                                        hoverable
                                        key={index}
                                        style={{ width: 240 }}
                                        cover={<AlbumArt source={result.artworkUrl100.replace('/100x100bb', '/250x250bb')} />}
                                    >
                                        <Meta title={intl.formatMessage({ id: 'track_name' }, { name: result.trackName })} description={intl.formatMessage({ id: 'artist_name' }, { name: result.artistName })} />
                                    </SongCard>
                              
                            ))}
                        
                    </Container>
                </Skeleton>
            )
        );
    };
    const renderErrorState = () => {
        let songError;
        if (songsError) {

            songError = songsError;
        } else if (!get(songsData, 'songCount', 0)) {
            songError = 'result_search_default';
        }

        return (
            !loading &&
            songError && (
                <CustomCard color={songsError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'result_list' })} >
                    <T id={songError} />
                </CustomCard>
            )
        );
    };
    return (
        <ResultContainer maxwidth={maxwidth} padding={padding}>

            <T marginBottom={10} id="search_itunes" />
            <Search
                data-testid="search-bar"
                defaultValue={query}
                type="text"
                onChange={evt => debouncedHandleOnChange(evt.target.value)}
                onSearch={searchText => debouncedHandleOnChange(searchText)}
            />
            {renderErrorState()}

            {renderResultList()}
        </ResultContainer>

    )
}
SongContainer.propTypes = {
    dispatchSongs: PropTypes.func,
    dispatchClearSongs: PropTypes.func,
    intl: PropTypes.object,
    songsData: PropTypes.shape({
        results: PropTypes.array,
        resultCount: PropTypes.number
    }),
    query: PropTypes.string,
    history: PropTypes.object,
    maxwidth: PropTypes.number,
    padding: PropTypes.number
};

SongContainer.defaultProps = {
    maxwidth: 500,
    padding: 20
};


const mapStateToProps = createStructuredSelector({
    songContainer: selectSongContainer(),
    songsData: selectSongsData(),
    songsError: selectSongsError(),
    query: selectQuery()
});

function mapDispatchToProps(dispatch) {
    const { requestGetSongs, clearSongs } = songContainerCreators;
    return {
        dispatchSongs: query => dispatch(requestGetSongs(query)),
        dispatchClearSongs: () => dispatch(clearSongs())
    };
}


const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    injectIntl,
    injectSaga({ key: 'songContainer', saga: songContainerSaga }),
    withConnect,
)(SongContainer);