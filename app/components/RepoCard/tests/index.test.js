/**
 *
 * Tests for RepoCard
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import RepoCard from '../index';
import { translate } from '@app/components/IntlGlobalProvider/index';

describe('<RepoCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<RepoCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 RepoCard component', () => {
    const { getAllByTestId } = renderWithIntl(<RepoCard />);
    expect(getAllByTestId('repo-card').length).toBe(1);
  });

  it('should render the repository details inside the card', () => {
    const repoName = 'react-template';
    const fullName = 'wednesday-solutions/react-template';
    const stargazersCount = 200;
    const { getByTestId } = renderWithIntl(
      <RepoCard name={repoName} fullName={fullName} stargazersCount={stargazersCount} />
    );
    expect(getByTestId('name')).toHaveTextContent(repoName);
    expect(getByTestId('fullName')).toHaveTextContent(fullName);
    expect(getByTestId('stargazers')).toHaveTextContent(stargazersCount);
  });

  it('should render the repository unavailable messages in case any props are unavailable or have falsy values', () => {
    const repoUnavailable = translate('repo_name_unavailable');
    const fullNameUnavailable = translate('repo_full_name_unavailable');
    const stargazersUnavailable = translate('repo_stars_unavailable');
    const { getByTestId } = renderWithIntl(<RepoCard />);
    expect(getByTestId('name-unavailable')).toHaveTextContent(repoUnavailable);
    expect(getByTestId('fullName-unavailable')).toHaveTextContent(fullNameUnavailable);
    expect(getByTestId('stargazers-unavaiable')).toHaveTextContent(stargazersUnavailable);
  });
});
