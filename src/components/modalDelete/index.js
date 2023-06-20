import React from 'react'
import { Modal, Space, Button } from 'antd';
import config from 'config'
import { httpClient } from 'HttpClient';
import { message } from 'antd';

const ModalDelete = ({ visible, cancelModaldelete, id, closeDel }) => {

  const handleCancel = event => {
    cancelModaldelete(false)
  }

  const deleteFile = () => {
    httpClient.delete(config.fileURL + '/file' + '/' + id)
      .then(function (response) {
        const code = response.data.code
        if (code === 200) {
          message.success('Delete successfully');
          closeDel(false)
        } else {
          message.error('Delete failed');
        }
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }

  return (
    <div className="test">
      <Modal
        title='DELETE'
        width='400px'
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Space>
            <Button className="btnCancel" key="close" onClick={handleCancel}>
              Cencel
          </Button>
            <Button type="primary" onClick={deleteFile}>Delete</Button>
          </Space>
        ]}
      >
        <p className="delete">Are you sure you want to permanantly delete this file.</p>
      </Modal>
    </div>
  )
}


export default ModalDelete