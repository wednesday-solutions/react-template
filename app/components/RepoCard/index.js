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

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
  }
`;

export function RepoCard({ name, fullName, stargazersCount }) {
  return (
    <CustomCard data-testid="repo-card">
      <T id="repository_name" values={{ name: name }} />
      <T id="repository_full_name" values={{ fullName: fullName }} />
      <T id="repository_stars" values={{ stars: stargazersCount }} />
    </CustomCard>
  );
}

RepoCard.propTypes = {
  name: PropTypes.string,
  fullName: PropTypes.string,
  stargazersCount: PropTypes.number
};

export default RepoCard;
