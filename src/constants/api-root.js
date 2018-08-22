const API_ROOT = {
  dev: `${location.origin}/proxy`, // dev开发环境由webpack-dev-server进行后台转发，避免跨域问题
  mock: 'http://127.0.0.1:8080',
  test: 'http://10.1.12.18:8081',
  prod: 'https://chatbots.remarkfin.com/api'
}

export default API_ROOT