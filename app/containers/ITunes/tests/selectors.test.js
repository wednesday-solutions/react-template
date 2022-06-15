import { fromJS } from 'immutable';
import { selectITunesDomain } from '../selectors';

describe('ITunes selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      iTunes: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectITunesDomain(mockedState)).toEqual(mockedState.iTunes.toJS());
  });
});
