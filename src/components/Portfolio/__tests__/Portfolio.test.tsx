import * as renderer from 'react-test-renderer'
import * as React from 'react'

import Portfolio from '../Portfolio'

it('portfolio renders correctly', () => {
  const tree = renderer.create(<Portfolio />).toJSON()
  expect(tree).toMatchSnapshot()
})
