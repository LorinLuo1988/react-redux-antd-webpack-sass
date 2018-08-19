// happypack对url-loader和file-loader支持有问题

const fs = require('fs')
const path = require('path')
const Happypack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')
const pkg = require(path.resolve(__dirname, '../package.json'))
const isDev = process.env.NODE_ENV === 'development'
const styleLoader = 'style-loader'

const cssLoader = [
  {
    loader: 'css-loader',
    options: {
      minimize: !isDev
    }
  },
  'postcss-loader'
]

const cssModulesLoader = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
      minimize: !isDev
    }
  },
  'postcss-loader'
]

const lessLoader = [
  {
    loader: 'css-loader',
    options: {
      minimize: !isDev
    }
  },
  'postcss-loader',
  'less-loader?javascriptEnabled'
]

const lessModulesLoader = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
      minimize: !isDev
    }
  },
  'postcss-loader',
  'less-loader?javascriptEnabled'
]

const lessAntdLoader = [
  {
    loader: 'css-loader',
    options: {
      minimize: !isDev
    }
  },
  'postcss-loader',
  {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true,
      modifyVars: utils.getAntdTheme(pkg.theme)
    }
  }
]

// 开发环境css less sass需要将style-loader放到happypack的第一位
if (isDev) {
  const styleLoaderContrls = [
    cssLoader,
    cssModulesLoader,
    lessLoader,
    lessModulesLoader,
    lessAntdLoader
  ]
  
  styleLoaderContrls.forEach(loader => loader.unshift(styleLoader))
}

const defaultLoaders = {
  babel: ['babel-loader?cacheDirectory'],
  eslint: ['eslint-loader'],
  css: cssLoader,
  cssModules: cssModulesLoader,
  less: lessLoader,
  lessModules: lessModulesLoader,
  lessAntd: lessAntdLoader
}

/**
 * happypack工厂函数
 * @param  {String} id 唯一标识    
 * @param  {Object} options happypack配置项
 * @param  {Array} loaderQuery loader的query数组
 * @return {Object} happypack实例   
 */
module.exports = (id = '', options = {}) => {
  if (!options.loaders || !options.loaders.length) {
    options.loaders = defaultLoaders[id]
  }
  
  return new Happypack({
    id,
    threads: 4,
    ...options
  })
}