import React from 'react'
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'
import * as PropTypes from 'prop-types'

const PageRouterSwitchProgress = (WrappedComponent) => {
  class PageRouterSwitchProgress extends React.PureComponent {
    static propTypes = {
      history: PropTypes.object.isRequired
    }
    constructor (props) {
      Nprogress.start()
      super(props)
      
      // 将history实例放到window上面，便于在js代码里面进行路由控制
      if (!window.$history) {
        window.$history = props.history
      }
    }
    getSnapshotBeforeUpdate () {
      Nprogress.start()
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