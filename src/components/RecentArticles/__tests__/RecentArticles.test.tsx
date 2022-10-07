import { act, create, ReactTestRenderer } from 'react-test-renderer'
import * as React from 'react'
import { jest } from '@jest/globals'
// import RecentArticles from '../RecentArticles'
// import { SWRConfig } from 'swr'

// global.fetch = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve(MOCK_DATA)
// }));

describe('Recent Articles', () => {
  const MOCK_DATA = {
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

  beforeAll(async () => {
    jest.unstable_mockModule('swr', () => {
      // console.log('mock')
      return {
        default: jest.fn(() => ({
          data: MOCK_DATA,
          error: null,
        })),
      }
    })

    await import('swr')
  })

  it('recent articles renders correctly', async () => {
    const RecentArticles = await import('../RecentArticles')
    let tree: ReactTestRenderer

    tree = create(<RecentArticles.default />)

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
