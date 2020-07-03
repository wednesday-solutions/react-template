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
import { PlayCircleOutlined } from '@ant-design/icons';

// import styled from 'styled-components'
import { Card, Skeleton } from 'antd';
import If from '@app/components/If/index';
import { selectShowLoader } from '../ItunesAppContainer/selectors';

const CustomCard = styled(Card)`
  && {
    cursor: pointer;
    margin-top: 10px;
  }
`;

const CustomPlayCircleOutlined = styled(PlayCircleOutlined)`
  && {
    font-size: 50px;
    color: red;
    margin-left: 40%;
    margin-top: 40%;
  }
`;
const StyledImage = styled.div`
  .thumbNail {
    width: 100%;
    height: 100%;
    display: none;
  }
  .thumbNailContainer {
    width: 100%;
    height: 100%;
  }

  .thumbNailContainer:hover .thumbNail {
    display: inline;
  }

  .thumbNailContainer:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  && {
    display: block;
    background: url(${props => props.url});
    width: 100%;
    height: 389px;
    background-size: 100%;
    background-repeat: no-repeat;
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
                    cover={
                      <StyledImage url={songItem?.artworkUrl100}>
                        <div className="thumbNailContainer">
                          <div className="thumbNail">
                            <CustomPlayCircleOutlined
                              onClick={() => {
                                window.open(songItem?.previewUrl, '_blank');
                              }}
                            />
                          </div>
                        </div>
                      </StyledImage>
                    }
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
