import { songContainerTypes, songContainerCreators } from '../../reducer';

describe('TrackContainer action tests', () => {
  it('has a type of REQUEST_GET_TRACK', () => {
    const expected = {
      type: songContainerTypes.REQUEST_GET_TRACK,
      id: 1
    };
    expect(songContainerCreators.requestGetTrack(1)).toEqual(expected);
  });
  it('has a type of SUCESS_GET_TRACK', () => {
    const expected = {
      type: songContainerTypes.SUCCESS_GET_TRACK,
      data: { id: 1 }
    };
    expect(songContainerCreators.successGetTrack({ id: 1 })).toEqual(expected);
  });
  it('has a type of FAILURE_GET_TRACK', () => {
    const expected = {
      type: songContainerTypes.FAILURE_GET_TRACK,
      error: 'error'
    };
    expect(songContainerCreators.failureGetTrack('error')).toEqual(expected);
  });
  it('has a type of CLEAR_TRACK', () => {
    const expected = {
      type: songContainerTypes.CLEAR_TRACK
    };
    expect(songContainerCreators.clearTrack('error')).toEqual(expected);
  });
});
