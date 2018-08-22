import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

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

export default RouteWrapper