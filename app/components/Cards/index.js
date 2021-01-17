/**
 *
 * Cards
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types'

import { FormattedMessage as T } from 'react-intl';

function Cards() {
  return (
    <div data-testid="cards">
      <T id={'cards'} />
      cards.map {}
    </div>
  );
}

Cards.propTypes = {};

export default memo(Cards);
