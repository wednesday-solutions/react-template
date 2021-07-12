import styled from 'styled-components';
import PropTypes from 'prop-types';

import React from 'react';

const ImageArt = styled.img`
  && {
    object-fit: contain;
    height: 250px;
  }
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

const AlbumArt = ({ source }) => {
  const [src, { blur }] = useProgressiveImg(`https://placeholder.pics/svg/250/DEDEDE/555555/loading...`, source);
  return <ImageArt src={src} />;
};

AlbumArt.PropTypes = {
  source: PropTypes.string.isRequired,
  blur: PropTypes.string
};

export default AlbumArt;
