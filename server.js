const express = require('express')
const path = require('path')
const ROOT_PATH = path.resolve(__dirname)
const STATIC_PATH = path.resolve(ROOT_PATH, 'dist')

const app = express()

app.get('/', function(req, res) {
  res.sendFile(path.resolve(STATIC_PATH, 'index.html'))
});

app.use(express.static(STATIC_PATH)) //静态资源加载路径

app.set('port', process.env.npm_config_PORT || 3000)

app.use('*', (req, res) => { //静态资源请求不会走此路径
  res.sendFile(path.resolve(STATIC_PATH, 'index.html'));
})

const server = app.listen(app.get('port'), () => {
  console.log('server start success, port is ' + app.get('port'))
})
