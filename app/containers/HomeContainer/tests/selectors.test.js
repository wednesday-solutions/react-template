import {
  selectHomeContainer,
  selectHomeContainerDomain,
  selectRepoName,
  selectReposData,
  selectReposError
} from '../selectors';
import { initialState } from '../reducer';
describe('HomeContainer selector tests', () => {
  let mockedState;
  let repo;
  let data;
  let error;

  beforeEach(() => {
    repo = 'mac';
    data = { totalCount: 1, items: [{ repo }] };
    error = 'There was some error while fetching the repository details';

    mockedState = {
      home: {
        repo,
        data,
        error
      }
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(mockedState.home);
  });
  it('should select the repoName', () => {
    const repoSelector = selectRepoName();
    expect(repoSelector(mockedState)).toEqual(repo);
  });

  it('should select reposData', () => {
    const reposDataSelector = selectReposData();
    expect(reposDataSelector(mockedState)).toEqual(data);
  });

  it('should select the reposError', () => {
    const reposErrorSelector = selectReposError();
    expect(reposErrorSelector(mockedState)).toEqual(error);
  });

  it('should select the global state', () => {
    const selector = selectHomeContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
