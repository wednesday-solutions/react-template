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

const CustomCard = styled(Card)`
  .songImg {
    max-height: 200px;
  }
  && {
    cursor: pointer;
    margin-top: 10px;
    min-height: 200px;
  }
`;

export function SongList({ songs = [], showLoader }) {
  return (
    <div data-testid="song-list">
      <div className="site-card-wrapper">
        <div className="row">
          {songs?.map((songItem, i) => (
            <If condition={songItem?.trackName} key={i}>
              <div className="col-lg-4 col-sm-12">
                <If condition={showLoader}>
                  <CustomCard>
                    <Skeleton paragraph={{ rows: 6 }} loading={showLoader} active></Skeleton>
                  </CustomCard>
                </If>
                <If condition={!showLoader}>
                  <CustomCard
                    onClick={() => window.open(songItem?.collectionViewUrl, '_blank')}
                    cover={<img alt="example" className="songImg" src={songItem?.artworkUrl100} />}
                    title={songItem?.trackName}
                    bordered={true}
                  >
                    {songItem?.trackName}
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
SongList.propTypes = { songs: PropTypes.array, showLoader: PropTypes.bool };

export default connect(mapStateToProps)(SongList);
