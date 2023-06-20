import React, { useState, useEffect } from 'react'
import { Layout, Menu, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { DashboardOutlined, FolderOpenOutlined, ApiOutlined, HomeOutlined } from '@ant-design/icons'
const { Sider } = Layout

const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState(props.location.pathname)


  useEffect(() => {
    setActiveMenu(props.location.pathname)
  }, [props.location.pathname])


  return (
    <Sider
      className="Sider sider-custom"
      trigger={null} collapsed
      collapsed={props.collapsed}
    >
      <div className="logo">
        <Row justify="space-around" >
          <Col className="fonthead" > {!props.collapsed ? ' Media Service' : <HomeOutlined />}
          </Col><Col></Col>
        </Row>
      </div>

      <Menu className="Sider-Menu" theme="dark" defaultSelectedKeys={[activeMenu]} mode="inline" >
        <Menu.Item
          key="/"
          icon={<DashboardOutlined />}
          onClick={() => setActiveMenu('/')}
        >
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item
          key="/filemanager"
          icon={<FolderOpenOutlined />}
          onClick={() => setActiveMenu('/filemanager')}
        >
          <Link to="/filemanager">File Manager</Link>
        </Menu.Item>
        <Menu.Item
          key="/documentApi"
          icon={<ApiOutlined />}
          onClick={() => setActiveMenu('/documentApi')}
        >
          <Link to="/documentApi">Api Document</Link>
        </Menu.Item>
      </Menu>
    </Sider>

  )
}

export default Sidebar
