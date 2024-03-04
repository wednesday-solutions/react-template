/**
 *
 * Clickable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import T from '@components/T';
import { text } from '@app/themes/colors';

const StyledClickable = styled.div`
  color: ${text};
  &:hover {
    cursor: pointer;
  }
`;

/**
 * Clickable component that renders a styled element which can be clicked.
 * Optionally displays text identified by a text ID.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The function to call when the element is clicked.
 * @param {string} [props.textId] - The ID for the text to display inside the clickable element.
 * @returns {JSX.Element} A styled clickable element, optionally containing text.
 */
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
