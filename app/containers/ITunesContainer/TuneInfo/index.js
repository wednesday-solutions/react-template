/**
 *
 * TuneInfo
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { colors } from '@themes';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import styled from 'styled-components';
import T from '@components/T';
import get from 'lodash/get';
import If from '@app/components/If';
import { useInjectSaga } from '@utils/injectSaga';
import { selectSelectedTune, selectTuneData, selectTuneError } from '../selectors';
import { iTunesContainerCreators } from '../reducer';
import saga from '../saga';
const CustomInfoCard = styled.div`
  width: 50vw;
  height: 50vh;
  background-color: ${colors.primary};
  margin-top: 15vh;
  margin-left: 25vw;
  padding: 4rem;
`;
const CustomCard = styled.div`
  margin-top: 6vh;
  text-align: center;
`;

const CustomImg = styled.div`
  margin-bottom: 5vh;
`;
// eslint-disable-next-line react/prop-types
export function TuneContainer({ location, selectedTune, dispatchTuneById, tuneData, tuneError }) {
  useInjectSaga({ key: 'iTunesContainer', saga });
  const [fetchedData, setFetchedData] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!selectedTune) {
      const tuneId = location?.pathname.substr(6);
      dispatchTuneById(tuneId);
      setLoading(true);
    }
  }, []);
  useEffect(() => {
    const loaded = get(tuneData, 'results', null);
    if (loading && loaded) {
      setLoading(false);
      setFetchedData(loaded[0]);
    }
  }, [tuneData]);

  const artistName = selectedTune?.artistName || fetchedData?.artistName;
  const trackName = selectedTune?.trackName || fetchedData?.trackName;
  const release = selectedTune?.releaseDate?.substring(0, 4) || fetchedData?.releaseDate?.substring(0, 4);
  const url = selectedTune?.artworkUrl100 || fetchedData?.artworkUrl100;
  return (
    <div data-testid="tune-info">
      <Helmet>
        <title>TuneContainer</title>
        <meta name="description" content="Description of TuneContainer" />
      </Helmet>
      <CustomInfoCard>
        <If condition={!loading}>
          <CustomCard>
            <CustomImg>
              <img src={url} alt="" />
            </CustomImg>
            <div>
              <T id="track_name" values={{ trackName }} />
            </div>
            <div>
              <T id="artist_name" values={{ artistName }} />
            </div>
            <div>
              <T id="released" values={{ release }} />
            </div>
          </CustomCard>
        </If>
        <If condition={loading}>
          <CustomCard>
            <div>
              <T id="loading" values={{ tuneError }} />
            </div>
          </CustomCard>
        </If>
      </CustomInfoCard>
    </div>
  );
}

TuneContainer.propTypes = {
  selectedTune: PropTypes.shape({
    artistName: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    releaseDate: PropTypes.string,
    artworkUrl100: PropTypes.string
  }),
  dispatchTuneById: PropTypes.func,
  tuneId: PropTypes.number,
  tuneData: PropTypes.object,
  tuneError: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  selectedTune: selectSelectedTune(),
  tuneData: selectTuneData(),
  tuneError: selectTuneError()
});

function mapDispatchToProps(dispatch) {
  const { requestTuneById } = iTunesContainerCreators;
  return {
    dispatchTuneById: tuneId => dispatch(requestTuneById(tuneId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(TuneContainer);

export const TuneContainerTest = compose(injectIntl)(TuneContainer);
