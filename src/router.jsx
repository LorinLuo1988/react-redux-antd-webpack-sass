import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { PageRouterSwitchProgress, AsyncLoadComponent } from '@/components/common'

const wrapperComponent = Component => (
  PageRouterSwitchProgress(AsyncLoadComponent(Component))
)

// 首页
const Home = wrapperComponent(() => import('@containers/Home'))

// 设置
const Setting = wrapperComponent(() => import('@containers/Setting'))

const routes = {
  path: '/',
  children: [
    {
      path: '/home',
      title: '主页',
      component: Home,
      icon: 'home'
    },
    {
      path: '/setting',
      title: '设置',
      component: Setting,
      icon: 'setting'
    }    
  ]
}

const RouteWrapper = ({ routes = [] }) => {
  const routers = routes.map(route => (
    <Route
      key={route.path}
      path={route.path}
      render={
        props => (
          <route.component routes={route.children} {...props} />
        )
      }
      exact={!(route.children && route.children.length)}
      strict={true}>
    </Route>
  ))

  return routes.length ? (
    <Switch>
      {routers}
      <Redirect to={routes[0].path}/>
    </Switch>
  ) : null
}

RouteWrapper.propTypes = {
  routes: PropTypes.array.isRequired
}

export {
  routes
}

export default <RouteWrapper routes={routes.children || []}></RouteWrapper>