module.exports = {
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true, 
  //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parser: 'babel-eslint',
  //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  parserOptions: {
    sourceType: 'module'
  },
  //此项指定环境的全局变量
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    amd: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html和react的
  plugins: [
    'html',
    'react'
  ],
  // add your custom rules here
  // 下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
  // 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
  // "off" -> 0 关闭规则
  // "warn" -> 1 开启警告规则
  // "error" -> 2 开启错误规则
  // 了解了上面这些，下面这些代码相信也看的明白了
  rules: {
    'arrow-parens': 'off', // 要求箭头函数的参数使用圆括号
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁用 debugger
    'indent': ["error", 2], // 强制使用一致的缩进
    'no-tabs': 'off', // 禁用 tab
    'no-useless-escape': 'off', // 禁用不必要的转义字符
    'no-console': 'off', // 禁用 console
    'react/display-name': 'off'
  },
  globals: {
    API_ROOT: false,
    process: false
  }
}