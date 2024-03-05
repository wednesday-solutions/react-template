import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import styled from '@emotion/styled';
import { injectSaga } from 'redux-injectors';
import { Card, IconButton, Skeleton, InputAdornment, OutlinedInput, CardHeader, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import { If } from '@components/If';
import { For } from '@components/For';
import { RepoCard } from '@components/RepoCard';
import colors from '@app/themes/colors';
import { selectLoading, selectReposData, selectReposError, selectRepoName } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';
import { translate } from '@app/utils';

const CustomCard = styled(Card)`
  && {
    margin: 1.25rem 0;
    padding: 1rem;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const CustomCardHeader = styled(CardHeader)`
  && {
    padding: 0;
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

/**
 * HomeContainer component that handles the logic for searching and displaying GitHub repositories.
 * It includes input handling, loading state management, and rendering of the repository list or error state.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} props - The component props.
 * @param {Function} props.dispatchGithubRepos - Function to dispatch the action for fetching GitHub repositories.
 * @param {Function} props.dispatchClearGithubRepos - Function to dispatch the action for clearing the GitHub repositories data.
 * @param {Object} props.reposData - The data of the repositories fetched.
 * @param {Object} props.reposError - The error object if there is an error fetching the repositories.
 * @param {string} props.repoName - The name of the repository to search for.
 * @param {string} props.maxwidth - The maximum width of the component.
 * @param {string} props.padding - The padding of the component.
 * @returns {JSX.Element} The HomeContainer component.
 */
export function HomeContainer({
  dispatchGithubRepos,
  dispatchClearGithubRepos,
  reposData,
  reposError,
  repoName,
  maxwidth,
  padding,
  loading
}) {
  const history = useHistory();
  useEffect(() => {
    if (repoName && !reposData?.items?.length) {
      dispatchGithubRepos(repoName);
    }
  }, []);

  const searchRepos = (rName) => {
    dispatchGithubRepos(rName);
  };

  const handleOnChange = (rName) => {
    if (!isEmpty(rName)) {
      searchRepos(rName);
    } else {
      dispatchClearGithubRepos();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const handleStoriesClick = () => {
    history.push('/stories');
    window.location.reload();
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <StyledT onClick={handleStoriesClick} data-testid="redirect" id="stories" />
      </RightContent>
      <CustomCard maxwidth={maxwidth}>
        <CustomCardHeader title={translate('repo_search')} />
        <Divider sx={{ mb: 1.25 }} light />
        <T marginBottom={10} id="get_repo_details" />
        <StyledOutlinedInput
          inputProps={{ 'data-testid': 'search-bar' }}
          onChange={(event) => debouncedHandleOnChange(event.target.value)}
          fullWidth
          defaultValue={repoName}
          placeholder={translate('default_template')}
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
      {renderRepoList(reposData, loading, repoName)}
      {renderErrorState(repoName, loading, reposError)}
    </Container>
  );
}

const renderSkeleton = () => {
  return (
    <>
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
    </>
  );
};

const renderRepoList = (reposData, loading, repoName) => {
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

const renderErrorState = (repoName, loading, reposError) => {
  let repoError;
  let messageId;
  if (reposError) {
    repoError = reposError;
    messageId = 'error-message';
  } else if (isEmpty(repoName)) {
    repoError = 'repo_search_default';
    messageId = 'default-message';
  }

  return (
    <If condition={!loading && repoError}>
      <CustomCard color={reposError ? 'red' : 'grey'}>
        <CustomCardHeader title={translate('repo_list')} />
        <Divider sx={{ mb: 1.25 }} light />
        <T data-testid={messageId} id={repoError} text={repoError} />
      </CustomCard>
    </If>
  );
};

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
  padding: PropTypes.number,
  loading: PropTypes.bool
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  reposData: {},
  reposError: null
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  reposData: selectReposData(),
  reposError: selectReposError(),
  repoName: selectRepoName()
});

// eslint-disable-next-line require-jsdoc
export function mapDispatchToProps(dispatch) {
  const { requestGetGithubRepos, clearGithubRepos } = homeContainerCreators;
  return {
    dispatchGithubRepos: (repoName) => dispatch(requestGetGithubRepos(repoName)),
    dispatchClearGithubRepos: () => dispatch(clearGithubRepos())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'homeContainer', saga: homeContainerSaga }))(HomeContainer);

export const HomeContainerTest = compose()(HomeContainer);
