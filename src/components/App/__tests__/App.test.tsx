import renderer from 'react-test-renderer'
import React from 'react'
import { jest } from '@jest/globals'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fab)

const MOCK_FEED = {
  items: [
    {
      id: 'https://blog.kochie.io/articles/02-contact-tracing',
      url: 'https://blog.kochie.io/articles/02-contact-tracing',
      title: 'Building a Contact Tracing Platform',
      summary:
        "Learn how to automate and build an application to trace exposures using Amazon's Cloud Development Kit (CDK)",
      image:
        'https://blog.kochie.io/articles-1/02-contact-tracing/omar-flores-MOO6k3RaiwE-unsplash.jpg',
      date_modified: '2021-08-22T23:00:00.000Z',
      author: {
        name: 'Robert Koch',
        url: 'https://blog.kochie.io/authors/kochie',
      },
    },
  ],
}

describe('app', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(MOCK_FEED),
      })
    ) as unknown as typeof fetch
  })

  afterAll(() => {
    // @ts-expect-error - cleanup mocked global
    delete global.fetch
  })

  it('app renders correctly', async () => {
    const App = await import('../App')
    const tree = renderer.create(<App.default />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
