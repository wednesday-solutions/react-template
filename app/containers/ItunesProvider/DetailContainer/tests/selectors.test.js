import { fromJS } from 'immutable';
import { selectDetailContainerDomain } from '../selectors';

describe('DetailContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      detailContainer: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectDetailContainerDomain(mockedState)).toEqual(mockedState.detailContainer.toJS());
  });
});
