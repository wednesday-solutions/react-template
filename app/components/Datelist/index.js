/**
 *
 * Datelist
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FormattedMessage as T } from 'react-intl';

function Datelist() {
  return <div data-testid="datelist">{/* <T id="date" values={{ date: dashData.date }} /> */}</div>;
}

Datelist.propTypes = {
  // dashData: PropTypes.object
};

export default memo(Datelist);
