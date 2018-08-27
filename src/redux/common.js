import { createReducer } from '@/utils/redux'
import { routes } from '@/router'
import {
  UPDATE_LOADING,
  UPDATE_ROUTER_MENU
} from '@/constants/action-name'

function stateFactory () {
  return {
    loading: false, // 全局loading图标
    openKeys: [], // 当前展开的 SubMenu 菜单项 key 数组
    selectedKeys: [], // 当前选中的菜单项 key 数组
    router: routes || []
  }
}

// action
export const updateLoadingAction = (loading = false) => ({
  type: UPDATE_LOADING,
  payload: loading
})

/**
 * 更新路由菜单
 * @param  {Object} payload
 * @param  {Array} payload.openKeys
 * @param  {Array} payload.selectedKeys
 * @return {Object}
 */
export const updateRouterMenuAction = (payload = {}) => ({
  type: UPDATE_ROUTER_MENU,
  payload
})

// reducer
const loadingReducer = (state, action) => ({
  ...state,
  loading: action.payload
})

const routerMenuReducer = (state, action) => ({
  ...state,
  ...action.payload
})

export const commonReducer = createReducer(stateFactory(), {
  [UPDATE_LOADING]: loadingReducer,
  [UPDATE_ROUTER_MENU]: routerMenuReducer
})