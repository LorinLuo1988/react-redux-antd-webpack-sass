const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  output: {
    filename: '[name].[chunkHash].bundle.js'
  },
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.HashedModuleIdsPlugin(), // 使用hash作为模块的命名，防止新加入模块后，缓存模块的chunkHash变化，导致缓存失效
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      exclude: ['dll']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkHash].css',
      chunkFilename: '[name].[chunkHash].css'
    })
  ]
}

