import React, { useState } from 'react'
import { Modal, Form, Space, Button, Input, Upload, message, Progress } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import config from 'config'
import { httpClient } from 'HttpClient';

const ModalUpload = ({ visible, cancelModal, setClose }) => {
  const [progress, setProgress] = useState('0')
  const handleCancel = event => {
    cancelModal(false)
    setProgress(0)
    setState({
      fileList: [],
    });
  };

  const [state, setState] = useState({
    fileList: [],
    uploading: false,
  })

  const handleUpload = () => {
    const { fileList } = state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
      formData.set('status', 'active')
    });
    setState({
      uploading: true,
      fileList: fileList,
    });

    httpClient.post(config.fileURL + '/upload', formData, {
      onUploadProgress: (pr) => {
        const progress = (pr.loaded * 100) / pr.total
        setProgress(Math.round(progress))
      }
    })
      .then(function (response) {
        const resMessage = response.data.message
        const code = response.data.code
        if (code === 200) {
          setState({
            fileList: [],
            uploading: false,
          });
          message.success(resMessage)
          setClose(false)
          setProgress(0)
        } else {
          setState({
            fileList: [],
            uploading: false,
          });
          message.error(resMessage)
          setClose(false)
          setProgress(0)
        }
      })
      .catch(function (error) {
        console.log('error', error)
      })
  };

  const { uploading, fileList } = state;
  const props = {
    onRemove: (file) => {
      setState(state => {
        const index = state.fileList.indexOf(file);
        const newFileList = state.fileList.slice();
        newFileList.splice(index, 1);
        return {
          fileList: newFileList,
        };
      });
    },
    beforeUpload: file => {
      setState(state => ({
        fileList: [...state.fileList, file],
      }));
      return false;
    },
    fileList,
  };

  return (
    <>
      <Modal
        title='Upload File'
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Space>
            <Progress percent={progress} status="active" className="progress" />
            <Button className="btnCancel" key="close" onClick={handleCancel}>
              Cancel
          </Button>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
            > Upload </Button>
          </Space>
        ]}>
        <div>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            <Upload {...props}
              listType="picture">
              <Space>
                Open File : <Input style={{ width: 280 }} />
                <Button type="primary" icon={<FolderOpenOutlined />} disabled={fileList.length === 1} > Browse </Button>
              </Space>
            </Upload>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default ModalUpload