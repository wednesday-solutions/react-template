/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { translate } from '@app/components/IntlGlobalProvider';
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

  it('should  dispatchGithubRepos on update on mount if repoName is already persisted', async () => {
    const repoName = 'some repo';
    renderProvider(<HomeContainer repoName={repoName} reposData={null} dispatchGithubRepos={submitSpy} />);

    await timeout(500);
    expect(submitSpy).toBeCalledWith(repoName);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchReposSearchSpy = jest.fn();
    const repoName = 'react-template';
    const actions = {
      dispatchGithubRepos: { repoName, type: homeContainerTypes.REQUEST_GET_GITHUB_REPOS },
      dispatchClearGithubRepos: { type: homeContainerTypes.CLEAR_GITHUB_REPOS }
    };

    const props = mapDispatchToProps(dispatchReposSearchSpy);
    props.dispatchGithubRepos(repoName);
    expect(dispatchReposSearchSpy).toHaveBeenCalledWith(actions.dispatchGithubRepos);

    await timeout(500);
    props.dispatchClearGithubRepos();
    expect(dispatchReposSearchSpy).toHaveBeenCalledWith(actions.dispatchClearGithubRepos);
  });

  it('should render default error message when search goes wrong', () => {
    const defaultError = translate('something_went_wrong');
    const { getByTestId } = renderProvider(<HomeContainer reposError={defaultError} />);
    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(getByTestId('error-message').textContent).toBe(defaultError);
  });

  it('should render the default message when searchBox is empty and reposError is null', () => {
    const defaultMessage = translate('repo_search_default');
    const { getByTestId } = renderProvider(<HomeContainer />);
    expect(getByTestId('default-message')).toBeInTheDocument();
    expect(getByTestId('default-message').textContent).toBe(defaultMessage);
  });

  it('should render the data when loading becomes false', () => {
    const reposData = { items: [{ repoOne: 'react-template' }] };
    const { getByTestId } = renderProvider(<HomeContainer reposData={reposData} dispatchGithubRepos={submitSpy} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });

  it('should render exact number of RepoCards as per totalCount in result', () => {
    const totalCount = 3;
    const reposData = {
      totalCount,
      items: [
        {
          name: 'react-tempalte',
          fullName: 'wednesday-solutions/react-template',
          stargazersCount: 200
        },
        {
          name: 'react',
          fullName: 'wednesday-solutions/react',
          stargazersCount: 100
        },
        {
          name: 'react-tempalte2',
          fullName: 'wednesday-solutions/react-template2',
          stargazersCount: 300
        }
      ]
    };
    const { getAllByTestId } = renderProvider(<HomeContainer reposData={reposData} dispatchGithubRepos={submitSpy} />);
    expect(getAllByTestId('repo-card').length).toBe(totalCount);
  });
});
