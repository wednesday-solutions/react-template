/**
 *
 * FrontendContainer
 *
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { Card, message, Button, Space, Input, Row, Col } from 'antd';
import { selectFrontendContainer, selectDashData, selectDashError, selectDashName } from './selectors';
import { frontendContainerCreators } from './reducer';
import CardComponent from './CardComponent';
import CalendarComponent from './Calendar';
import Pie from './Pie';
import AmountCard from './AmountCard';
import saga from './saga';
const { Search } = Input;

const DetailsCard = styled(Card)`
  margin: 20px 20px;
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
const CustomDiv = styled.div`
  width: 100%;
  font-weight: bolder;
  font-size: 20px;
`;

const CustomSpace = styled(Space)`
  margin: ${props => props.margin}px;
`;
export function FrontendContainer({ dispatchDashboard, dashData = {}, dashError = null, dashName, intl }) {
  useInjectSaga({ key: 'frontendContainer', saga });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loaded = get(dashData, 'name', dashError);
    if (loading && loaded) {
      setLoading(false);
    }
  }, [dashData]);

  useEffect(() => {
    if (dashName && !dashData.main) {
      dispatchDashboard(dashName);
      setLoading(true);
    }
  }, []);
  const handleOnChange = wName => {
    if (!isEmpty(wName)) {
      dispatchDashboard(wName);
      setLoading(true);
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 400);
  const renderDashboardList = () => {
    const name = get(dashData, 'name', null);
    return (
      name && (
        <DetailsCard>
          <CustomDiv>
            <T id="city_name" values={{ name: dashData.name }} />
          </CustomDiv>
          <CustomDiv>
            <T id="city_timezone" values={{ timezone: dashData.timezone }} />
          </CustomDiv>
          <CustomDiv>
            <T id="city_temperature" values={{ temperature: dashData.main.temp }} />
          </CustomDiv>
          <CustomDiv>
            <T id="city_description" values={{ description: dashData.weather[0].description }} />
          </CustomDiv>
        </DetailsCard>
      )
    );
  };
  const renderErrorState = () => {
    const error = () => {
      message.error(intl.formatMessage({ id: 'city_error' }));
    };
    const name = get(dashData, 'name', null);
    if (dashError) {
      return (
        !loading &&
        !name && (
          <CustomSpace>
            <Button onClick={error}>Error</Button>
          </CustomSpace>
        )
      );
    }
  };

  return (
    <Container>
      <Search
        data-testid="search-bar"
        defaultValue={dashName}
        type="text"
        onChange={evt => debouncedHandleOnChange(evt.target.value)}
        onSearch={searchText => debouncedHandleOnChange(searchText)}
      />

      <CardComponent />
      <Row>
        <Col>
          <AmountCard />
        </Col>
        <Col>
          <Pie />
        </Col>
      </Row>
      <CalendarComponent />

      {renderDashboardList()}
      {renderErrorState()}
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
