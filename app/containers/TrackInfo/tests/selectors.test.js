import { fromJS } from 'immutable';
import { selectTrackInfoDomain } from '../selectors';

describe('TrackInfo selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      trackInfo: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectTrackInfoDomain(mockedState)).toEqual(mockedState.trackInfo.toJS());
  });
});
