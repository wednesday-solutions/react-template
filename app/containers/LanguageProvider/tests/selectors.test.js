import { fromJS } from 'immutable';
import { selectLanguage } from '../selectors';

describe('Tests for LanguageProvider selectors', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      language: fromJS(globalState)
    };
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });
});
