/**
 *
 * List
 *
 */

import React from 'react';
// import PropTypes from 'prop-types'
// import styled from 'styled-components'

import { FormattedMessage as T } from 'react-intl';

function List() {
  return (
    <div data-testid="list">
      <T id={'list'} />
    </div>
  );
}

List.propTypes = {};

export default List;
