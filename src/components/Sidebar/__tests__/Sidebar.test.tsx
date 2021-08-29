import React from 'react'
import renderer from 'react-test-renderer'

import Sidebar from '../Sidebar'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

beforeEach(() => {
  library.add(fab)
})

it('sidebar renders correctly', () => {
  const tree = renderer.create(<Sidebar />).toJSON()
  expect(tree).toMatchSnapshot()
})
