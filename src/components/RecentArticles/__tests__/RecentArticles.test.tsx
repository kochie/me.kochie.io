import * as renderer from 'react-test-renderer'
import * as React from 'react'

import RecentArticles from '../RecentArticles'

it('recent articles renders correctly', async () => {
  const tree = renderer.create(<RecentArticles />)
  expect(tree.toJSON()).toMatchSnapshot()
})
