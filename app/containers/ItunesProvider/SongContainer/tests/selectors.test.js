import { fromJS } from 'immutable';
import { selectSongContainerDomain } from '../selectors';

describe('SongContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      songContainer: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectSongContainerDomain(mockedState)).toEqual(mockedState.songContainer.toJS());
  });
});
