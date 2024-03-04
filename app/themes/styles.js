import { css } from '@emotion/react';
import colors from '@app/themes/colors';

export const configureFlex = ({
  direction = 'row',
  justifyContent = 'center',
  alignItems = 'center',
  alignContent = 'center',
  flexBasis = 0,
  flexGrow = 1,
  flexShrink = 0
}) => css`
  ${direction === 'row' ? row() : column()}
  flex-direction: ${direction};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  align-content: ${alignContent};
  flex-basis: ${flexBasis};
  flex-grow: ${flexGrow};
  flex-shrink: ${flexShrink};
`;

const row = () => css`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
const column = () => css`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const rowCenter = () => css`
  ${configureFlex({
    direction: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  })};
`;

const unequalColumns = () => css`
  ${configureFlex({
    direction: 'row',
    flexBasis: 0,
    flexGrow: 0,
    flexShrink: 0
  })};
`;

const height = (heightValue = 4) => css`
  height: ${heightValue}rem;
`;

const top = (marginTop = 0) =>
  css`
    margin-top: ${marginTop}rem;
  `;

const bottom = (marginBottom = 0) =>
  css`
    margin-bottom: ${marginBottom}rem;
  `;

const left = (marginLeft = 0) =>
  css`
    margin-left: ${marginLeft}rem;
  `;

const right = (marginRight = 0) =>
  css`
    margin-right: ${marginRight}rem;
  `;

const vertical = (verticalMargin = 0) => css`
  margin-top: ${verticalMargin}rem;
  margin-bottom: ${verticalMargin}rem;
`;

const horizontal = (horizontalMargin = 0) => css`
  margin-left: ${horizontalMargin}rem;
  margin-right: ${horizontalMargin}rem;
`;

const borderRadiusBottom = (bottomRadius = 0) => css`
  border-bottom-left-radius: ${bottomRadius}px;
  border-bottom-right-radius: ${bottomRadius}px;
`;

const borderRadiusTop = (topRadius = 0) => css`
  border-top-left-radius: ${topRadius}px;
  border-top-right-radius: ${topRadius}px;
`;

const borderRadius = (radius) =>
  css`
    border-radius: ${radius + typeof radius !== 'string' && 'px'};
  `;

const primaryBackgroundColor = () =>
  css`
    background-color: ${colors.accent};
  `;

const zIndex = (z = 1) => css`
  z-index: ${z};
`;

const textEllipsis = (width = '200px') => css`
  white-space: nowrap;
  overflow: hidden;
  width: ${width};
  text-overflow: ellipsis;
`;
export default {
  height,
  zIndex,
  textEllipsis,
  margin: {
    top,
    bottom,
    right,
    left,
    vertical,
    horizontal
  },
  borderRadius,
  borderRadiusBottom,
  borderRadiusTop,
  primaryBackgroundColor,
  flexConfig: {
    row,
    column,
    rowCenter,
    unequalColumns
  }
};
