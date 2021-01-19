/**
 *
 * Calendar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage as T } from 'react-intl';
import 'antd/dist/antd.css';
import { Calendar, Badge, Row } from 'antd';
import verified from '@images/ic-verified.svg';
import calendarimage from '@images/ic-calendar.svg';

const MainSection = styled.div`
  display: inline-block;
  .CalendarDiv {
    width: 900px;
    margin: 30px;
    padding: 10px;
    float: left;
  }
  .ListDiv {
    float: right;
    margin-top: 45px;
    .HeadingOne {
      width: 36px;
      height: 10px;
      margin-top: 5px;
      font-family: Inter;
      font-size: 8px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: 0.08px;
      text-align: center;
      color: #777777;
    }
    .HeadingTwo {
      height: 10px;
      margin-top: 5px;
      margin-left: 65px;
      font-family: Inter;
      font-size: 8px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: 0.08px;
      color: #777777;
    }
    .HeadingThree {
      height: 10px;
      margin-top: 5px;
      margin-left: 160px;
      font-family: Inter;
      font-size: 8px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.25;
      letter-spacing: 0.08px;
      text-align: center;
      color: #777777;
    }
    .FirstList {
      width: 450px;
      height: 56px;
      margin-top: 15px;
      padding: 11px 24px 10px 16px;
      border-radius: 4px;
      background-color: white;
      .DueDate {
        width: 32px;
        height: 35px;
        margin: 0 30px 0 0;
        opacity: 1;
        font-family: Inter;
        font-size: 12px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.25;
        letter-spacing: 0.12px;
        text-align: center;
        color: #dd2c00;
      }
      .JuneDate {
        width: 32px;
        height: 35px;
        margin: 0 30px 0 0;
        opacity: 1;
        font-family: Inter;
        font-size: 12px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.25;
        letter-spacing: 0.12px;
        text-align: center;
        color: #f09e39;
      }
      .JulyDate {
        width: 32px;
        height: 35px;
        margin: 0 30px 0 0;
        opacity: 1;
        font-family: Inter;
        font-size: 12px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.25;
        letter-spacing: 0.12px;
        text-align: center;
        color: #039482;
      }
      .Electricity {
        font-family: Inter;
        margin: 5px 5px;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.25;
        letter-spacing: 0.16px;
        text-align: center;
        color: #1a2940;
      }
      .Amount {
        height: 20px;
        font-family: Inter;
        margin-top: 4px;
        margin-left: 120px;
        font-size: 13px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.25;
        letter-spacing: 0.16px;
        text-align: center;
        color: #1a2940;
      }
      .Image {
        object-fit: contain;
        margin-left: 50px;
      }
      .TotalSpan {
        width: 60px;
        height: 40px;
        opacity: 0.5;
        margin-top: 5px;
        font-family: Inter;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.25;
        letter-spacing: 0.96px;
        text-align: left;
        color: #222222;
      }
      .TotalAmount {
        width: 94px;
        height: 29px;
        margin-top: 5px;
        margin-left: 200px;
        font-family: Inter;
        font-size: 18px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 0.75;
        letter-spacing: normal;
        text-align: center;
        color: #1a2940;
      }
    }
  }
`;

const DateList = styled.li``;
function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' }
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' }
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' }
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <DateList key={item.content}>
          <Badge className="BadgeCal" status={item.type} text={item.content} />
        </DateList>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}
function CalendarComponent({ dashData }) {
  return (
    <MainSection data-testid="calendar">
      <div className="CalendarDiv">
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
      </div>
      <div className="ListDiv">
        <T id="date" values={{ date: dashData.date }} />
        <Row>
          <span className="HeadingOne">
            <T id="due_date" />
          </span>
          <span className="HeadingTwo">
            <T id="recipient" />
          </span>
          <span className="HeadingThree">
            <T id="amount" />
          </span>
          <span className="HeadingTwo">
            <T id="status" />
          </span>
        </Row>
        <div className="FirstList">
          <Row>
            <span className="DueDate">
              <T id="due" values={{ due: dashData.due }} />
            </span>
            <span className="Electricity">
              <T id="electricity_bill" />
            </span>
            <span className="Amount">
              <T id="amount_money" values={{ amount: dashData.amount }} />
            </span>
            <span className="Image">
              <img src={verified} />
            </span>
          </Row>
        </div>
        <div className="FirstList">
          <Row>
            <span className="JuneDate">
              <T id="due" values={{ due: dashData.june }} />
            </span>
            <span className="Electricity">
              <T id="electricity_bill" />
            </span>
            <span className="Amount">
              <T id="amount_money" values={{ amount: dashData.amount }} />
            </span>
            <span className="Image">
              <img src={verified} />
            </span>
          </Row>
        </div>
        <div className="FirstList">
          <Row>
            <span className="JulyDate">
              <T id="due" values={{ due: dashData.june }} />
            </span>
            <span className="Electricity">
              <T id="electricity_bill" />
            </span>
            <span className="Amount">
              <T id="amount_money" values={{ amount: dashData.amount }} />
            </span>
            <span className="Image">
              <img src={calendarimage} />
            </span>
          </Row>
        </div>
        <div className="FirstList">
          <span className="TotalSpan">
            <T id="total_amount" />
          </span>
          <span className="TotalAmount">
            <T id="total" values={{ total: dashData.total }} />
          </span>
        </div>
      </div>
    </MainSection>
  );
}

CalendarComponent.propTypes = {
  dashData: PropTypes.object
};

export default memo(CalendarComponent);
