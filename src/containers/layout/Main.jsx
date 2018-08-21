import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

const { Header, Content, Sider } = Layout

class MainLayout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }
  render () {
    return (
      <Layout className="main-layout">
        <Header className="header">
        </Header>
        <Layout className="content-layout">
          <Sider className="sider">
            ddd
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