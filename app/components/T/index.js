/**
 *
 * T
 *
 */

import React, { memo } from 'react';
import styled from '@emotion/styled';
import { Trans } from '@lingui/macro';
import { PropTypes } from 'prop-types';
import If from '@components/If';
import { fonts } from '@app/themes';

const StyledText = styled.p`
  && {
    ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};
    ${(props) => props.font()};
  }
`;
const getFontStyle = (type) => fonts.style[type] || (() => '');

export const T = ({ type, text, id, marginBottom, values, ...otherProps }) => (
  <StyledText data-testid="t" font={getFontStyle(type)} marginBottom={marginBottom} {...otherProps}>
    <If condition={id} otherwise={text}>
      <Trans id={id} values={values} />
    </If>
  </StyledText>
);

T.propTypes = {
  id: PropTypes.string,
  marginBottom: PropTypes.number,
  values: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(fonts.style))
};

T.defaultProps = {
  values: {},
  type: 'standard'
};

const TextComponent = memo(T);
export default TextComponent;
