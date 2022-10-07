// import { expect } from '@jest/globals'
// import '@testing-library/jest-dom/extend-expect'
// import '@testing-library/jest-dom'

process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: ['me.kochie.io', 'cdn-images-1.medium.com'],
    path: '/_next/image',
    loader: 'default',
  },
}

// export {}
