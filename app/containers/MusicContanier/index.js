import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import { selectMusicContainer, selectMusicsData, selectMusicsError, selectMusicTitle } from './selectors';
import { MusicContainerCreators } from './reducer';
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
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function MusicContainer({
  dispatchGithubRepos,
  dispatchClearGithubRepos,
  intl,
  reposData = {},
  musicsError = null,
  musicTitle,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'MusicContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(reposData, 'items', null) || musicsError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [reposData]);

  useEffect(() => {
    if (musicTitle && !reposData?.items?.length) {
      dispatchGithubRepos(musicTitle);
      setLoading(true);
    }
  }, []);

  const history = useHistory();

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
            {musicTitle && (
              <div>
                <T id="search_query" values={{ musicTitle }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_repos" values={{ totalCount }} />
              </div>
            )}
            {items.map((item, index) => (
              <CustomCard key={index}>
                <T id="repository_name" values={{ name: item.name }} />
                <T id="repository_full_name" values={{ fullName: item.fullName }} />
                <T id="repository_stars" values={{ stars: item.stargazersCount }} />
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (musicsError) {
      repoError = musicsError;
    } else if (!get(reposData, 'totalCount', 0)) {
      repoError = 'respo_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard color={musicsError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'repo_list' })}>
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
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard title={intl.formatMessage({ id: 'repo_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={musicTitle}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
          enterButton
        />
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

MusicContainer.propTypes = {
  dispatchGithubRepos: PropTypes.func,
  dispatchClearGithubRepos: PropTypes.func,
  intl: PropTypes.object,
  reposData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  musicsError: PropTypes.string,
  musicTitle: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

MusicContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  MusicContainer: selectMusicContainer(),
  musicsData: selectMusicsData(),
  musicsError: selectMusicsError(),
  musicTitle: selectMusicTitle()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItunesMusics, clearItunesMusics } = MusicContainerCreators;

  return {
    dispatchItunesMusics: musicTitle => dispatch(requestGetItunesMusics(musicTitle)),
    dispatchClearItunesMusics: () => dispatch(clearItunesMusics())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(MusicContainer);

export const MusicContainerTest = compose(injectIntl)(MusicContainer);
