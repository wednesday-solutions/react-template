import { selectHomeContainer, selectSearchData, selectSearchError, selectSearchTerm } from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let searchData;
  let searchError;

  beforeEach(() => {
    searchTerm = 'Rihana';
    searchData = { resultCount: 1, results: [{ searchTerm }] };
    searchError = 'There was some error while fetching the repository details';

    mockedState = {
      homeContainer: {
        searchTerm,
        searchData,
        searchError
      }
    };
  });
  it('should select the homeContainer state', () => {
    expect(selectHomeContainer(mockedState)).toEqual(mockedState.homeContainer);
  });
  it('should select the searchTerm', () => {
    const repoSelector = selectSearchTerm();
    expect(repoSelector(mockedState)).toEqual(searchTerm);
  });

  it('should select searchData', () => {
    const reposDataSelector = selectSearchData();
    expect(reposDataSelector(mockedState)).toEqual(searchData);
  });

  it('should select the reposError', () => {
    const reposErrorSelector = selectSearchError();
    expect(reposErrorSelector(mockedState)).toEqual(searchError);
  });
});
