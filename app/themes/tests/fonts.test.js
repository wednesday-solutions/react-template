import fonts from '../fonts';

describe('fonts', () => {
  it('should have the correct font-size', () => {
    expect(fonts.size.small()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-size:14px')])
    );
    expect(fonts.size.regular()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-size:17px;')])
    );
    expect(fonts.size.big()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-size:20px;')])
    );
    expect(fonts.size.large()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-size:24px;')])
    );
  });
  it('should have the correct font-weight', () => {
    expect(fonts.weights.light()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-weight:light;')])
    );
    expect(fonts.weights.bold()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-weight:bold;')])
    );
    expect(fonts.weights.normal()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-weight:normal;')])
    );
  });

  it('should have the correct font-weight and font-size', () => {
    expect(fonts.style.heading()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-weight:bold;')])
    );
    expect(fonts.style.heading()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-size:24px;')])
    );

    expect(fonts.style.subheading()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-weight:bold;')])
    );
    expect(fonts.style.subheading()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-size:20px;')])
    );

    expect(fonts.style.standard()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-size:17px;')])
    );
    expect(fonts.style.standard()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-weight:normal;')])
    );

    expect(fonts.style.subText()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-size:14px;')])
    );
    expect(fonts.style.subText()).toEqual(
      expect.arrayContaining([expect.stringContaining('font-weight:normal;')])
    );
  });
});
