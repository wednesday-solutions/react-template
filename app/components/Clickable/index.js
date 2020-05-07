/**
 *
 * Clickable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import T from '@components/T';

const StyledClickable = styled.div`
  color: #1890ff;
  &:hover {
    cursor: pointer;
  }
`;
function Clickable({ onClick, textId }) {
  return (
    <StyledClickable data-testid="clickable" onClick={onClick}>
      {textId && <T id={textId} />}
    </StyledClickable>
  );
}

Clickable.propTypes = {
  onClick: PropTypes.func.isRequired,
  textId: PropTypes.string.isRequired
};

export default Clickable;
