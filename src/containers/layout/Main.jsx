import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import {
  Avator,
  RightActions,
  RouterMenu
} from '@components/layout/main'

const { Header, Content, Sider } = Layout

class MainLayout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }
  render () {
    return (
      <Layout className="main-layout">
        <Header className="header">
          <div className="pull-left">
            <Avator />
          </div>
          <div className="pull-right">
            <RightActions />
          </div>
        </Header>
        <Layout className="content-layout">
          <Sider className="sider">
            <RouterMenu />
          </Sider>
          <Layout className="content">
            <Content style={{ position: 'relative' }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}


export default MainLayout