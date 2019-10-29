import { selectLanguage } from '../selectors';

describe('LanguageProvider selector tests', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      language: globalState
    };
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });
});
