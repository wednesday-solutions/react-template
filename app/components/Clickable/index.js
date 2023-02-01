/**
 *
 * Clickable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import T from '@components/T';
import * as colors from '@app/themes/colors';

const StyledClickable = styled.div`
  color: ${colors.text};
  &:hover {
    cursor: pointer;
  }
`;
export function Clickable({ onClick, textId }) {
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
