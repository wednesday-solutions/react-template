/**
 *
 * Header
 *
 */

import React from 'react';
// import PropTypes from 'prop-types'
// import styled from 'styled-components'

import { FormattedMessage as T } from 'react-intl';

function Header() {
  return (
    <div data-testid="header">
      <T id={'header'} />
    </div>
  );
}

Header.propTypes = {};

export default Header;
