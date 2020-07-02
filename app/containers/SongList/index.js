/**
 *
 * SongList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import styled from 'styled-components'
import { Card, Col, Row } from 'antd';
import If from '@app/components/If/index';
const CustomCard = styled(Card)`
  .songImg {
    max-height: 200px;
  }
  && {
    cursor: pointer;
    margin: 10px;
  }
`;

function SongList({ songs = [] }) {
  return (
    <div data-testid="song-list">
      <div className="site-card-wrapper">
        <Row gutter={10}>
          {songs?.map(songItem => (
            <If condition={songItem?.trackName} key={songItem?.collectionId}>
              <Col span={6}>
                <CustomCard
                  onClick={() => window.open(songItem?.collectionViewUrl, '_blank')}
                  style={{ width: 300 }}
                  cover={<img alt="example" className="songImg" src={songItem?.artworkUrl100} />}
                  title={songItem?.trackName}
                  bordered={true}
                >
                  {songItem?.trackName}
                </CustomCard>
              </Col>
            </If>
          ))}
        </Row>
      </div>
    </div>
  );
}

SongList.propTypes = { songs: PropTypes.array };

export default SongList;
