import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateRouterMenuAction } from '@redux/common'

const { Item: MenuItem, SubMenu } = Menu

const mapStateToProps = state => ({
  openKeys: state.commonReducer.openKeys,
  router: state.commonReducer.router,
  selectedKeys: state.commonReducer.selectedKeys
})

const mapActionToProps = dispatch => ({
  updateRouterMenuAction: payload => dispatch(updateRouterMenuAction(payload))
})

@connect(mapStateToProps, mapActionToProps)
class RouterMenu extends React.PureComponent {
  static propTypes = {
    selectedKeys: PropTypes.array.isRequired,
    openKeys: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired,
    updateRouterMenuAction: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)

    this.routeRecursion = this.routeRecursion.bind(this)
    this.handleOpenChange = this.handleOpenChange.bind(this)
  }
  handleOpenChange ({ key }) {
    const { openKeys, updateRouterMenuAction } = this.props
    const nextOpenKeys = [...openKeys]

    if (openKeys.includes(key)) {
      nextOpenKeys.splice(nextOpenKeys.findIndex(openKey => openKey === key), 1)
    }  else {
      nextOpenKeys.push(key)
    }

    updateRouterMenuAction({openKeys: nextOpenKeys})
  }
  routeRecursion (route) {
    if (route.children && route.children.length) {
      return (
        <SubMenu
          key={route.path}
          title={(
            <span>
              <Icon type={route.icon} style={{ marginRight: 15 }} />
              { route.title }
            </span>
          )}
          onTitleClick={this.handleOpenChange}>
          {
            route.children.map(route => (
              this.routeRecursion(route)
            ))
          }
        </SubMenu>
      )
    }
    
    return (
      <MenuItem key={route.path}>
        <Link key={route.path} to={route.path}>
          <Icon type={route.icon} style={{ marginRight: 15 }} />
          {route.title}
        </Link>
      </MenuItem>
    )
  }
  render () {
    const { openKeys, selectedKeys, router } = this.props
    const MenuItems = (router.children || []).map(route => {
      return this.routeRecursion(route)
    })
    
    return (
      <Menu
        theme="dark"
        className="sider-menu"
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}>
        {MenuItems}
      </Menu>
    ) 
  }
}

export default RouterMenu