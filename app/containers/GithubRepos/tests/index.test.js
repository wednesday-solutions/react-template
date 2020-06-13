/**
 *
 * Tests for GithubRepos
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { GithubReposTest as GithubRepos } from '../../GithubRepos';

describe('<GithubRepos /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <GithubRepos dispatchGithubRepos={submitSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearGithubRepos on empty change', async () => {
    const getGithubReposSpy = jest.fn();
    const clearGithubReposSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <GithubRepos
        dispatchClearGithubRepos={clearGithubReposSpy}
        dispatchGithubRepos={getGithubReposSpy}
      />
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
    const { getByTestId } = renderProvider(
      <GithubRepos dispatchGithubRepos={submitSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
