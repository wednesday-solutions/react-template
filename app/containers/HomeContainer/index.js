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
    hieght: 10;
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
  const [text, setText] = useState('');

  useEffect(() => {
    // Effects will be called instead of componentDidMount, componentDidUpdate, componentWillRecieveProps
    // This effect will be called for every render.
    const loaded = _.get(reposData, 'items', null) || reposError;
    if (loading && loaded) {
      setLoading(false);
    }
  });

  const handleOnChange = rName => {
    if (rName) {
      dipatchGithubRepos(rName);
      setLoading(true);
    }
  };

  const customHandleOnChange = rName => {
    if (rName) {
      setText(rName);
      dipatchGithubRepos(rName);
    }
  };

  const debouncedHandleOnChange = _.debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = _.get(reposData, 'items', []);
    const totalCount = _.get(reposData, 'totalCount', 0);

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

            {/* {totalCount >= 1 && (
            <CustomCard >
                <div>Repository Name: {items[0].name}</div>
                <div>Repository Full Name: {items[0].fullName}</div>
                <div>Repository stars: {items[0].stargazersCount}</div>
              </CustomCard>
            )} */}
          </Skeleton>
        </CustomCard>
      )
    );
  };

  const customRenderRepoList = () => {
    const items = _.get(reposData, 'items', []);
    const totalCount = _.get(reposData, 'totalCount', 0);
    //  console.log(items);
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

            {totalCount >= 1 && (
              <CustomCard>
                <div>Repository Name: {items[0].name}</div>
                <div>Repository Full Name: {items[0].fullName}</div>
                <div>Repository stars: {items[0].stargazersCount}</div>
              </CustomCard>
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

  const feelingLucky = _.debounce(customHandleOnChange, 200);

  return (
    <Container>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard
        title={intl.formatMessage({ id: 'repo_search' })}
        maxwidth={500}
      >
        <Text marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={repoName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>

      <CustomCard
        title={intl.formatMessage({ id: 'custom_repo_search' })}
        maxwidth={500}
      >
        <Text marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={repoName}
          type="text"
          onChange={evt => setText(evt.target.value)}
          onSearch={searchText => setText(searchText)}
          // onSearch={searchText => debouncedHandleOnChange(searchText)}
        />

        <Button
          style={{ width: 407, paddingLeft: 150, marginTop: 20 }}
          onClick={() => feelingLucky(text)}
        >
          I am feeling lucky
        </Button>
      </CustomCard>

      {renderRepoList()}
      {customRenderRepoList()}
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
