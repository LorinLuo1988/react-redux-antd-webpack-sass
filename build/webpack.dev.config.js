const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')

const { resolve } = path

const ROOT_PATH = resolve(__dirname, '..')
const SRC_PATH = resolve(ROOT_PATH, 'src')

module.exports = {
  output: {
    filename: '[name].[hash].bundle.js'
  },
  devServer: {
    port: process.env.npm_config_port || 8082,
    hot: true,
    inline: true,
    progress: true,
    contentBase: resolve(ROOT_PATH, 'dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    open: true,
    overlay: true,
    proxy: { // 处理跨域问题
      '/proxy/*': {
        target: 'http://localhost:8081',
        pathRewrite: {
          '^/proxy': ''
        },
        changeOrigin: true,
        secure: false
      }
    }
  },
}