import { homeContainerTypes, homeContainerCreators } from '../reducer';

describe('HomeContainer action tests', () => {
  it('has a type of REQUEST_GET_ARTIST', () => {
    const expected = {
      type: homeContainerTypes.REQUEST_GET_ARTIST,
      artistName: 'artistName'
    };
    expect(homeContainerCreators.requestGetArtist('artistName')).toEqual(expected);
  });
});
