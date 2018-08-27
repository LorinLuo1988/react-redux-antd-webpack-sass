import React, { Component } from 'react'
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'

const PageRouterSwitchProgress = WrappedComponent => {
  class PageRouterSwitchProgress extends Component {
    constructor (props) {
      Nprogress.start()
      super(props)
    }
    getSnapshotBeforeUpdate () {
      Nprogress.start()
      return null
    }
    componentDidUpdate () {
      Nprogress.done()
    }
    componentDidMount () {
      Nprogress.done()
    }
    render () {
      return <WrappedComponent {...this.props}></WrappedComponent>
    }
  }

  return PageRouterSwitchProgress
}

export default PageRouterSwitchProgress