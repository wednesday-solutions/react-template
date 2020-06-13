import { initialState, languageProviderTypes, languageProviderReducer } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
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
        type: languageProviderTypes.CHANGE_LOCALE,
        locale
      })
    ).toEqual(mockedState);
  });
});
