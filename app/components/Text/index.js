/**
 *
 * Text
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { PropTypes } from 'prop-types';
import If from '@components/If';

const StyledText = styled.p`
  && {
    ${props => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};
  }
`;
export const Text = ({ text, id, marginBottom, values, ...otherProps }) => (
  <StyledText data-testid="text" marginBottom={marginBottom} {...otherProps}>
    <If condition={id} otherwise={text}>
      <FormattedMessage id={id} values={values} />
    </If>
  </StyledText>
);

Text.propTypes = {
  id: PropTypes.string,
  marginBottom: PropTypes.number,
  values: PropTypes.object,
  text: PropTypes.string
};

Text.defaultProps = {
  values: {}
};

const TextComponent = memo(Text);
export default TextComponent;
