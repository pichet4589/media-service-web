import React, { useState } from 'react'
import './App.less'
import { Button, Layout, Space, } from 'antd'
import Sider from './components/sider'
import ConntentApp from './components/routes'
import { Menu, Dropdown, Avatar, message } from 'antd'
import { DownOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { } from '@ant-design/icons'
import axios from 'axios'
import config from 'config'

const { Header, Content } = Layout

function App(props) {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = () => {
    console.log('collapsed', collapsed);
    setCollapsed(!collapsed)
  }

  const DropdownProfile = () => {
    return (
      <div>
        <Menu>
          <Menu.Item>
            <a onClick={onLogout}>Logout</a>
          </Menu.Item>
        </Menu>
      </div>
    )
  }

  const onLogout = values => {
    axios.post(config.logoutURL, {
      header: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(function (response) {
        if (response.data) {
          localStorage.clear()
          message.success("Logout successful", 1.5).then(() => {
            props.history.push('/login')
            window.location.reload()
          });
        } else {
          message.success("Logout no successful")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider {...props} trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: onCollapse
              }
            )}
            <Dropdown overlay={() => DropdownProfile()}>
              <a type="link" className="ant-dropdown-name dropdown-name" onClick={e => e.preventDefault()} >
                <Space> <Avatar icon={<UserOutlined />} />
                  {
                    localStorage.getItem('myUsername')}<DownOutlined /></Space>
              </a>
            </Dropdown>
          </Header>
          <Content
            style={{
              backgroundColor: "#fff",
              margin: "24px 16px",
              padding: 24,
              minHeight: 280
            }}
          >
            <ConntentApp></ConntentApp>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App