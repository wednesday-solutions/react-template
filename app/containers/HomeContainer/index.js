import React, { useEffect, memo, useState, useMemo } from 'react';
import get from 'lodash/get';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import { injectSaga } from 'redux-injectors';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import T from '@components/T';
import If from '@components/If';
import colors from '@app/themes/colors';
import { selectReposData, selectReposError, selectRepoName } from './selectors';
import { requestGetGithubRepos, clearGithubRepos } from './reducer';
import homeContainerSaga from './saga';
import Repos from '@components/Repos';
import ErrorCard from '@components/ErrorCard';
import Card from '@components/Card';

const { Search } = Input;

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
  data,
  error,
  repo,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loaded = get(data, 'items', null) || error;
    if (loaded) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (repo && !data?.items?.length) {
      dispatchGithubRepos(repo);
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

  const debouncedHandleOnChange = useMemo(() => debounce(handleOnChange, 200), []);

  const handleStoriesClick = () => {
    history.push('/stories');
    window.location.reload();
  };

  const handleChange = (event) => debouncedHandleOnChange(event.target.value);
  const handleSearch = (searchText) => debouncedHandleOnChange(searchText);

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <StyledT onClick={handleStoriesClick} data-testid="redirect" id="stories" />
      </RightContent>
      <Card title={intl.formatMessage({ id: 'repo_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={repo}
          type="text"
          onChange={handleChange}
          onSearch={handleSearch}
        />
      </Card>
      <Repos loading={loading} data={data} repo={repo} />
      <If condition={!loading}>
        <ErrorCard error={error} />
      </If>
    </Container>
  );
}

const ReposShape = PropTypes.shape({
  totalCount: PropTypes.number,
  incompleteResults: PropTypes.bool,
  items: PropTypes.array
});

HomeContainer.propTypes = {
  dispatchGithubRepos: PropTypes.func,
  dispatchClearGithubRepos: PropTypes.func,
  intl: PropTypes.object,
  data: ReposShape,
  error: PropTypes.string,
  repo: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  data: null,
  error: null
};

const mapStateToProps = createStructuredSelector({
  repo: selectRepoName(),
  data: selectReposData(),
  error: selectReposError()
});

export function mapDispatchToProps(dispatch) {
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
