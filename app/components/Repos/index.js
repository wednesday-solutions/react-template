/**
 *
 * Repos
 *
 */

import Card from '@components/Card';
import For from '@components/For';
import If from '@components/If';
import RepoCard from '@components/RepoCard';
import { Skeleton } from 'antd';
import { get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage as T } from 'react-intl';
import styled from 'styled-components';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;

const Repos = ({ data, loading, repo }) => {
  const items = get(data, 'items', []);
  const totalCount = get(data, 'totalCount', 0);

  return (
    <If condition={!isEmpty(items) || loading}>
      <Card data-testid="repos">
        <Skeleton loading={loading} active>
          <If condition={!isEmpty(repo)}>
            <div>
              <T id="search_query" values={{ repoName: repo }} />
            </div>
          </If>
          <If condition={totalCount !== 0}>
            <div>
              <T id="matching_repos" values={{ totalCount }} />
            </div>
          </If>
          <>
            <For
              of={items}
              ParentComponent={Container}
              renderItem={(item, index) => <RepoCard key={index} name={item.name} />}
            />
          </>
        </Skeleton>
      </Card>
    </If>
  );
};

const ReposShape = PropTypes.shape({
  totalCount: PropTypes.number,
  incompleteResults: PropTypes.bool,
  items: PropTypes.array
});

Repos.propTypes = {
  repo: PropTypes.string,
  data: ReposShape,
  loading: PropTypes.bool
};

export default Repos;
