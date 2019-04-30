const withTypescript = require('@zeit/next-typescript')
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
})
const withCss = require('@zeit/next-css')

module.exports = 
    withCss(
        withMDX(
            withTypescript({
    sassLoaderOptions: {
        import: true
    }
})))