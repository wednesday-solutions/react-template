/**
 *
 * ITunesContainer
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import { Card, Skeleton, Input } from 'antd';
import If from '@app/components/If';
import { useInjectSaga } from '@utils/injectSaga';
import TuneCard from './TuneCard';
import PlayingTuneCard from './PlayingTuneCard';
import {
  selectITunesContainer,
  selectITunesData,
  selectITunesError,
  selectITuneName,
  selectCurrentTune
} from './selectors';
import { iTunesContainerCreators } from './reducer';
import saga from './saga';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
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
export function ITunesContainer({
  dispatchITunes,
  dispatchClearITunes,
  dispatchCurrentTune,
  dispatchSelectedTune,
  iTunesData = {},
  iTunesError = null,
  iTuneName,
  currentTune,
  maxwidth,
  padding,
  intl
}) {
  useInjectSaga({ key: 'iTunesContainer', saga });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loaded = get(iTunesData, 'results', null) || iTunesError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [iTunesData]);

  useEffect(() => {
    if (iTuneName && !iTunesData?.results.length) {
      dispatchITunes(iTuneName);
      setLoading(true);
    }
  }, []);
  const handleChange = iName => {
    if (!isEmpty(iName)) {
      dispatchITunes(iName);
    } else {
      dispatchClearITunes();
    }
  };
  const handleDebounce = debounce(handleChange, 200);
  const renderITunes = () => {
    const tunes = get(iTunesData, 'results', []);
    const songs = tunes.filter(tune => tune.kind === 'song' && tune.isStreamable) || [];
    const totalCount = songs.length || 0;
    return (
      (songs.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {iTuneName && (
              <div>
                <T id="search_name" data-testid="search_name" values={{ iTuneName }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_tunes" data-testid="total_count" values={{ totalCount }} />
              </div>
            )}
            {songs.map((song, index) => {
              return (
                <>
                  <If key={index} condition={currentTune !== null}>
                    <TuneCard
                      key={index}
                      song={song}
                      currentTuneId={currentTune?.trackId}
                      dispatchCurrentTune={dispatchCurrentTune}
                      dispatchSelectedTune={dispatchSelectedTune}
                    />
                  </If>
                  <If key={index} condition={currentTune === null}>
                    <TuneCard
                      key={index}
                      song={song}
                      dispatchCurrentTune={dispatchCurrentTune}
                      dispatchSelectedTune={dispatchSelectedTune}
                    />
                  </If>
                </>
              );
            })}
          </Skeleton>
          <T text={'testing the compression'} />
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let iTuneError;
    if (iTuneError) {
      iTuneError = iTunesError;
    } else if (!get(iTunesError, 'totalCount', 0)) {
      iTuneError = 'tune_search_default';
    }
    return (
      !loading &&
      iTuneError && (
        <CustomCard color={iTunesError ? 'red' : 'grey'}>
          <T id={iTuneError} />
        </CustomCard>
      )
    );
  };
  return (
    <Container>
      <Helmet>
        <title>ITunesContainer</title>
        <meta name="description" content="Description of ITunesContainer" />
      </Helmet>
      <Container maxwidth={maxwidth} padding={padding}>
        <Input
          data-testid="search-bar"
          defaultValue={iTuneName}
          type="text"
          onChange={e => handleDebounce(e.target.value)}
        />
        {renderITunes()}
        {renderErrorState()}
      </Container>
      <If condition={currentTune}>
        <PlayingTuneCard currentTune={currentTune} dispatchCurrentTune={dispatchCurrentTune} />
      </If>
    </Container>
  );
}

ITunesContainer.propTypes = {
  dispatchITunes: PropTypes.func,
  dispatchClearITunes: PropTypes.func,
  dispatchCurrentTune: PropTypes.func,
  dispatchSelectedTune: PropTypes.func,
  intl: PropTypes.object,
  iTunesData: PropTypes.array,
  iTunesError: PropTypes.object,
  iTuneName: PropTypes.string,
  currentTune: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  iTunesContainer: selectITunesContainer(),
  iTunesData: selectITunesData(),
  iTunesError: selectITunesError(),
  iTuneName: selectITuneName(),
  currentTune: selectCurrentTune()
});

function mapDispatchToProps(dispatch) {
  const { requestGetITunes, clearITunes, setCurrentTune, setSelectedTune } = iTunesContainerCreators;
  return {
    dispatchITunes: iTuneName => dispatch(requestGetITunes(iTuneName)),
    dispatchClearITunes: () => dispatch(clearITunes()),
    dispatchCurrentTune: tune => dispatch(setCurrentTune(tune)),
    dispatchSelectedTune: selectedTune => dispatch(setSelectedTune(selectedTune))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ITunesContainer);

export const ITunesContainerTest = compose(injectIntl)(ITunesContainer);
