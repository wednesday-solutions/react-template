import { fromJS } from 'immutable';
import { selectITunesContainerDomain } from '../selectors';

describe('ITunesContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      iTunesContainer: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectITunesContainerDomain(mockedState)).toEqual(mockedState.iTunesContainer.toJS());
  });
});
