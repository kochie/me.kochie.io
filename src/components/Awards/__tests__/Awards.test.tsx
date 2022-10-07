import React from 'react'
import renderer from 'react-test-renderer'
import Awards from '..'

it('awards renders correctly', () => {
  const tree = renderer.create(<Awards />).toJSON()
  expect(tree).toMatchSnapshot()
})
