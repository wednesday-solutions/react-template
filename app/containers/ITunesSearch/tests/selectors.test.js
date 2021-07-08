import { fromJS } from 'immutable';
import { selectITunesSearchDomain } from '../selectors';

describe('ITunesSearch selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      iTunesSearch: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectITunesSearchDomain(mockedState)).toEqual(mockedState.iTunesSearch);
  });
});
