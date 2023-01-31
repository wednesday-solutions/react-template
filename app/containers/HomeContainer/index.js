import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import styled from '@emotion/styled';
import { injectIntl } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import { Card, IconButton, Skeleton, InputAdornment, OutlinedInput } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import If from '@components/If';
import For from '@components/For';
import RepoCard from '@components/RepoCard';
import colors from '@app/themes/colors';
import { selectReposData, selectReposError, selectRepoName } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';

const CustomCard = styled(Card)`
  && {
    margin: 1.25rem 0;
    padding: 1.25rem;
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

const StyledOutlinedInput = styled(OutlinedInput)`
  legend {
    display: none;
  }
  > fieldset {
    top: 0;
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

  const searchRepos = (rName) => {
    dispatchGithubRepos(rName);
    setLoading(true);
  };

  const handleOnChange = (rName) => {
    if (!isEmpty(rName)) {
      searchRepos(rName);
    } else {
      dispatchClearGithubRepos();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderSkeleton = () => {
    return (
      <>
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      </>
    );
  };

  const renderRepoList = () => {
    const items = get(reposData, 'items', []);
    const totalCount = get(reposData, 'totalCount', 0);
    return (
      <If condition={!isEmpty(items) || loading}>
        <CustomCard>
          <If condition={!loading} otherwise={renderSkeleton()}>
            <>
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
            </>
          </If>
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

        <StyledOutlinedInput
          inputProps={{ 'data-testid': 'search-bar' }}
          onChange={(event) => debouncedHandleOnChange(event.target.value)}
          fullWidth
          defaultValue={repoName}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="search-icon"
                aria-label="search repos"
                type="button"
                onClick={() => searchRepos(repoName)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
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
