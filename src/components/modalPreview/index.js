import React, { useEffect, useState } from 'react'
import { Modal, Space, Button, message, Spin } from 'antd';
import FileViewer from 'react-file-viewer';
import ReactPlayer from 'react-player'

const ModalPreview = ({ visiblePreview, cancelModalPreview, type, typeFile, URL }) => {
  
  const handleCancel = event => { 
    cancelModalPreview()
  };

  const defaultImg = (even) => {
    console.log('event.src', even.target.src)
    even.target.src = "./no-image.jpg "
  }

  return (
    <div>
      <Modal
        title='Preview'
        width='800px'
        visible={visiblePreview}
        onCancel={()=>handleCancel()}
        footer={[
          <Space>
            <Button className="btnCancel" key="close" onClick={()=>handleCancel()}>
              close
            </Button>
          </Space>
        ]}
      >
        {typeFile === "image" ? <img src={URL} className="viewImage" onError={defaultImg}/> :
          typeFile === "video" ?
            <div >
              <ReactPlayer
                className="reactPlayer"
                playing="true"
                controls='true'
                url={URL}
                width='100%'
                height='100%'
                stopOnUnmount={false}
              />
            </div> :
            < div key={URL}>
              <FileViewer
                fileType={type}
                filePath={URL}
              />
            </div>
        }
      </Modal>
    </div >
  )
}

export default ModalPreview