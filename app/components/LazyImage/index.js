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

const LazyImage = ({ lowResUrl, highResUrl }) => {
  const [src] = useProgressiveImg(lowResUrl, highResUrl);
  return <ImageArt src={src} />;
};

LazyImage.propTypes = {
  lowResUrl: PropTypes.string.isRequired,
  highResUrl: PropTypes.string.isRequired
};

export default LazyImage;
