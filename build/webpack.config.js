const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const happypackFactory = require('./happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { resolve } = path
const { getAntdTheme } = utils

const NODE_ENV = process.env.NODE_ENV
const webpackNodeEnvConfig = require(`./webpack.${NODE_ENV === 'development' ? 'dev' : 'prod'}.config.js`)
const ROOT_PATH = resolve(__dirname, '..')
const SRC_PATH = resolve(ROOT_PATH, 'src')
const pkg = require(resolve(ROOT_PATH, 'package.json'))
const isDev = NODE_ENV === 'development'

const commonConfig = {
  entry: {
    index: ['babel-polyfill', resolve(SRC_PATH, 'entry/index.jsx')]
  },
  output: {
    path: resolve(ROOT_PATH, 'dist'),
    chunkFilename: '[name].[chunkHash].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre', //防止eslint在代码检查前，代码被其他loader修改
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=eslint'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=babel'
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: isDev ? 'happypack/loader?id=lessAntd' : [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=lessAntd'
        ]
      },
      {
        test: /\.css$/,
        use: isDev ? 'happypack/loader?id=css' : [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=css'
        ]
      }
    ]
  },
  plugins: [
    happypackFactory('eslint'),
    happypackFactory('babel'),
    happypackFactory('lessAntd'),
    happypackFactory('css'),
    new HtmlWebpackPlugin({
      favicon: resolve(SRC_PATH, 'favicon.ico'),
      template: resolve(SRC_PATH, 'html/index.html'),
      filename: 'index.html',
      chunks: ['index']
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.css', '.json'],
    alias: {
      '@': SRC_PATH,
      '@root': ROOT_PATH,
      '@components': resolve(SRC_PATH, 'components'),
      '@containers': resolve(SRC_PATH, 'containers'),
      '@services': resolve(SRC_PATH, 'services'),
      '@constants': resolve(SRC_PATH, 'constants'),
      '@utils': resolve(SRC_PATH, 'utils'),
      '@styles': resolve(SRC_PATH, 'styles'),
      '@imgs': resolve(SRC_PATH, 'imgs'),
      '@redux': resolve(SRC_PATH, 'redux'),
      '@config': resolve(SRC_PATH, 'config'),
      '@decorator': resolve(SRC_PATH, 'decorator'),
      '@mock': resolve(SRC_PATH, 'mock')
    }
  }
}

module.exports = webpackMerge(
  commonConfig,
  webpackNodeEnvConfig
)