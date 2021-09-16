import { generateMedia } from 'styled-media-query';

const ScreenBreakPoints = {
  XS: 480,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1366,
  XXL: 1600
};

const media = generateMedia({
  xs: `${ScreenBreakPoints.XS / 16}em`,
  sm: `${ScreenBreakPoints.SM / 16}em`,
  md: `${ScreenBreakPoints.MD / 16}em`,
  lg: `${ScreenBreakPoints.LG / 16}em`,
  xl: `${ScreenBreakPoints.XL / 16}em`,
  xxl: `${ScreenBreakPoints.XXL / 16}em`
});

export default media;
