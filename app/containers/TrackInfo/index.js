/**
 *
 * TrackInfo
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { useInjectSaga } from '@utils/injectSaga'
import { injectSaga } from 'redux-injectors';
import saga from './saga';
import { selectSongs } from '../ITunes/selectors';
import { selectSongInfo } from './selectors';
import { trackInfoCreators } from './reducer';

export function TrackInfo({ dispatchGetSongDetails, songs, songInfo }) {
  // useInjectSaga({ key: 'trackInfo', saga })
  const params = useParams();

  useEffect(() => {
    const songId = params.id;
    const songDetails = songs.find((song) => song.trackId == songId);
    dispatchGetSongDetails(songId, songDetails);
  }, []);

  return (
    <div>
      <Helmet>
        <title>TrackInfo</title>
        <meta name="description" content="Description of TrackInfo" />
      </Helmet>
      <pre>{JSON.stringify(songInfo, null, 2)}</pre>
    </div>
  );
}

TrackInfo.propTypes = {
  dispatchGetSongDetails: PropTypes.func,
  songs: PropTypes.array,
  songInfo: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  songs: selectSongs(),
  songInfo: selectSongInfo()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongDetails } = trackInfoCreators;
  return {
    dispatchGetSongDetails: (trackId, songDetails) => dispatch(requestGetSongDetails(trackId, songDetails))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'trackInfo', saga }))(TrackInfo);

export const TrackInfoTest = compose(injectIntl)(TrackInfo);
