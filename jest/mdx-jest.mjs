import { compile, compileSync } from '@mdx-js/mdx'
import babel from '@babel/core'

export default {
  process(sourceText) {
    const rawJSX = compileSync(sourceText)

    // Inject React and MDXTag imports
    const injectedJSX = `/* @jsx mdx */
        import React from 'react'
        import { mdx } from '@mdx-js/react'
        ${rawJSX}
        `

    // Transform ES6 with babel
    const babelRes = babel.transform(injectedJSX, {
      presets: ['next/babel'],
    })

    // console.log(babelRes)
    return { code: babelRes.code }
  },

  async processAsync(sourceText, sourcePath, options) {
    // Convert .MDX file into JSX
    // console.log('src', src)
    const rawJSX = await compile(sourceText)

    // Inject React and MDXTag imports
    const injectedJSX = `/* @jsx mdx */
        import React from 'react'
        import { mdx } from '@mdx-js/react'
        ${rawJSX}
        `

    // Transform ES6 with babel
    const babelRes = babel.transform(injectedJSX, {
      presets: ['next/babel'],
    })

    // console.log(babelRes)
    return { code: babelRes.code }
  },
}
