import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Text from '@components/Text';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  selectHomeContainer,
  selectReposData,
  selectReposError,
  selectRepoName
} from './selectors';
import reducer, { homeContainerCreators } from './reducer';
import saga from './saga';
const { Search } = Input;
const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
const Button = styled.button`
  && {
    display: flex;
    align-self: flex-end;
  }
`;
export function HomeContainer({
  dipatchGithubRepos,
  intl,
  reposData = {},
  reposError = null,
  repoName,
  history
}) {
  useInjectReducer({ key: 'homeContainer', reducer });
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);
  const [inputRepoName, setInputRepoName] = useState(null);
  const [test, settest] = useState(false);

  useEffect(() => {
    const loaded = _.get(reposData, 'items', null) || reposError;
    if (loading && loaded) {
      setLoading(false);
    }
  });
  const handleOnChange = rName => {
    if (rName) {
      dipatchGithubRepos(rName);
      setLoading(true);
      settest(false);
    }
  };
  const customHandleOnChange = inputRepoNameSearch => {
    if (inputRepoNameSearch) {
      dipatchGithubRepos(inputRepoNameSearch);
      setLoading(true);
      settest(true);
    }
  };
  const debouncedHandleOnChange = _.debounce(handleOnChange, 200);
  const IamfeelingLucky = _.debounce(customHandleOnChange, 200);
  const renderRepoList = () => {
    const items = _.get(reposData, 'items', []);
    const totalCount = _.get(reposData, 'totalCount', 0);

    return (
      (items.length || loading) && (
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
            {test ? (
              <div>
                {totalCount >= 1 && (
                  <CustomCard>
                    <div>Repository Name: {items[0].name}</div>
                    <div>Repository Full Name: {items[0].fullName}</div>
                    <div>Repository stars: {items[0].stargazersCount}</div>
                  </CustomCard>
                )}
              </div>
            ) : (
              <div>
                {items.map((item, index) => (
                  <CustomCard key={index}>
                    <div>Repository Name: {item.name}</div>
                    <div>Repository Full Name: {item.fullName}</div>
                    <div>Repository stars: {item.stargazersCount}</div>
                  </CustomCard>
                ))}
              </div>
            )}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (reposError) {
      repoError = reposError;
    } else if (!_.get(reposData, 'totalCount', 0)) {
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
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };
  return (
    <Container>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard
        title={intl.formatMessage({ id: 'Repository Search' })}
        maxwidth={500}
      >
        <Text margin={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={repoName}
          type="text"
          onChange={evt => setInputRepoName(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
        <Button
          onClick={() => IamfeelingLucky(inputRepoName)}
          data-testid="submit-bar"
        >
          <Text id="I'm feeling Lucky" type="text" />
        </Button>
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}
HomeContainer.propTypes = {
  dipatchGithubRepos: PropTypes.func,
  intl: PropTypes.object,
  reposData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  reposError: PropTypes.object,
  repoName: PropTypes.string,
  history: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  reposData: selectReposData(),
  reposError: selectReposError(),
  repoName: selectRepoName()
});
function mapDispatchToProps(dispatch) {
  const { requestGetGithubRepos } = homeContainerCreators;
  return {
    dipatchGithubRepos: repoName => dispatch(requestGetGithubRepos(repoName))
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  injectIntl,
  withConnect,
  memo,
  withRouter
)(HomeContainer);
export const HomeContainerTest = compose(injectIntl)(HomeContainer);
