import * as renderer from 'react-test-renderer'
import * as React from 'react'

import Footer from '../Footer'

it('footer renders correctly', () => {
  const tree = renderer.create(<Footer />).toJSON()
  expect(tree).toMatchSnapshot()
})
