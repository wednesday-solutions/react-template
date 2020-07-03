/**
 *
 * SongList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

// import styled from 'styled-components'
import { Card, Skeleton } from 'antd';
import If from '@app/components/If/index';
import { selectShowLoader } from '../ItunesAppContainer/selectors';
import SongThumbNail from '../ItunesAppContainer/SongThumbNail/index';
import { itunesAppContainerCreators } from '../ItunesAppContainer/reducer';

const CustomCard = styled(Card)`
  && {
    cursor: pointer;
    margin-top: 10px;
  }
`;

export function SongList({ songs = [], showLoader, dispatchSelectedSong }) {
  return (
    <div data-testid="song-list">
      <div className="site-card-wrapper">
        <div className="row">
          {songs?.map((songItem, i) => (
            <If condition={songItem?.trackName} key={i}>
              <div className="col-lg-3 col-sm-12">
                <If condition={showLoader}>
                  <CustomCard>
                    <Skeleton paragraph={{ rows: 6 }} loading={showLoader} active></Skeleton>
                  </CustomCard>
                </If>
                <If condition={!showLoader}>
                  <CustomCard
                    onClick={() => dispatchSelectedSong(songItem)}
                    cover={<SongThumbNail song={songItem} />}
                    title={songItem?.trackName}
                    bordered={true}
                  >
                    <span> {songItem?.trackName}</span>
                  </CustomCard>
                </If>
              </div>
            </If>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  showLoader: selectShowLoader()
});

const mapDispatchToProps = dispatch => {
  const { setSelectedSong } = itunesAppContainerCreators;
  return {
    dispatchSelectedSong: song => dispatch(setSelectedSong(song))
  };
};
SongList.propTypes = { songs: PropTypes.array, showLoader: PropTypes.bool, dispatchSelectedSong: PropTypes.func };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongList);
