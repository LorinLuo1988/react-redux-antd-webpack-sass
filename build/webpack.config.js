var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var ROOT_PATH = path.resolve(__dirname, '..')
var SRC_PATH = path.resolve(ROOT_PATH, 'src')

module.exports = {
  entry: {
    index: [path.resolve(SRC_PATH, 'entry/index.jsx')]
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    chunkFilename: '[name].[chunkHash].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(SRC_PATH, 'favicon.ico'),
      template: path.resolve(SRC_PATH, 'html/index.html'),
      filename: 'index.html',
      chunks: ['index']
    })
  ]
}