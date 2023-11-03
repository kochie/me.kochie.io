// import { createTransformer } from 'babel-jest';
import { compileSync } from '@mdx-js/mdx';
import { transformSync } from "@babel/core";
// import {inspect} from "util"
// import path from 'path';

// import {require} from 'module'

export default {
  process(sourceText, sourcePath, options) {
    // console.log("HELLO")
    const code = compileSync(sourceText, {
      recmaPlugins: [() => ({ Compiler: import('estree-to-babel') })],
    });

    const result = transformSync(code.value, {
      presets: [['@babel/preset-env', { modules: 'cjs' }]],
      plugins: ['add-module-exports']
    })

    // console.log(result)

    return result

    
    // console.log(inspect(result, false, null));
    // return {
    //   code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    // };
  },

  async processAsync(sourceText, sourcePath) {
    const code = await compile(sourceText, {
      recmaPlugins: [() => ({ Compiler: import('estree-to-babel') })],
    });

    const result = await transform(code.value, {
      presets: [['@babel/preset-env', { modules: 'commonjs' }]],
      plugins: ['add-module-exports']
    })

    return result
  }
};

