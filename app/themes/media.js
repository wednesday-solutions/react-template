import { css } from 'styled-components';
const ScreenSizes = {
  DESKTOP: 992,
  TABLET: 768,
  PHONE: 320
};
const sizes = {
  desktop: ScreenSizes.DESKTOP,
  tablet: ScreenSizes.TABLET,
  mobile: ScreenSizes.PHONE
};
// iterate through sizes and create a media template
export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = {
    min: args =>
      css`
        @media (min-width: ${sizes[label] / 16}em) {
          ${css([args])};
        }
      `
        .join('')
        .replace(' ', ''),
    max: args =>
      css`
        @media (max-width: ${sizes[label] / 16}em) {
          ${css([args])};
        }
      `
        .join('')
        .replace(' ', '')
  };
  return acc;
}, {});
