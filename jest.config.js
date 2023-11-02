// jest.config.js
import nextJest from 'next/jest.js'
import { inspect } from 'util'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  // testEnvironmentOptions: {

  // },

  setupFiles: [
    '<rootDir>/jest/jest.setup.js',
    '<rootDir>/jest/fa.setup.js',
    // '<rootDir>/jest/swr.setup.js',
  ],
  moduleNameMapper: {
    '^@/components/(.*)': '<rootDir>/src/components/$1',
    // '@mdx-js/react': '<rootDir>/jest/esm.mapper.js',
    // '^.+\\.mdx?$': "<rootDir>/jest/mdx-mock.cjs",
  },
  transform: {
    '^.+\\.mdx?$': [
      '<rootDir>/jest/mdx-jest.mjs',
      {
        supportsDynamicImport: true,
        supportsExportNamespaceFrom: true,
        supportsStaticESM: true,
      },
    ],
    // '^.+\\.(js|jsx|ts|tsx|mjs)$': null,
    '\\.tsx?$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.tsx'],
}

console.log(
  inspect(await createJestConfig(customJestConfig)(), { depth: null })
)

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig)
