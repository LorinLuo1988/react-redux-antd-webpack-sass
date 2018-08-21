const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const happypackFactory = require('./happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const { resolve } = path
const { getAntdTheme, fsExistsSync, createDevApiRoot, styleLoaderFactory } = utils

const ROOT_PATH = resolve(__dirname, '..')
const SRC_PATH = resolve(ROOT_PATH, 'src')
const STATIC_PATH = resolve(SRC_PATH, 'static')
const DEV_API_ROOT_PATH = resolve(ROOT_PATH, './build/config/dev-api-root.js')
const pkg = require(resolve(ROOT_PATH, 'package.json'))
const dllBundleConfig = require(resolve(STATIC_PATH, `dll/${NODE_ENV}/bundle-config.json`))

const commonConfig = {
  entry: {
    index: [
      'react-hot-loader/patch',
      'babel-polyfill',
      resolve(SRC_PATH, 'entry/index.jsx')
    ]
  },
  output: {
    path: resolve(ROOT_PATH, 'dist'),
    chunkFilename: '[name].[chunkhash].bundle.js',
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
        test: /\.css$/,
        include: [
          resolve(ROOT_PATH, 'node_modules'),
          resolve(SRC_PATH, 'styles')
        ],
        use: styleLoaderFactory('css')
      },
      {
        test: /\.css$/,
        // 除去node_modules和src/styles下面的css文件，其他css文件均进行css modules
        exclude: [
          resolve(ROOT_PATH, 'node_modules'),
          resolve(SRC_PATH, 'styles')
        ],
        use: styleLoaderFactory('cssModules')
      },
      {
        test: /\.scss$/,
        // 除去node_modules和src/styles下面的less文件，其他less文件均进行css modules
        exclude: [
          path.resolve(ROOT_PATH, 'node_modules'),
          path.resolve(ROOT_PATH, 'src/styles')
        ],
        use: styleLoaderFactory('scssModules')
      },
      {
        test: /.scss$/,
        include: path.resolve(ROOT_PATH, 'src/styles'),
        use: styleLoaderFactory('scss')
      },
      {
        test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192, // 将小于8192byte的图片转换成base64编码
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff|svg|eot|ttf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192 // 将小于8192byte的字体转换成base64编码
        }
      }
    ]
  },
  plugins: [
    happypackFactory('eslint'),
    happypackFactory('babel'),
    happypackFactory('css'),
    happypackFactory('cssModules'),
    happypackFactory('scss'),
    happypackFactory('scssModules'),
    new CopyWebpackPlugin([
      {
        from: path.resolve(SRC_PATH, 'static'),
        to: path.resolve(ROOT_PATH, 'dist/static')
      }
    ]),
    new webpack.DllReferencePlugin({
      manifest: resolve(STATIC_PATH, `dll/${NODE_ENV}/vendor-manifest.json`)
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve(STATIC_PATH, `dll/${NODE_ENV}/react-manifest.json`)
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve(STATIC_PATH, `dll/${NODE_ENV}/antd-manifest.json`)
    }),
    new HtmlWebpackPlugin({
      favicon: resolve(SRC_PATH, 'favicon.ico'),
      template: resolve(SRC_PATH, 'html/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      // 把带hash的dll文件路径插入到html中
      paths: {
        vendor: {
          js: `${NODE_ENV}/${dllBundleConfig.vendor.js}`,
          css: `${NODE_ENV}/${dllBundleConfig.vendor.css}`
        },
        react: `${NODE_ENV}/${dllBundleConfig.react.js}`,
        antd: {
          js: `${NODE_ENV}/${dllBundleConfig.antd.js}`,
          css: `${NODE_ENV}/${dllBundleConfig.antd.css}`
        }
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
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

// 如果沒有dev-api-root.js，则新建该文件
if (!fsExistsSync(DEV_API_ROOT_PATH)) {
  createDevApiRoot(DEV_API_ROOT_PATH)
}

// 是否要启动bundle分析
if (process.env.npm_config_analyzer) {
  commonConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackMerge(
  commonConfig,
  require(`./webpack.${NODE_ENV === 'development' ? 'dev' : 'prod'}.config.js`)
)