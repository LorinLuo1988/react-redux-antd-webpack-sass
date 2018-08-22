import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { autobind } from 'core-decorators'
import { connect } from 'react-redux'
import { MainLayout } from './layout'
import { updateRouterMenuAction } from '@redux/common'
import { RouteWrapper } from '@/components/common'
import { findParentsByKey } from '@utils'

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
class Root extends PureComponent {
  static propTypes = {
    updateRouterMenuAction: PropTypes.func.isRequired,
    selectedKeys: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired
  }
  state = {
    layout: MainLayout
  }
  switchLayout (layout = MainLayout) {
    this.setState({layout})
  }
  listenerRouterChange () {
    if (this.isListenerRouterChange) {
      return false
    }

    if (window.$history) {
      this.updateRouterMenu()
      window.$history.listen(this.handleRouterChange)
      this.isListenerRouterChange = true
    }
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
    const router = this.props.router
    
    return (
      <Router>
        <Route path="/">
          <Layout>
            <RouteWrapper routes={router.children || []} />
          </Layout>
        </Route>
      </Router>
    )
  }
  componentDidUpdate () {
    this.listenerRouterChange()
  }
  componentDidMount () {
    this.listenerRouterChange()
  }
}

export default Root