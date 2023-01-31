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
import If from '@components/If';
import isEmpty from 'lodash/isEmpty';

const CustomCard = styled(Card)`
  && {
    margin: 1rem 0;
    padding: 1rem;
  }
`;

export function RepoCard({ name, fullName, stargazersCount }) {
  return (
    <CustomCard data-testid="repo-card">
      <If condition={!isEmpty(name)} otherwise={<T data-testid="name-unavailable" id="repo_name_unavailable" />}>
        <T data-testid="name" id="repository_name" values={{ name: name }} />
      </If>
      <If
        condition={!isEmpty(fullName)}
        otherwise={<T data-testid="fullName-unavailable" id="repo_full_name_unavailable" />}
      >
        <T data-testid="fullName" id="repository_full_name" values={{ fullName: fullName }} />
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
