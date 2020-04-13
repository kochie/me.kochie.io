const mdx = require("@mdx-js/mdx");
const babel = require("@babel/core");

module.exports = {
    process(src) {
        // Convert .MDX file into JSX
        const rawJSX = mdx.sync(src);
    
        // Inject React and MDXTag imports
        const injectedJSX =
        `/* @jsx mdx */
        import React from 'react'
        import { mdx } from '@mdx-js/react'
        ${rawJSX}
        `
    
        // Transform ES6 with babel
        const babelRes = babel.transform(injectedJSX, {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        }).code;
    
        return babelRes;
    }
}