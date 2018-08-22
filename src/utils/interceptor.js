import axios from 'axios'
import { message } from 'antd'
import store from '@/store'
import { updateLoadingAction } from '@/redux/common'

/**
 * 请求拦截器
 * @param {Boolean} res.config.showMessage 响应成功后是否显示全局message
 * @param {Boolean} res.config.successMsg 响应成功显示的全局message
 * @param {Boolean} res.config.errorMsg 响应失败显示的全局message
 * @param {Boolean} res.config.hideErrorMsg 是否隐藏相应失败的message
 * @param {Boolean} res.config.showLoading 响应结束后是否关闭全局loading图标
 * @param {Boolean} res.config.loadingMsg 加载中提示文字
 */
axios.interceptors.request.use(
  config => {
    const token = store.getState().loginReducer.token
    
    if (config.showLoading === true) {
      config.hideLoading = message.loading(config.loadingMsg || '正在加载中...', 0)
      store.dispatch(updateLoadingAction(true))
    }

    // 登陆成功后，每次异步请求都会将token放在header请求头
    if (token) {
      config.headers.token = token
    }

    return config
  },
  err => {
    console.log(err)
    message.warning('请求失败')
    return Promise.reject(err)
  }
)

/**
 * 响应拦截器
 * 参数同请求拦截器
 */
axios.interceptors.response.use(
  res => {
    const { data, config } = res
    const messageDuration = config.messageDuration || 2500
    const successMsg = config.successMsg || data.msg
    const errorMsg = config.errorMsg || data.msg
    const showMessage =config.showMessage
    const hideErrorMsg =config.hideErrorMsg
    
    if (config.showLoading === true) {
      config.hideLoading()
      store.dispatch(updateLoadingAction(false))
    }

    if (!data.ok) {
      !hideErrorMsg && errorMsg && message.warning(errorMsg, messageDuration)

      data.errorMsg = errorMsg
      return Promise.reject(data)
    }

    if (data.code === 200) {
      showMessage && successMsg && message.success(successMsg)
    } else {
      !hideErrorMsg && errorMsg && message.warning(errorMsg, messageDuration)
      return Promise.reject(data)
    }

    return data
  },
  err => {
    const { response, config } = err
    const sysErr = '系统错误'
    const errorMsg = config && config.errorMsg || (response && response.data && response.data.msg) || sysErr
    
    if (config && config.showLoading) {
      config.hideLoading()
      store.dispatch(updateLoadingAction(false))
    }
    
    if (!config.hideErrorMsg && (!response || response && response.status !== 401) && errorMsg ) {
      message.warning(errorMsg)
    }

    return Promise.reject(err)
  }
)
