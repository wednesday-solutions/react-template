import { css } from '@emotion/react';
import fonts, { dynamicFontSize } from '../fonts';
import media from '../media';

describe('fonts', () => {
  it('should have the correct font-size', () => {
    expect(fonts.size.small()['styles']).toEqual('font-size:0.875rem');
    expect(fonts.size.regular()['styles']).toEqual('font-size:1rem');
    expect(fonts.size.big()['styles']).toEqual('font-size:1.25rem');
    expect(fonts.size.large()['styles']).toEqual('font-size:1.5rem');
    expect(fonts.size.extraLarge()['styles']).toEqual('font-size:2rem');
  });
  it('should have the correct font-weight', () => {
    expect(fonts.weights.light()['styles']).toEqual('font-weight:light');
    expect(fonts.weights.bold()['styles']).toEqual('font-weight:bold');
    expect(fonts.weights.normal()['styles']).toEqual('font-weight:normal');
  });
  it('should have the correct font-weight and font-size', () => {
    expect(fonts.style.heading()['styles']).toEqual('font-size:1.5rem; font-weight:bold;;');
    expect(fonts.style.subheading()['styles']).toEqual('font-size:1.25rem; font-weight:bold;;');
    expect(fonts.style.standard()['styles']).toEqual('font-size:1rem; font-weight:normal;;');
    expect(fonts.style.subText()['styles']).toEqual('font-size:0.875rem; font-weight:normal;;');
  });
});

describe('Tests for dynamicFontSize method', () => {
  it('should return dynamic font stylings along with required media queries', () => {
    const font = fonts.size.large;
    const desktopDelta = 1;
    const tabletDelta = 0.4;
    const expectedResult = css`
      ${font()}
      ${`@media (min-width: ${media.tablet}) {
    font-size: ${
      tabletDelta + parseInt(font()['styles'].replace('font-size:', '').replace('rem;', '').replace(/\s+/g, ''))
    }rem;
  }`}
  ${`@media (min-width: ${media.desktop}) {
    font-size: ${
      desktopDelta + parseInt(font()['styles'].replace('font-size:', '').replace('rem;', '').replace(/\s+/g, ''))
    }rem;
  }`}
    `;
    expect(dynamicFontSize(font, desktopDelta, tabletDelta)['styles']).toEqual(expectedResult['styles']);
  });

  it('should return  default dynamic font stylings along with required media queries', () => {
    const font = fonts.size.large;

    const expectedResult = css`
      ${font()}
      ${`@media (min-width: ${media.tablet}) {
    font-size: ${parseInt(font()['styles'].replace('font-size:', '').replace('rem;', '').replace(/\s+/g, ''))}rem;
  }`}
  ${`@media (min-width: ${media.desktop}) {
    font-size: ${parseInt(font()['styles'].replace('font-size:', '').replace('rem;', '').replace(/\s+/g, ''))}rem;
  }`}
    `;
    expect(dynamicFontSize(font)['styles']).toEqual(expectedResult['styles']);
  });
});
