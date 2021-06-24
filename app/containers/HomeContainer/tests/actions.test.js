import { homeContainerTypes, homeContainerCreators } from '../reducer';

describe('HomeContainer action tests', () => {
  it('has a type of REQUEST_GET_SONGS', () => {
    const expected = {
      type: homeContainerTypes.REQUEST_GET_SONGS,
      artistName: 'artistName'
    };
    expect(homeContainerCreators.requestGetSongs('artistName')).toEqual(expected);
  });
});
