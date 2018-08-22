import React, { PureComponent } from 'react'
import { autobind } from 'core-decorators'
import { connect } from 'react-redux'
import { MainLayout } from './layout'
import { updateRouterMenuAction } from '@redux/common'

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
  state = {
    layout: MainLayout
  }
  switchLayout (layout = MainLayout) {
    this.setState({layout})
  }
  render () {
    const Layout = this.state.layout
    
    return (
      <Layout>
        ddd
      </Layout>
    )
  }
}

export default Root