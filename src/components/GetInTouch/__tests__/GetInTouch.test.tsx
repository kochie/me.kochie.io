import renderer from 'react-test-renderer'
import React from 'react'

import GetInTouch from '../'

it('footer renders correctly', () => {
  const tree = renderer.create(<GetInTouch />).toJSON()
  expect(tree).toMatchSnapshot()
})
