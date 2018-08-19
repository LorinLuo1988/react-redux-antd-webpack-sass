const path = require('path')

const { resolve } = path
const ROOT_PATH = resolve(__dirname, '..')

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

module.exports = {
  getAntdTheme
}