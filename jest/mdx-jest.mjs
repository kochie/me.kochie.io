// import { compile, compileSync } from '@mdx-js/mdx'
import babel from '@babel/core'
import { declare } from "@babel/helper-plugin-utils";

import path from 'path'
import parser from '@babel/parser'
import estreeToBabel from 'estree-to-babel'
import { compileSync } from '@mdx-js/mdx'

// export function babelPluginSyntaxMdx() {
//   // Tell Babel to use a different parser.
//   return { parserOverride: babelParserWithMdx }
// }

const babelPluginSyntaxMdx = declare(api => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );

  return {
    name: "syntax-mdx",
    parserOverride: babelParserWithMdx 
  }
})


// A Babel parser that parses MDX files with `@mdx-js/mdx` and passes any
// other things through to the normal Babel parser.
function babelParserWithMdx(value, options) {
  if (
    options.sourceFileName &&
    /\.mdx?$/.test(path.extname(options.sourceFileName))
  ) {
    // Babel does not support async parsers, unfortunately.
    return compileSync(
      { value, path: options.sourceFileName },
      // Tell `@mdx-js/mdx` to return a Babel tree instead of serialized JS.
      {
        recmaPlugins: [recmaBabel] /* jsxImportSource: …, otherOptions… */,
        // outputFormat: 'function-body',
      }
    ).value
  }

  // return parser.parse(value, options)
}

// A “recma” plugin is a unified plugin that runs on the estree (used by
// `@mdx-js/mdx` and much of the JS ecosystem but not Babel).
// This plugin defines `'estree-to-babel'` as the compiler, which means that
// the resulting Babel tree is given back by `compileSync`.
function recmaBabel() {
  Object.assign(this, { Compiler: estreeToBabel })
}

export default {
  process(sourceText, sourcePath, options) {
    const babelRes = babel.transformSync(sourceText, {
      filename: sourcePath,

      // presets: ['next/babel'],
      presets: [['@babel/preset-env', { modules: 'cjs' }]],
      plugins: ['add-module-exports', babelPluginSyntaxMdx],
    })

    return babelRes
  },

  async processAsync(sourceText, sourcePath) {
    const babelRes = babel.transformAsync(sourceText, {
      filename: sourcePath,

      presets: [['@babel/preset-env', { modules: 'commonjs' }]],
      plugins: ['add-module-exports', babelPluginSyntaxMdx],
    })

    return babelRes
  },
}
