import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import { DatePicker } from 'antd'

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'antd/dist/antd.less'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

// 异步请求公共配置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 50000
axios.defaults.withCredentials = true

const renderApp = () => {
  render(
    <LocaleProvider locale={zh_CN}>
      <div>
        react test
        <DatePicker />
      </div>
    </LocaleProvider>,
    document.getElementById('app')
  )
}

renderApp()