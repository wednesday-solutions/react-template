import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Card, Col, Row } from 'antd';
import invoice from '@images/ic-invoices-added.svg';
import bank from '@images/bank-default.svg';
import verified from '@images/ic-verified.svg';
import error from '@images/ic-error.svg';
import payments from '@images/ic-upcoming-payments.svg';
const IconCard = styled(Card)`
  width: 300px;
  height: 120px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
`;
const Title = styled.h3`
  color: #1a2930;
  font-family: Inter;
  font-weight: 500;
  font-style: normal;
`;
const Heading = styled.h4`
  color: gray;
`;
const Link = styled.a`
  font-size: 10px;
  text-decoration: underline;
`;

export default function CardComponent() {
  return (
    <div className="site-card-wrapper">
      <Row gutter={20}>
        <Col span={4}>
          <IconCard>
            <Row>
              <Col>
                <img src={invoice} />
              </Col>
              <Col>
                <Title>2345</Title>
                <Heading>INVOICES ADDED</Heading>
                <Link href="#">ADD INVOICE </Link>
              </Col>
            </Row>
          </IconCard>
        </Col>
        <Col span={4} style={{ marginLeft: 50 }}>
          <IconCard>
            {' '}
            <Row>
              <Col>
                <img src={bank} />
              </Col>
              <Col>
                <Title>05</Title>
                <Heading>BANK ACCOUNT ADDED</Heading>
                <Link href="#">ADD BANK ACCOUNT</Link>
              </Col>
            </Row>
          </IconCard>
        </Col>
        <Col span={4} style={{ marginLeft: 50 }}>
          <IconCard>
            {' '}
            <Row>
              <Col>
                <img src={verified} />
              </Col>
              <Col>
                <Title>15</Title>
                <Heading>UNVERIFIED INVOICES</Heading>
                <Link href="#">VERIFY INVOICE </Link>
              </Col>
            </Row>
          </IconCard>
        </Col>
        <Col span={4} style={{ marginLeft: 50 }}>
          <IconCard>
            {' '}
            <Row>
              <Col>
                <img src={error} />
              </Col>
              <Col>
                <Title>03</Title>
                <Heading>TRANSACTIONS FAILED</Heading>
                <Link href="#">VIEW DETAILS</Link>
              </Col>
            </Row>
          </IconCard>
        </Col>
        <Col span={4} style={{ marginLeft: 50 }}>
          <IconCard>
            {' '}
            <Row>
              <Col>
                <img src={payments} />
              </Col>
              <Col>
                <Title>$2345.39</Title>
                <Heading>UPCOMING PAYMENT</Heading>
                <Link href="#">VIEW INVOICE </Link>
              </Col>
            </Row>
          </IconCard>
        </Col>
      </Row>
    </div>
  );
}
