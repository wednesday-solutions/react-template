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

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 30px;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;

export function HomeContainer({ maxwidth, padding }) {
  const history = useHistory();
  useInjectSaga({ key: 'homeContainer', saga });

  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };

  return (
    <>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <Container maxwidth={maxwidth} padding={padding}>
        <GithubReposContainer maxwidth={maxwidth} />
      </Container>
    </>
  );
}

HomeContainer.propTypes = {
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
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
  withConnect,
  memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
