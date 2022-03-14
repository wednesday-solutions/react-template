/* eslint-disable max-lines */
import { css } from 'styled-components';
import * as colors from '../colors';
import styles, { configureFlex } from '../styles';

describe('Tests for styles', () => {
  let expectedResult;
  it('should return height stylings with passed value', () => {
    const height = styles.height;
    const value = 4;
    expectedResult = css`
      height: ${value}rem;
    `;
    expect(height(value)).toEqual(expectedResult);
  });

  it('should return the z-index styling according to the value passed', () => {
    const zIndexValue = 2;
    expectedResult = css`
      z-index: ${zIndexValue};
    `;
    expect(styles.zIndex(zIndexValue)).toEqual(expectedResult);
  });

  it('should return the textEllipsis styling according to the width passed', () => {
    const width = '100px';
    expectedResult = css`
      white-space: nowrap;
      overflow: hidden;
      width: ${width};
      text-overflow: ellipsis;
    `;
    expect(styles.textEllipsis(width)).toEqual(expectedResult);
  });

  it('should return primaryBackgroundColor styling', () => {
    expectedResult = css`
      background-color: ${colors.accent};
    `;
    expect(styles.primaryBackgroundColor()).toEqual(expectedResult);
  });

  it('should return the boxShadow stylings according to values passed', () => {
    const hOffset = 2;
    const vOffset = 1;
    const blur = 4.3;
    const spread = 2;
    const color = colors.primary;
    expectedResult = css`
      box-shadow: ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color};
    `;
    expect(styles.boxShadow(hOffset, vOffset, blur, spread, color)).toEqual(expectedResult);
  });

  it('should return the borderRaduis stylings according to the radius value and types passed', () => {
    let radius = 12;
    let expectedResult = css`
      border-radius: ${radius + `${typeof radius === `string` ? `;` : `px`}`};
    `;
    expect(styles.borderRadius(radius)).toEqual(expectedResult);

    radius = '12px';
    expectedResult = css`
      border-radius: ${radius + `${typeof radius === `string` ? `;` : `px`}`};
    `;
    expect(styles.borderRadius(radius)).toEqual(expectedResult);
  });

  it('should return the borderWithRadius stylings according to values passed', () => {
    const width = 2;
    const type = 'dashed';
    const color = colors.success;
    const radius = 12;
    expectedResult = css`
      border: ${width}px ${type} ${color};
      ${styles.borderRadius(radius)}
    `;
    expect(styles.borderWithRadius(width, type, color, radius)).toEqual(expectedResult);
  });

  it('should return borderRadiusBottom stylings according to the bottomRadius value passed', () => {
    const bottomRadius = 4;
    expectedResult = css`
      border-bottom-left-radius: ${bottomRadius}px;
      border-bottom-right-radius: ${bottomRadius}px;
    `;
    expect(styles.borderRadiusBottom(bottomRadius)).toEqual(expectedResult);
  });

  it('should return borderRadiusTop stylings according to the topRadius value passed', () => {
    const topRadius = 4;
    expectedResult = css`
      border-top-left-radius: ${topRadius}px;
      border-top-right-radius: ${topRadius}px;
    `;
    expect(styles.borderRadiusTop(topRadius)).toEqual(expectedResult);
  });

  it('should return the margin-top Styling according to the top distance value provided', () => {
    const marginTop = 12;
    expectedResult = css`
      margin-top: ${marginTop}rem;
    `;
    expect(styles.margin.top(marginTop)).toEqual(expectedResult);
  });

  it('should return the margin-bottom Styling according to the bottom distance value provided', () => {
    const marginBottom = 12;
    expectedResult = css`
      margin-bottom: ${marginBottom}rem;
    `;
    expect(styles.margin.bottom(marginBottom)).toEqual(expectedResult);
  });

  it('should return the margin-left Styling according to the left distance value provided', () => {
    const marginLeft = 12;
    expectedResult = css`
      margin-left: ${marginLeft}rem;
    `;
    expect(styles.margin.left(marginLeft)).toEqual(expectedResult);
  });

  it('should return the margin-left Styling according to the left distance value provided', () => {
    const marginRight = 12;
    expectedResult = css`
      margin-right: ${marginRight}rem;
    `;
    expect(styles.margin.right(marginRight)).toEqual(expectedResult);
  });

  it('should return the vertical margin styilngs according to the verticalMargin value passed', () => {
    const verticalMargin = 10;
    expectedResult = css`
      margin-top: ${verticalMargin}rem;
      margin-bottom: ${verticalMargin}rem;
    `;
    expect(styles.margin.vertical(verticalMargin)).toEqual(expectedResult);
  });

  it('should return the horizontal margin styilngs according to the horizontalMargin value passed', () => {
    const horizontalMargin = 10;
    expectedResult = css`
      margin-left: ${horizontalMargin}rem;
      margin-right: ${horizontalMargin}rem;
    `;
    expect(styles.margin.horizontal(horizontalMargin)).toEqual(expectedResult);
  });

  it('should return the row stylings', () => {
    expect(styles.flexConfig.row()).toEqual(css`
      display: flex;
      flex: 1;
      flex-direction: row;
    `);
  });

  it('should return the rowCenter stylings', () => {
    expectedResult = css`
      ${configureFlex('row', 'center', 'center', 'center')};
    `;
    expect(styles.flexConfig.rowCenter()).toEqual(expectedResult);
  });

  it('should return the stylings of column', () => {
    expectedResult = css`
      display: flex;
      flex: 1;
      flex-direction: column;
    `;
    expect(styles.flexConfig.column()).toEqual(expectedResult);
  });

  it('should return the unequalColumns stylings', () => {
    expectedResult = css`
      ${configureFlex('column', '', '', '', 0, 0, 0)};
    `;
    expect(styles.flexConfig.unequalColumns()).toEqual(expectedResult);
  });

  it('should return default height stylings', () => {
    const height = 4;
    expectedResult = css`
      height: ${height}rem;
    `;
    expect(styles.height()).toEqual(expectedResult);
  });

  it('should return default marginTop stylings', () => {
    const marginTop = 0;
    expectedResult = css`
      margin-top: ${marginTop}rem;
    `;
    expect(styles.margin.top()).toEqual(expectedResult);
  });

  it('should return default marginLeft stylings', () => {
    const marginLeft = 0;
    expectedResult = css`
      margin-left: ${marginLeft}rem;
    `;
    expect(styles.margin.left()).toEqual(expectedResult);
  });

  it('should return default marginRight stylings', () => {
    const marginRight = 0;
    expectedResult = css`
      margin-right: ${marginRight}rem;
    `;
    expect(styles.margin.right()).toEqual(expectedResult);
  });

  it('should return default marginBottom stylings', () => {
    const marginBottom = 0;
    expectedResult = css`
      margin-bottom: ${marginBottom}rem;
    `;
    expect(styles.margin.bottom()).toEqual(expectedResult);
  });

  it('should return default verticalMargin stylings', () => {
    const verticalMargin = 0;
    expectedResult = css`
      margin-top: ${verticalMargin}rem;
      margin-bottom: ${verticalMargin}rem;
    `;
    expect(styles.margin.vertical()).toEqual(expectedResult);
  });

  it('should return default horizontalMargin stylings', () => {
    const horizontalMargin = 0;
    expectedResult = css`
      margin-left: ${horizontalMargin}rem;
      margin-right: ${horizontalMargin}rem;
    `;
    expect(styles.margin.horizontal()).toEqual(expectedResult);
  });

  it('should return default borderRadiusBottom stylings', () => {
    const bottomRadius = 0;
    expectedResult = css`
      border-bottom-left-radius: ${bottomRadius}px;
      border-bottom-right-radius: ${bottomRadius}px;
    `;
    expect(styles.borderRadiusBottom()).toEqual(expectedResult);
  });

  it('should return default borderRadiusTop stylings', () => {
    const topRadius = 0;
    expectedResult = css`
      border-top-left-radius: ${topRadius}px;
      border-top-right-radius: ${topRadius}px;
    `;
    expect(styles.borderRadiusTop()).toEqual(expectedResult);
  });

  it('should return default borderWithRadius stylings', () => {
    const width = 1;
    const type = 'solid';
    const color = '#ccc';
    const radius = 0;

    expectedResult = css`
      border: ${width}px ${type} ${color};
      ${styles.borderRadius(radius)}
    `;
    expect(styles.borderWithRadius()).toEqual(expectedResult);
  });

  it('should return default boxShadow stylings', () => {
    const hOffset = 0;
    const vOffset = 0;
    const blur = 0;
    const spread = 0;
    const color = '#ccc';

    expectedResult = css`
      box-shadow: ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color};
    `;
    expect(styles.boxShadow()).toEqual(expectedResult);
  });

  it('should return default z-index stylings', () => {
    const z = 1;
    expectedResult = css`
      z-index: ${z};
    `;
    expect(styles.zIndex()).toEqual(expectedResult);
  });

  it('should return default textEllipsis stylings', () => {
    const width = '200px';
    expectedResult = css`
      white-space: nowrap;
      overflow: hidden;
      width: ${width};
      text-overflow: ellipsis;
    `;
    expect(styles.textEllipsis()).toEqual(expectedResult);
  });
});

describe('Tests for ConfigureFlex method', () => {
  let direction;
  let justifyContent;
  let alignItems;
  let alignContent;
  let flexBasis;
  let flexGrow;
  let flexShrink;
  let expectedResult;

  it('should return the css styling according to the values passed', () => {
    direction = 'column';
    justifyContent = 'space-around';
    alignItems = 'baseline';
    alignContent = 'baseline';
    flexBasis = 1;
    flexGrow = 1.2;
    flexShrink = 1;
    expectedResult = css`
      ${styles.flexConfig.column()}
      flex-direction: ${direction};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
      align-content: ${alignContent};
      flex-basis: ${flexBasis};
      flex-grow: ${flexGrow};
      flex-shrink: ${flexShrink};
    `;
    expect(configureFlex(direction, justifyContent, alignItems, alignContent, flexBasis, flexGrow, flexShrink)).toEqual(
      expectedResult
    );
  });
  it('should return the default css styling accordingly', () => {
    direction = 'row';
    justifyContent = 'center';
    alignItems = 'center';
    alignContent = 'center';
    flexBasis = 0;
    flexGrow = 1;
    flexShrink = 0;
    expectedResult = css`
      ${styles.flexConfig.row()}
      flex-direction: ${direction};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
      align-content: ${alignContent};
      flex-basis: ${flexBasis};
      flex-grow: ${flexGrow};
      flex-shrink: ${flexShrink};
    `;
    expect(JSON.stringify(configureFlex())).toEqual(JSON.stringify(expectedResult));
  });
});
