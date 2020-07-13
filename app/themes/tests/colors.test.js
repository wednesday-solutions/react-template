import colors from '../colors';

describe('colors', () => {
  it('should have the correct font-size', () => {
    expect(colors.theme.lightMode).toEqual({
      primary: colors.primary,
      secondary: colors.secondary
    });
    expect(colors.theme.darkMode).toEqual({
      primary: colors.secondary,
      secondary: colors.primary
    });
  });
});
