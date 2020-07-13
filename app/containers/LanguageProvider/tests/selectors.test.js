import { selectLanguage } from '../selectors';

describe('Tests for LanguageProvider selectors', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      language: globalState
    };
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });
});
