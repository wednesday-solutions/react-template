import { songContainerTypes, songContainerCreators } from '../../reducer';

describe('SongContainer action tests', () => {
  it('has a type of REQUEST_GET_SONGS', () => {
    const expected = {
      type: songContainerTypes.REQUEST_GET_SONGS,
      query: 'query'
    };
    expect(songContainerCreators.requestGetSongs('query')).toEqual(expected);
  });
  it('has a type of SUCESS_GET_SONGS', () => {
    const expected = {
      type: songContainerTypes.SUCCESS_GET_SONGS,
      data: { query: 'query' }
    };
    expect(songContainerCreators.successGetSongs({ query: 'query' })).toEqual(expected);
  });
});
