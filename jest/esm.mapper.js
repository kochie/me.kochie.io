const babel = require('@babel/core')

const babelRes = babel.transformFileSync(
  'node_modules/@mdx-js/react/index.js',
  {
    presets: ['next/babel'],
  }
).code

eval(babelRes.code)
