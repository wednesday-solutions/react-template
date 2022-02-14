import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import { Card, Skeleton, Input } from 'antd';
import T from '@components/T';
import If from '@components/If';
import For from '@app/components/For';
import colors from '@app/themes/colors';
import RepoCard from '@app/components/RepoCard';
import { selectReposData, selectReposError, selectRepoName } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';
import { useHistory } from 'react-router-dom';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
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
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;

const StyledT = styled(T)`
  && {
    color: ${colors.gotoStories};
  }
`;
export function HomeContainer({
  dispatchGithubRepos,
  dispatchClearGithubRepos,
  intl,
  reposData,
  reposError,
  repoName,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loaded = get(reposData, 'items', null) || reposError;
    if (loaded) {
      setLoading(false);
    }
  }, [reposData]);

  useEffect(() => {
    if (repoName && !reposData?.items?.length) {
      dispatchGithubRepos(repoName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (rName) => {
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
      <If condition={!isEmpty(items) || loading}>
        <CustomCard>
          <Skeleton loading={loading} active>
            <If condition={!isEmpty(repoName)}>
              <div>
                <T id="search_query" values={{ repoName }} />
              </div>
            </If>
            <If condition={totalCount !== 0}>
              <div>
                <T id="matching_repos" values={{ totalCount }} />
              </div>
            </If>
            <For
              of={items}
              ParentComponent={Container}
              renderItem={(item, index) => <RepoCard key={index} {...item} />}
            />
          </Skeleton>
        </CustomCard>
      </If>
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (reposError) {
      repoError = reposError;
    } else if (isEmpty(repoName)) {
      repoError = 'repo_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard color={reposError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'repo_list' })}>
          <If condition={reposError} otherwise={<T data-testid="default-message" id={repoError} />}>
            <T data-testid="error-message" text={reposError} />
          </If>
        </CustomCard>
      )
    );
  };

  const handleStoriesClick = () => {
    history.push('/stories');
    window.location.reload();
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <StyledT onClick={handleStoriesClick} data-testid="redirect" id="stories" />
      </RightContent>
      <CustomCard title={intl.formatMessage({ id: 'repo_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={repoName}
          type="text"
          onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
          onSearch={(searchText) => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchGithubRepos: PropTypes.func,
  dispatchClearGithubRepos: PropTypes.func,
  intl: PropTypes.object,
  reposData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  reposError: PropTypes.string,
  repoName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  reposData: {},
  reposError: null
};

const mapStateToProps = createStructuredSelector({
  reposData: selectReposData(),
  reposError: selectReposError(),
  repoName: selectRepoName()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetGithubRepos, clearGithubRepos } = homeContainerCreators;
  return {
    dispatchGithubRepos: (repoName) => dispatch(requestGetGithubRepos(repoName)),
    dispatchClearGithubRepos: () => dispatch(clearGithubRepos())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'homeContainer', saga: homeContainerSaga })
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
