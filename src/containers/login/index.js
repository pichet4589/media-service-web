import React from 'react'
import { Form, Input, Button, Row, Col, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import config from 'config'
import { httpClient } from 'HttpClient.js'
import { sha256 } from 'js-sha256';

const NormalLoginForm = (props) => {

  const onFinish = values => {
    localStorage.setItem('myUsername', values.username);

    const params = {
      email: values.username,
      password: sha256.hmac("sil-dkigx]ujpocx]'my=", values.password),
      role: 'admin',
      service: 'media-service',
    }

    httpClient.post(config.loginURL, params)
      .then(function (response) {
        const resMessage = response.data.message
        if (response.data.code === 200) {
          localStorage.setItem('token', response.data.data.access_token);
          localStorage.setItem('refreshtoken', response.data.data.refresh_token);
          localStorage.setItem('permissionCreate', response.data.data.permission.can_create)
          localStorage.setItem('permissionDelete', response.data.data.permission.can_delete)
          localStorage.setItem('permissionRead', response.data.data.permission.can_read)
          message.success(resMessage, 1.5).then(() => {
            props.history.push('/')
            window.location.reload()
          });
        } else {
          message.error(resMessage)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <Row style={{ marginTop: '40px' }} justify="center">
      <Col span={8}></Col>
      <Col span={6} align="middle"  >
        <div className="box-login">
          <h1>Media Service</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button">Sign in
            </Button>
            </Form.Item>
          </Form>
        </div></Col>
      <Col span={8}></Col>
    </Row>
  )
}

export default NormalLoginForm
