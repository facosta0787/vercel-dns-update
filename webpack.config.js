const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const RenamePlugin = require('./lib/rename-webpack-plugin')

module.exports = {
  mode: 'production',
  target: 'node16.16',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'dns-update.js'
  },
  optimization: {
    minimize: true,
    minimizer: [ new TerserPlugin({ extractComments: false }) ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    new RenamePlugin({ originNameReg: /dns-update.js/gi, targetName: 'dns-update' }),
  ]
}