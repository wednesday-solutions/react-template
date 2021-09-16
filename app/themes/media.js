import { generateMedia } from 'styled-media-query';

const ScreenBreakPoints = {
  SM: 320,
  MD: 768,
  LG: 992
};

const media = generateMedia({
  sm: `${ScreenBreakPoints.SM / 16}em`,
  md: `${ScreenBreakPoints.MD / 16}em`,
  lg: `${ScreenBreakPoints.LG / 16}em`
});

export default media;
