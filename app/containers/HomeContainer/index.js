import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import { selectHomeContainer } from './selectors';
import saga from './saga';
import GithubReposContainer from '../GithubRepos/Loadable';
import ItunesSongsContainer from '../ItunesSongs/Loadable';

const Container = styled.div`
  && {
    display: flex;
    justify-content: space-evenly;
  }
`;

const StorybookLink = styled.div`
  display: flex;
  justify-content: center;
`;

export function HomeContainer({ maxwidth, padding, intl }) {
  const history = useHistory();
  useInjectSaga({ key: 'homeContainer', saga });

  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };

  const subContainerProps = {
    maxwidth,
    intl,
    padding
  };

  return (
    <>
      <StorybookLink>
        <Clickable textId="stories" onClick={refreshPage} />
      </StorybookLink>
      <Container>
        <GithubReposContainer {...subContainerProps} />
        <ItunesSongsContainer {...subContainerProps} />
      </Container>
    </>
  );
}

HomeContainer.propTypes = {
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  intl: PropTypes.object
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer()
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
  memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
