import { createSelector } from 'reselect';
import { makeSelectLocale, selectLanguage } from '../selectors';
import { initialState } from '../reducer';

describe('Tests for LanguageProvider selectors', () => {
  const globalState = {};
  let mockedState;
  beforeAll(() => {
    mockedState = {
      language: globalState
    };
  });
  it('should select the global state', () => {
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });

  it('should select the global state', () => {
    mockedState = {};
    expect(selectLanguage(mockedState)).toEqual(initialState);
  });

  it('should return the selector', () => {
    const expectedResult = createSelector(selectLanguage, (initialState) => initialState.locale);
    expect(JSON.stringify(makeSelectLocale(initialState))).toEqual(JSON.stringify(expectedResult));
  });
});
