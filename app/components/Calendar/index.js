/**
 *
 * Calendar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types'
import styled from 'styled-components';
// import { FormattedMessage as T } from 'react-intl';
import 'antd/dist/antd.css';
import { Calendar, Badge } from 'antd';

const CalendarDiv = styled.div`
  width: 1000px;
  margin: 30px;
  padding: 10px;
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
function CalendarComponent() {
  return (
    <div data-testid="calendar">
      <CalendarDiv>
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
      </CalendarDiv>
    </div>
  );
}

Calendar.propTypes = {};

export default memo(CalendarComponent);
