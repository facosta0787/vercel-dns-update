const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  target: 'node12',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'dns-update'
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
  ],
  node: {
    global: true
  },
}