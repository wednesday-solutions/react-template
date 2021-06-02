import { fromJS } from 'immutable';
import { selectHomeContainerDomain } from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      HomeContainer: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectHomeContainerDomain(mockedState)).toEqual(mockedState.HomeContainer.toJS());
  });
});
