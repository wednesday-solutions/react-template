import { css } from 'styled-components';
import media from '@app/themes/media';

// sizes
const dynamicFontSize = (font, desktopDelta = 0, tabletDelta = 0) => css`
  ${font()}
  ${media.tablet.min(
    `font-size: ${
      tabletDelta + parseInt(font()[0].replace('font-size:', '').replace('rem;', '').replace(/\s+/g, ''))
    }rem;`
  )};
  ${media.desktop.min(
    `font-size: ${
      desktopDelta + parseInt(font()[0].replace('font-size:', '').replace('rem;', '').replace(/\s+/g, ''))
    }rem;`
  )};
`;
const regular = () => css`
  font-size: 1rem;
`;

const xRegular = () => css`
  font-size: 1.125rem;
`;
const small = () => css`
  font-size: 0.875rem;
`;
const big = () => css`
  font-size: 1.25rem;
`;
const large = () => css`
  font-size: 1.5rem;
`;
const extraLarge = () => css`
  font-size: 2rem;
`;

// weights
const light = () => css`
  font-weight: light;
`;
const bold = () => css`
  font-weight: bold;
`;

const normal = () => css`
  font-weight: normal;
`;

//families
const track = () => css`
  font-family: Helvetica, Arial, sans-serif;
`;

// styles
const heading = () => css`
  ${large()}
  ${bold()}
`;

const subheading = () => css`
  ${big()}
  ${bold()}
`;

const standard = () => css`
  ${regular()}
  ${normal()}
`;

const subText = () => css`
  ${small()}
  ${normal()}
`;

const description = () => css`
  ${small()}
  ${track()}
`;
const title = () => css`
  ${regular()}
  ${track()}
`;

export default {
  dynamicFontSize,
  size: {
    regular,
    small,
    big,
    large,
    extraLarge,
    xRegular
  },
  style: {
    heading,
    subheading,
    standard,
    subText,
    description,
    title
  },
  weights: {
    light,
    bold,
    normal
  },
  families: {
    track
  }
};
