/**
 *
 * Text
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { PropTypes } from 'prop-types';

const StyledText = styled.div`
  && {
    ${props => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};
  }
`;
export const Text = ({ id, marginBottom }) => (
  <StyledText data-testid="text" marginBottom={marginBottom}>
    {id && <FormattedMessage id={id} />}
  </StyledText>
);

Text.propTypes = {
  id: PropTypes.string,
  marginBottom: PropTypes.number
};

Text.defaultProps = {
  id: 'some_text'
};

const TextComponent = memo(Text);
export default TextComponent;
