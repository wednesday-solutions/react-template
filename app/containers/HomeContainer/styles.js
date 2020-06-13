import styled from 'styled-components';
import { Card } from 'antd';

export const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
