/**
 *
 * ItunesAppContainer
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
import makeSelectItunesAppContainer from './selectors';
import saga from './saga';

export function ItunesAppContainer() {
  useInjectSaga({ key: 'itunesAppContainer', saga });

  return (
    <div>
      <Helmet>
        <title>ItunesAppContainer</title>
        <meta name="description" content="Description of ItunesAppContainer" />
      </Helmet>
      <T id={'ItunesAppContainer'} />
    </div>
  );
}

ItunesAppContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  itunesAppContainer: makeSelectItunesAppContainer()
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

export default compose(withConnect)(ItunesAppContainer);

export const ItunesAppContainerTest = compose(injectIntl)(ItunesAppContainer);
