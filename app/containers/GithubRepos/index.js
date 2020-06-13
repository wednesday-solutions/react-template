import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Card, Input, Skeleton } from 'antd';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import T from '@components/T';
import {
  selectReposData,
  selectReposError,
  selectRepoName
} from '../HomeContainer/selectors';
import { homeContainerCreators } from '../HomeContainer/reducer';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;

function GithubRepos({
  maxwidth,
  intl,
  repoName,
  reposData = {},
  reposError = null,
  dispatchGithubRepos,
  dispatchClearGithubRepos
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(reposData, 'items', null) || reposError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [reposData]);

  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
      dispatchGithubRepos(rName);
      setLoading(true);
    } else {
      dispatchClearGithubRepos();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(reposData, 'items', []);
    const totalCount = get(reposData, 'totalCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {repoName && (
              <div>
                <T id="search_query" values={{ repoName }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_repos" values={{ totalCount }} />
              </div>
            )}
            {items.map((item, index) => (
              <CustomCard key={index}>
                <div>Repository Name: {item.name}</div>
                <div>Repository Full Name: {item.fullName}</div>
                <div>Repository stars: {item.stargazersCount}</div>
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };

  const renderErrorState = () => {
    let repoError;
    if (reposError) {
      repoError = reposError;
    } else if (!get(reposData, 'totalCount', 0)) {
      repoError = 'respo_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard
          color={reposError ? 'red' : 'grey'}
          title={intl.formatMessage({ id: 'repo_list' })}
        >
          <T id={repoError} />
        </CustomCard>
      )
    );
  };

  return (
    <>
      <CustomCard
        title={intl.formatMessage({ id: 'repo_search' })}
        maxwidth={maxwidth}
      >
        <T marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={repoName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  reposData: selectReposData(),
  reposError: selectReposError(),
  repoName: selectRepoName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetGithubRepos, clearGithubRepos } = homeContainerCreators;
  return {
    dispatchGithubRepos: repoName => dispatch(requestGetGithubRepos(repoName)),
    dispatchClearGithubRepos: () => dispatch(clearGithubRepos())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

GithubRepos.propTypes = {
  maxwidth: PropTypes.number,
  dispatchGithubRepos: PropTypes.func,
  dispatchClearGithubRepos: PropTypes.func,
  intl: PropTypes.object,
  reposData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  reposError: PropTypes.object,
  repoName: PropTypes.string
};

export default compose(
  injectIntl,
  withConnect,
  memo
)(GithubRepos);

export const GithubReposTest = compose(injectIntl)(GithubRepos);
