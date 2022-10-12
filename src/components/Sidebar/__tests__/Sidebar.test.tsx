import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'
import { jest } from '@jest/globals'

import Sidebar from '../Sidebar'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

describe('Sidebar Component', () => {
  beforeAll(() => {
    library.add(fab)
  })

  beforeEach(() => {
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb) => cb(1))
  })

  afterEach(() => {
    window.requestAnimationFrame.mockRestore()
  })

  it('sidebar renders correctly', () => {
    let tree: ReactTestRenderer

    act(() => {
      tree = create(<Sidebar />, {
        createNodeMock: (element) => {
          if (element.type === 'canvas') {
            // mock a focus function
            return {
              focus: () => {},
            }
          }
          return null
        },
      })
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('image onload starts parallax', () => {
    let tree: ReactTestRenderer
    let imageOnload = null

    Object.defineProperty(Image.prototype, 'onload', {
      get: function () {
        return this._onload
      },
      set: function (fn) {
        imageOnload = fn
        this._onload = fn
      },
    })

    act(() => {
      tree = create(<Sidebar />)
    })

    expect(tree.toJSON()).toMatchSnapshot()

    act(() => {
      imageOnload()
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('unmounts', () => {
    let tree: ReactTestRenderer

    act(() => {
      tree = create(<Sidebar />)
    })

    expect(tree.toJSON()).toMatchSnapshot()

    act(() => {
      tree.unmount()
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
