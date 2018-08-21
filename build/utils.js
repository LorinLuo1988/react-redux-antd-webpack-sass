const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { resolve } = path
const ROOT_PATH = resolve(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

/**
 * 获取antd的自定义主题less变量
 * @param  {Object|String} theme less变量
 * @return {Object} theme less变量
 */
const getAntdTheme = theme => {  
  if (!theme) {
    return {}
  }

  if (typeof(theme) === 'object') {
    return theme
  }

  if (typeof(theme) === 'string') {
    // 如果是文件路径
    if (theme.charAt(0) === '.') {
      themePath = resolve(ROOT_PATH, theme)
    }

    return require(themePath)
  }
}

/**
 * 同步判断文件是否存在
 * @param  {String} path 文件路径
 * @return {Boolean} true|false
 */
const fsExistsSync = path => {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch(e){
    return false
  }

  return true
}

/**
 * 创建dev-api-root.js文件
 * @param  {String} path wev-api-root.js路径
 * @return {undefined} undefined
 */
const createDevApiRoot = path => {
  fs.writeFileSync(
    path,
    `const DEV_API_ROOT = 'http://127.0.0.1:8080'

module.exports = DEV_API_ROOT
    `,
    {encoding: 'utf-8'}
  )
}

/**
 * 样式（css，less，sass）loader工厂函数
 * @param  {String}  happypackId happypack的id
 * @return {String|Array} 样式loader
 */
const styleLoaderFactory = (happypackId) => {
  return isDev ? `happypack/loader?id=${happypackId}` : [
    MiniCssExtractPlugin.loader,
    `happypack/loader?id=${happypackId}`
  ]
}

module.exports = {
  getAntdTheme,
  fsExistsSync,
  createDevApiRoot,
  styleLoaderFactory
}