import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Card, Progress } from 'antd';
const PieCard = styled(Card)`
  width: 700px;
  height: 300px;
  padding: 3px 16px 28px 17px;
  border-radius: 8px;
  margin: 50px;
`;
const PieDiv = styled.div`
  margin: 22px 40px;
`;
const PieProgress = styled(Progress)`
  height: 1000px;
`;
export default function Pie() {
  return (
    <PieDiv>
      <PieCard>
        <PieProgress percent={100} success={{ percent: 50 }} primary={{ percent: 20 }} type="circle" />
      </PieCard>
    </PieDiv>
  );
}
