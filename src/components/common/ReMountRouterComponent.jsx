import React from 'react'
import PropTypes from 'prop-types'

/**
 * 该组件仅仅用于路由组件，从当前路由导航到当前路由时，重新挂载路由组件
 * @param  {React.Component} WrappedComponent
 * @return {React.Component} 
 */
const ReMountRouterComponent = (WrappedComponent) => {
  class ReMountRouterComponent extends React.PureComponent {
    static propTypes = {
      location: PropTypes.object.isRequired
    }
    constructor (props) {
      super(props)
      this.state = {
        display: true
      }
    }
    reload () {
      this.setState({display: false})
      setTimeout(() => this.setState({display: true}), 0)
    }
    getDerivedStateFromProps (nextProps) {
      if (nextProps.location.pathname === location.pathname) {
        this.reload()
      }

      return null
    }
    render () {
      return this.state.display ? <WrappedComponent {...this.props}></WrappedComponent> : <div></div>
    }
  }

  return ReMountRouterComponent
}

export default ReMountRouterComponent