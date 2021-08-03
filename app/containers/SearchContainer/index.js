/**
 *
 * SearchContainer
 *
 */

import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl , FormattedMessage as T } from 'react-intl'
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import {  Input } from 'antd';

import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import makeSelectSearchContainer from './selectors'


const { Search } = Input;
export function SearchContainer() {
    const handleOnChange = artistName => {
    if (!isEmpty(artistName)) {
      // dispatching
     // console.log(artistName)
    } else {
      //dispatching
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <div>
      <Search
          data-testid="search-bar"
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
    <T id={'SearchContainer'} />
    </div>
  )
}

SearchContainer.propTypes = {
}

const mapStateToProps = createStructuredSelector({
  searchContainer: makeSelectSearchContainer(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
)(SearchContainer)

export const SearchContainerTest = compose(injectIntl)(SearchContainer)