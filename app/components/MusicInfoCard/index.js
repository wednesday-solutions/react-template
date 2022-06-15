/**
 *
 * MusicInfoCard
 *
 */

import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';

const { Meta } = Card;

function MusicInfoCard({ trackName, coverImgUrl, artistName, previewUrl, detailsUrl }) {
  const history = useHistory();

  const handleMoreClick = () => {
    history.push(detailsUrl);
  };

  return (
    <Card
      cover={<img src={coverImgUrl} alt={trackName} height="250px" width="250px" />}
      actions={[
        <Button key="button1" type="text">
          PREVIEW
        </Button>,
        <Button key="button2" type="text" onClick={handleMoreClick}>
          MORE
        </Button>
      ]}
    >
      <Meta title={trackName} description={artistName} />
    </Card>
  );
}

MusicInfoCard.propTypes = {
  trackName: PropTypes.string,
  coverImgUrl: PropTypes.string,
  artistName: PropTypes.string,
  previewUrl: PropTypes.string,
  detailsUrl: PropTypes.string
};

export default memo(MusicInfoCard);
