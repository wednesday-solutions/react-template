import { css } from 'styled-components';
import * as colors from '../colors';
import styles, { configureFlex } from '../styles';

describe('Tests for styles', () => {
  it('should return height stylings with passed value', () => {
    const height = styles.height;
    const value = 4;
    const expectedResult = css`
      height: ${value}rem;
    `;
    expect(height(value)).toEqual(expectedResult);
  });

  it('should return the z-index styling according to the value passed', () => {
    const zIndexValue = 2;
    const expectedResult = css`
      z-index: ${zIndexValue};
    `;
    expect(styles.zIndex(zIndexValue)).toEqual(expectedResult);
  });

  it('should return the textEllipsis styling according to the width passed', () => {
    const width = '100px';
    const expectedResult = css`
      white-space: nowrap;
      overflow: hidden;
      width: ${width};
      text-overflow: ellipsis;
    `;
    expect(styles.textEllipsis(width)).toEqual(expectedResult);
  });

  it('should return primaryBackgroundColor styling', () => {
    const expectedResult = css`
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
    const expectedResult = css`
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
    const expectedResult = css`
      border: ${width}px ${type} ${color};
      ${styles.borderRadius(radius)}
    `;
    expect(styles.borderWithRadius(width, type, color, radius)).toEqual(expectedResult);
  });

  it('should return borderRadiusBottom stylings according to the bottomRadius value passed', () => {
    const bottomRadius = 4;
    const expectedResult = css`
      border-bottom-left-radius: ${bottomRadius}px;
      border-bottom-right-radius: ${bottomRadius}px;
    `;
    expect(styles.borderRadiusBottom(bottomRadius)).toEqual(expectedResult);
  });

  it('should return borderRadiusTop stylings according to the topRadius value passed', () => {
    const topRadius = 4;
    const expectedResult = css`
      border-top-left-radius: ${topRadius}px;
      border-top-right-radius: ${topRadius}px;
    `;
    expect(styles.borderRadiusTop(topRadius)).toEqual(expectedResult);
  });

  it('should return the margin-top Styling according to the top distance value provided', () => {
    const marginTop = 12;
    const expectedResult = css`
      margin-top: ${marginTop}rem;
    `;
    expect(styles.margin.top(marginTop)).toEqual(expectedResult);
  });

  it('should return the margin-bottom Styling according to the bottom distance value provided', () => {
    const marginBottom = 12;
    const expectedResult = css`
      margin-bottom: ${marginBottom}rem;
    `;
    expect(styles.margin.bottom(marginBottom)).toEqual(expectedResult);
  });

  it('should return the margin-left Styling according to the left distance value provided', () => {
    const marginLeft = 12;
    const expectedResult = css`
      margin-left: ${marginLeft}rem;
    `;
    expect(styles.margin.left(marginLeft)).toEqual(expectedResult);
  });

  it('should return the margin-left Styling according to the left distance value provided', () => {
    const marginRight = 12;
    const expectedResult = css`
      margin-right: ${marginRight}rem;
    `;
    expect(styles.margin.right(marginRight)).toEqual(expectedResult);
  });

  it('should return the vertical margin styilngs according to the verticalMargin value passed', () => {
    const verticalMargin = 10;
    const expectedResult = css`
      margin-top: ${verticalMargin}rem;
      margin-bottom: ${verticalMargin}rem;
    `;
    expect(styles.margin.vertical(verticalMargin)).toEqual(expectedResult);
  });

  it('should return the horizontal margin styilngs according to the horizontalMargin value passed', () => {
    const horizontalMargin = 10;
    const expectedResult = css`
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
    const expectedResult = css`
      ${configureFlex('row', 'center', 'center', 'center')};
    `;
    expect(styles.flexConfig.rowCenter()).toEqual(expectedResult);
  });

  it('should return the stylings of column', () => {
    const expectedResult = css`
      display: flex;
      flex: 1;
      flex-direction: column;
    `;
    expect(styles.flexConfig.column()).toEqual(expectedResult);
  });

  it('should return the unequalColumns stylings', () => {
    const expectedResult = css`
      ${configureFlex('column', '', '', '', 0, 0, 0)};
    `;
    expect(styles.flexConfig.unequalColumns()).toEqual(expectedResult);
  });
});

describe('Tests for ConfigureFlex method', () => {
  it('should return the css styling according to the values passed', () => {
    const direction = 'column';
    const justifyContent = 'space-around';
    const alignItems = 'baseline';
    const alignContent = 'baseline';
    const flexBasis = 1;
    const flexGrow = 1.2;
    const flexShrink = 1;
    const expectedResult = css`
      ${direction === 'row' ? styles.flexConfig.row() : styles.flexConfig.column()}
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
});
