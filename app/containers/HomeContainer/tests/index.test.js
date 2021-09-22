/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer, mapDispatchToProps } from '../index';
import { homeContainerTypes } from '../reducer';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchGithubRepos={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearGithubRepos on empty change', async () => {
    const getGithubReposSpy = jest.fn();
    const clearGithubReposSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchClearGithubRepos={clearGithubReposSpy} dispatchGithubRepos={getGithubReposSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getGithubReposSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearGithubReposSpy).toBeCalled();
  });

  it('should call dispatchGithubRepos on change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchGithubRepos={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should dispatchGithubRepos on update on mount if repoName is already persisted', async () => {
    const repoName = 'some repo';
    renderProvider(<HomeContainer repoName={repoName} reposData={null} dispatchGithubRepos={submitSpy} />);

    await timeout(500);
    expect(submitSpy).toBeCalledWith(repoName);
  });

  it('should render ErrorCard when reposError is present', () => {
    const error = 'something_went_wrong';
    const { getByTestId } = renderProvider(<HomeContainer dispatchGithubRepos={submitSpy} reposError={error} />);

    expect(getByTestId('error-card')).toBeInTheDocument();
  });

  it('should render 2 repoCards as reposData has 2 items', () => {
    const reposData = {
      totalCount: 2,
      items: [{ repositoryName: 'Mac' }, { repositoryName: 'Dev' }]
    };
    const { getAllByTestId } = renderProvider(<HomeContainer dispatchGithubRepos={submitSpy} reposData={reposData} />);
    const itemCards = getAllByTestId('item-card');
    expect(itemCards).toHaveLength(2);
  });

  it('should match mapDispatchToProps actions', async () => {
    const repoName = 'Mac';
    const dispatchSpy = jest.fn((fn) => fn);
    const dispatchGithubReposSpy = jest.fn(() => ({ type: homeContainerTypes.REQUEST_GET_GITHUB_REPOS, repoName }));
    const dispatchClearGithubReposSpy = jest.fn(() => ({ type: homeContainerTypes.CLEAR_GITHUB_REPOS }));

    const props = mapDispatchToProps(dispatchSpy);

    const actions = {
      dispatchGithubReposSpy,
      dispatchClearGithubReposSpy
    };

    props.dispatchGithubRepos(repoName);
    expect(dispatchSpy).toHaveBeenCalledWith(actions.dispatchGithubReposSpy());
    await timeout(500);
    props.dispatchClearGithubRepos();
    expect(dispatchSpy).toHaveBeenCalledWith(actions.dispatchClearGithubReposSpy());
  });
});
