/**
 *
 * Card
 *
 */

import { Card as AntCard } from 'antd';
import React from 'react';
import styled from 'styled-components';

const CustomCard = styled(AntCard)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;

const Card = (props) => <CustomCard data-testid="card" {...props} />;

Card.propTypes = {};

export default Card;
