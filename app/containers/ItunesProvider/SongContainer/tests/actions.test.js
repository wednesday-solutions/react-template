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
  it('has a type of FAILURE_GET_SONGS', () => {
    const expected = {
      type: songContainerTypes.FAILURE_GET_SONGS,
      error: 'error'
    };
    expect(songContainerCreators.failureGetSongs('error')).toEqual(expected);
  });
  it('has a type of CLEAR_SONGS', () => {
    const expected = {
      type: songContainerTypes.CLEAR_SONGS
    };
    expect(songContainerCreators.clearSongs('error')).toEqual(expected);
  });
});
