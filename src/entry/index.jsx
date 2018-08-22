import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import { Provider } from 'react-redux'

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'antd/dist/antd.less'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { AppContainer } from 'react-hot-loader'
import Root from '@/containers/Root'
import '@styles'
import store from '@/store'

// 异步请求公共配置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 50000
axios.defaults.withCredentials = true

const renderApp = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
          <Root />
        </LocaleProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

renderApp()

if (module.hot) {
  module.hot.accept(() => renderApp())
}