/**
 *
 * Tests for Text
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import 'jest-dom/extend-expect' // add some helpful assertions

import Text from '../index'

Enzyme.configure({ adapter: new Adapter() })

describe('<Text />', () => {
  it('Should render and match the snapshot', () => {
    const component = shallow(<Text />)
    expect(component).toMatchSnapshot()
  })
})
