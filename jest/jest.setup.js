// import { expect } from '@jest/globals'
// import '@testing-library/jest-dom/extend-expect'
// import '@testing-library/jest-dom'
import {jest} from '@jest/globals';
import Image from 'next/image';
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



jest.unstable_mockModule('next/image', () => (Image));

// jsdom doesn't implement matchMedia — provide a stub that reports no match
// so client effects gated on a media query (e.g. ParallaxCanvas) take the
// "skip" branch in tests.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}
