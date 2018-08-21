const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const happypackFactory = require('./happypack')

const { resolve } = path
const ROOT_PATH = resolve(__dirname, '../')
const STATIC_PATH = resolve(ROOT_PATH, 'src/static')
const NODE_ENV = process.env.NODE_ENV
const isDev = NODE_ENV === 'development'

const entry = {
  vendor: [
    'axios',
    'babel-polyfill',
    'history'
  ],
  react: [
    'react',
    'react-dom',
    'react-router',
    'prop-types',
    'react-router-dom',
    'react-redux',
    'redux',
    'redux-saga'
  ],
  antd: [
    'antd',
    'antd/lib/locale-provider/zh_CN',
    'antd/dist/antd.less'
  ]
}

const plugins = [
  new CleanWebpackPlugin(
    [`dist/dll/${NODE_ENV}`],
    {root: resolve(__dirname, '../')}
  ),
  new webpack.DllPlugin({
    path: resolve(STATIC_PATH, `dll/${NODE_ENV}/[name]-manifest.json`),
    name: isDev ? '[name]_Library' : '[name]_[chunkHash]_Library' // dll bundle 输出到哪个全局变量上, 和 output.library 一样即可。
  }),
  // 生成dll打包文件名与entry对应表
  new AssetsPlugin({
    filename: 'bundle-config.json', 
    path: resolve(STATIC_PATH, `dll/${NODE_ENV}`)
  }),
  happypackFactory('babel'),
  happypackFactory('lessAntd'),
  happypackFactory('css')
]

const rules = [
  {
    test: /\.jsx?$/,
    use: 'happypack/loader?id=babel'
  },
  {
    test: /\.less$/,
    include: resolve(ROOT_PATH, 'node_modules/antd'),
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

if (NODE_ENV === 'production') {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css'
    }),
    new webpack.HashedModuleIdsPlugin(), // 使用hash作为模块的命名，防止新加入模块后，缓存模块的chunkHash变化，导致缓存失效
  )
}

// 是否要启动bundle分析
if (process.env.npm_config_analyzer) {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  entry,
  output: {
    path: resolve(STATIC_PATH, `dll/${NODE_ENV}`),
    filename: isDev ? 'dll.[name].js' : 'dll.[name].[chunkHash].js',
    library: isDev ? '[name]_Library' : '[name]_[chunkHash]_Library' // 将会定义为 window.${output.library}
  },
  plugins,
  module: {
    rules
  }
}