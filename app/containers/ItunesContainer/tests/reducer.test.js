import { itunesContainerReducer, itunesContainerTypes, initialState } from '../reducer';

describe('ItunesContainer reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(itunesContainerReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
    expect(
      itunesContainerReducer(initialState, {
        type: itunesContainerTypes.DEFAULT_ACTION,
        somePayLoad: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
