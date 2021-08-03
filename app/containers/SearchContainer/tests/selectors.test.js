import { selectSearchContainerDomain } from '../selectors';

describe('SearchContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      searchContainer: {}
    };
  });

  it('should select the user state', () => {
    expect(selectSearchContainerDomain(mockedState)).toEqual(mockedState.searchContainer);
  });
});
