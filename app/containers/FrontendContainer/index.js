/**
 *
 * FrontendContainer
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import styled from 'styled-components';
import { selectFrontendContainer, selectDashData, selectDashError, selectDashName } from './selectors';
import { frontendContainerCreators } from './reducer';
import { Row, Col } from 'antd';
import Menubar from '@components/MenubarJs';
import Navbar from '@components/Navbar';
import CalendarComponent from '@components/Calendar';
import saga from './saga';

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
export function FrontendContainer({ dispatchDashboard, dashData = {}, dashError = null, dashName, intl }) {
  useInjectSaga({ key: 'frontendContainer', saga });
  useEffect(() => {
    dispatchDashboard(dashName);
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <Menubar />
        </Col>
        <Col>
          <Navbar dashData={dashData} />

          <CalendarComponent dashData={dashData} />
        </Col>
      </Row>
    </Container>
  );
}
FrontendContainer.propTypes = {
  dispatchDashboard: PropTypes.func,
  intl: PropTypes.object,
  dashData: PropTypes.object,
  dashError: PropTypes.object,
  dashName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  frontendContainer: selectFrontendContainer(),
  dashData: selectDashData(),
  dashError: selectDashError(),
  dashName: selectDashName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetDashboard } = frontendContainerCreators;
  return {
    dispatchDashboard: dashName => dispatch(requestGetDashboard(dashName))
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
)(FrontendContainer);

export const FrontendContainerTest = compose(injectIntl)(FrontendContainer);
