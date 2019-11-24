const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
  setupFiles: ['<rootDir>/jest/jest.setup.js', '<rootDir>/jest/fa.setup.js'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    "^.+\\.mdx?$": "<rootDir>/jest/mdx-jest.js"
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|svg|webp)$": "<rootDir>/jest/image-mock.js",
    "^.+\\.css?$": "<rootDir>/node_modules/jest-css-modules"
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: false
}