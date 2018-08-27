import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router, Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import { connect } from 'react-redux'
import { MainLayout } from './layout'
import { updateRouterMenuAction } from '@redux/common'
import { findParentsByKey } from '@utils'
import router from '@/router'
import { createBrowserHistory } from 'history'

// 将history实例放到window上面，便于在js代码里面进行路由控制
window.$history = createBrowserHistory({})

const mapStateToProps = state => {
  return {
    selectedKeys: state.commonReducer.selectedKeys,
    router: state.commonReducer.router
  }
}

const mapActionToProps = dispatch => ({
  updateRouterMenuAction: payload => dispatch(updateRouterMenuAction(payload))
})

@connect(mapStateToProps, mapActionToProps)
@autobind
class Root extends Component {
  static propTypes = {
    updateRouterMenuAction: PropTypes.func.isRequired,
    selectedKeys: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired
  }
  state = {
    layout: MainLayout
  }
  constructor (props) {
    super(props)
    this.listenerRouterChange()
  }
  switchLayout (layout = MainLayout) {
    this.setState({layout})
  }
  listenerRouterChange () {
    window.$history.listen(this.handleRouterChange)
  }
  updateRouterMenu () {
    const router = this.props.router
    const selectedKeys = [window.$history && window.$history.location.pathname]
    const openKeys = findParentsByKey(window.$history && window.$history.location.pathname, router, 'path') || []
    
    this.props.updateRouterMenuAction({
      openKeys,
      selectedKeys
    })
  }
  handleRouterChange ({ pathname }) {
    if (!this.props.selectedKeys.includes(pathname)) {
      this.props.updateRouterMenuAction({
        selectedKeys: [pathname]
      })
    }
  }
  render () {
    const Layout = this.state.layout
    
    return (
      <Router history={window.$history}>
        <Route path="/">
          <Layout>
            { router }
          </Layout>
        </Route>
      </Router>
    )
  }
  componentDidMount () {
    this.updateRouterMenu()
  }
}

export default Root