import { formReducer, formTypes, initialState } from '../reducer';

describe('Form reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(formReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
    expect(
      formReducer(initialState, {
        type: formTypes.DEFAULT_ACTION,
        somePayLoad: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
