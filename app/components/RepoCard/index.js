/**
 *
 * RepoCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';
import T from '@components/T';
import If from '@components/If';
import { isEmpty } from 'lodash';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
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
