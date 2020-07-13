/**
 *
 * ITunesContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import makeSelectITunesContainer from './selectors';
import saga from './saga';

export function ITunesContainer() {
  useInjectSaga({ key: 'iTunesContainer', saga });

  return (
    <div>
      <Helmet>
        <title>ITunesContainer</title>
        <meta name="description" content="Description of ITunesContainer" />
      </Helmet>
      <T id={'ITunesContainer'} />
    </div>
  );
}

ITunesContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  iTunesContainer: makeSelectITunesContainer()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ITunesContainer);

export const ITunesContainerTest = compose(injectIntl)(ITunesContainer);
