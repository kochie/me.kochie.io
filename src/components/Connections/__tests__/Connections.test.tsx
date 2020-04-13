import renderer from 'react-test-renderer'
import React from 'react'

import Connections from '../Connections'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fab)

it('connections renders correctly', () => {
  const tree = renderer.create(<Connections />).toJSON()
  expect(tree).toMatchSnapshot()
})
