/**
 *
 * ErrorMessage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { Result, Button } from 'antd';

import { FormattedMessage as T, injectIntl } from 'react-intl';

function ErrorMessage({ intl: { formatMessage } }) {
  return (
    <div data-testid="error-message">
      <Result
        status="warning"
        title={formatMessage({ id: 'error_message' })}
        extra={
          <Button type="primary" key="console">
            <T id="reload" />
          </Button>
        }
      />
    </div>
  );
}

export default injectIntl(ErrorMessage);
