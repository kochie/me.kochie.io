jest.mock('swr', () => {
  return jest.fn().mockImplementation(() => {
    return {
      data: {
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
      },
    }
  })
})
