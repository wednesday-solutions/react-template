/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <HomeContainer dipatchGithubRepos={submitSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dipatchGithubRepos on change', async () => {
    const { getByTestId } = renderProvider(
      <HomeContainer dipatchGithubRepos={submitSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toMatchSnapshot();
  });

  it('should call dipatchGithubRepos on submit', async () => {
    const { getByTestId } = renderProvider(
      <HomeContainer dipatchGithubRepos={submitSpy} />
    );
    fireEvent.click(getByTestId('submit-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toMatchSnapshot();
  });

  it('should call dipatchGithubRepos on search', async () => {
    const { getByTestId } = renderProvider(
      <HomeContainer dipatchGithubRepos={submitSpy} />
    );
    fireEvent.keyDown(getByTestId('search-bar'), { key: 'Enter', keyCode: 13 });
    await timeout(1000);
    expect(submitSpy).toBeCalled();
  });
});
