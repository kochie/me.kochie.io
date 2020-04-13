import * as renderer from 'react-test-renderer'
import * as React from 'react'

import BuyMeACoffee from '../BuyMeACoffee'

it('by me a coffee renders correctly', () => {
  const tree = renderer.create(<BuyMeACoffee username="test" />).toJSON()
  expect(tree).toMatchSnapshot()
})
