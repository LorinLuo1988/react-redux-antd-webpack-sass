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
    progress: true,
    hot: true,
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        mock: process.env.npm_config_mock || false
      }
    })
  ]
}