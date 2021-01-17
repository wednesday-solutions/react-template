/**
 *
 * Navbar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Row, Col } from 'antd';

import { FormattedMessage as T } from 'react-intl';
import star from '@images/star.svg';
const HeadingDiv = styled.div`
  width: 1400px;
  height: 72px;
  margin: 20px;
  padding: 19px 32.6px 19.4px 18px;
  border-radius: 4px;
  background-color: #e8f0fd;
`;
const StarHeading = styled(T)`
  && {
    width: 446px;
    height: 21px;
    margin: 9px 1215.8px 3.6px 26px;
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
`;
function Navbar(dashName, dashData, dashError) {
  return (
    <div data-testid="navbar">
      <HeadingDiv>
        <Row>
          <Col>
            <img src={star} />
          </Col>{' '}
          <Col>
            <StarHeading id="invoices-pay" values={{ dollar: dashData.dollar }} />
          </Col>
        </Row>
      </HeadingDiv>
    </div>
  );
}

Navbar.propTypes = {};

export default memo(Navbar);
