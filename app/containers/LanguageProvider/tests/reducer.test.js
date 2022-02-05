import languageProviderReducer, { initialState, changeLocale } from '../reducer';

describe('Tests for LanguageProvider actions', () => {
  let mockedState;
  beforeEach(() => {
    mockedState = initialState;
  });

  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual(mockedState);
  });

  it('changes the locale', () => {
    const locale = 'de';
    mockedState = { ...mockedState, locale };
    expect(
      languageProviderReducer(undefined, {
        type: changeLocale.toString(),
        payload: locale
      })
    ).toEqual(mockedState);
  });
});
