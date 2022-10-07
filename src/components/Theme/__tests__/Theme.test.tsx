import React from 'react'
import { ReactTestRenderer, act, create } from 'react-test-renderer'
import { jest } from '@jest/globals'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faLightbulbOn,
  faLightbulbSlash,
  faCogs,
} from '@fortawesome/pro-duotone-svg-icons'

beforeAll(() => {
  library.add(faLightbulbSlash, faLightbulbOn, faCogs)

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

describe('THEME COMPONENT', () => {
  test('should render', async () => {
    const ThemeButton = await import('../ThemeButton')
    let tree: ReactTestRenderer

    act(() => {
      tree = create(<ThemeButton.default />)
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})

describe('THEMEPROVIDER COMPONENT', () => {
  test('renders correctly', async () => {
    const ThemeProvider = await import('../context')

    let tree: ReactTestRenderer

    act(() => {
      tree = create(<ThemeProvider.ThemeProvider />)
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
