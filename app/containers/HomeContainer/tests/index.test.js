/**
 *
 * Tests for HomeContainer
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import { render } from 'react-testing-library'
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { HomeContainer } from '../index'

describe('<HomeContainer />', () => {
  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<HomeContainer />)
    expect(firstChild).toMatchSnapshot()
  })
})
