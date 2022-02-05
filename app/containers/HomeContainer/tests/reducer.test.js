import home, {
  initialState,
  requestGetGithubRepos,
  successGetGithubRepos,
  failureGetGithubRepos,
  clearGithubRepos
} from '../reducer';

describe('HomContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(home(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const repo = 'Mohammed Ali Chherawalla';
    const expectedResult = { ...state, repo };
    expect(
      home(state, {
        type: requestGetGithubRepos.toString(),
        payload: repo
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { name: 'Mohammed Ali Chherawalla' };
    const expectedResult = { ...state, data };
    expect(
      home(state, {
        type: successGetGithubRepos.toString(),
        payload: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, error };
    expect(
      home(state, {
        type: failureGetGithubRepos.toString(),
        payload: error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when home/clearGithubRepos is dispatched', () => {
    expect(
      home(state, {
        type: clearGithubRepos.toString()
      })
    ).toEqual(initialState);
  });
});
