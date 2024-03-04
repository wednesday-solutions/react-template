/**
 *
 * RepoCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Card } from '@mui/material';
import T from '@components/T';
import { If } from '@components/If';
import isEmpty from 'lodash/isEmpty';

const CustomCard = styled(Card)`
  && {
    margin: 1rem 0;
    padding: 1rem;
  }
`;

/**
 * RepoCard component that displays information about a GitHub repository.
 * It shows the repository's name, full name, and star count.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the repository.
 * @param {string} props.fullName - The full name of the repository.
 * @param {number} props.stargazersCount - The number of stars the repository has.
 * @returns {JSX.Element} The RepoCard component displaying the repository information.
 */
export function RepoCard({ name, fullName, stargazersCount }) {
  return (
    <CustomCard data-testid="repo-card">
      <If condition={!isEmpty(name)} otherwise={<T data-testid="name-unavailable" id="repo_name_unavailable" />}>
        <T data-testid="name" id="repository_name" values={{ name }} />
      </If>
      <If
        condition={!isEmpty(fullName)}
        otherwise={<T data-testid="fullName-unavailable" id="repo_full_name_unavailable" />}
      >
        <T data-testid="fullName" id="repository_full_name" values={{ fullName }} />
      </If>
      <If condition={stargazersCount} otherwise={<T data-testid="stargazers-unavaiable" id="repo_stars_unavailable" />}>
        <T data-testid="stargazers" id="repository_stars" values={{ stars: stargazersCount }} />
      </If>
    </CustomCard>
  );
}

RepoCard.propTypes = {
  name: PropTypes.string,
  fullName: PropTypes.string,
  stargazersCount: PropTypes.number
};

export default RepoCard;
