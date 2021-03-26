/**
 *
 * Navbar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage as T } from 'react-intl';
import { Col, Row } from 'antd';
import star from '@images/star.svg';
import icon from '@images/icon-notification.svg';

const MainDiv = styled.div`
  padding-top: 10px;
  .Dashboard {
    width: 188px;
    height: 20px;
    font-family: Inter;
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.67;
    letter-spacing: normal;
    text-align: center;
    margin-left: 5px;
    margin-top: 15px;
    color: #1a2940;
  }
  .ModifiedCol {
    margin-left: 1050px;
    margin-top: 20px;
  }
  .HeadingDiv {
    width: 1400px;
    height: 72px;
    margin-left: 35px;
    margin-top: 10px;
    padding: 19px 32.6px 19.4px 18px;
    border-radius: 4px;
    background-color: #e8f0fd;
    .Title {
      width: 500px;
      height: 21px;
      font-family: Inter;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.56;
      letter-spacing: normal;
      text-align: center;
      color: #222222;
    }
  }
`;

function Navbar({ dashData }) {
  return (
    <MainDiv data-testid="navbar">
      <Row>
        <span className="Dashboard">
          <T id="Dashboard" />
        </span>
        <Col className="ModifiedCol">
          <img height="30" src={icon} />
        </Col>
      </Row>
      <div className="HeadingDiv">
        <img src={star} />
        <span className="Title">
          {' '}
          <T id="invoices-pay" values={{ dollar: dashData.dollar }} />
        </span>
      </div>
    </MainDiv>
  );
}

Navbar.propTypes = {
  dashData: PropTypes.object
};

export default memo(Navbar);
