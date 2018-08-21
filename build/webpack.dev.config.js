const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')
const utils = require('./utils')

const { resolve } = path

const ROOT_PATH = resolve(__dirname, '..')
const SRC_PATH = resolve(ROOT_PATH, 'src')

module.exports = {
  output: {
    filename: '[name].bundle.js'
  },
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    publicPath: '/',
    contentBase: resolve(ROOT_PATH, 'dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    open: true,
    overlay: true,
    proxy: { // 处理跨域问题
      '/proxy/*': {
        target: require('./config/dev-api-root.js'),
        pathRewrite: {
          '^/proxy': ''
        },
        changeOrigin: true,
        secure: false
      }
    }
  },
}