import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Card, Col, Row } from 'antd';
const AmountCardContent = styled(Card)`
  width: 300px;
  height: 300px;

  padding: 119px 40px 33px;
  border-radius: 4px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.16);
  margin: 100px;
`;
const AmountCol = styled(Col)`
  margin: 30px;
`;
export default function AmountCard() {
  return (
    <Row>
      <AmountCol>
        <AmountCardContent>
          <Row>
            <Col>
              <h2>In Time</h2>
            </Col>
            <h2>In Time</h2>
          </Row>
          <p>Card content</p>
          <p>Card content</p>
        </AmountCardContent>
      </AmountCol>
      <AmountCol>
        <AmountCardContent>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </AmountCardContent>
      </AmountCol>{' '}
    </Row>
  );
}
