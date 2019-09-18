/**
 *
 * Text
 *
 */

import React, { memo } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { PropTypes } from 'prop-types'

const StyledText = styled.div`
  && {
    ${props => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};
  }
`
function Text({ id, marginBottom }) {
  return (
    <StyledText marginBottom={marginBottom}>
      {id && <FormattedMessage id={id} />}
    </StyledText>
  )
}

Text.propTypes = {
  id: PropTypes.string.isRequired,
  marginBottom: PropTypes.number
}

const TextComponent = memo(Text)
export default TextComponent
