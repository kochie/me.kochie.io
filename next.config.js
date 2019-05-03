const withTypescript = require('@zeit/next-typescript')
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
})
const withCss = require('@zeit/next-css')
const withOffline = require('next-offline')

const config = {}

module.exports = withOffline(withCss(withMDX(withTypescript(config))))