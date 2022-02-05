/**
 *
 * ErrorCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import If from '@components/If';
import Card from '@components/Card';
import { IntlShape } from '@utils';
import { T } from '@components/T';

const ErrorCard = ({ error, intl }) => {
  return (
    <Card data-testid="error-card" color={error ? 'red' : 'grey'} title={intl.formatMessage({ id: 'repo_list' })}>
      <If condition={error} otherwise={<T data-testid="default-message" id={error || 'repo_search_default'} />}>
        <T data-testid="error-message" text={error} />
      </If>
    </Card>
  );
};

ErrorCard.propTypes = { error: PropTypes.string, intl: IntlShape };

export default injectIntl(ErrorCard);
