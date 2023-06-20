import React, { useState, useEffect } from 'react'
import { Select, DatePicker, Space, Row, Col, Button, Table, Popover, message, Skeleton, Pagination } from 'antd';
import {
  UploadOutlined, EyeOutlined, DownloadOutlined, CopyOutlined, DeleteOutlined, FileZipOutlined,
  PictureOutlined, PlaySquareOutlined, FileTextOutlined,
} from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { httpClient } from 'HttpClient.js'
import config from 'config'
import moment from 'moment'
import ModalUpload from 'components/modalUpload'
import ModalPreview from 'components/modalPreview'
import ModalDelete from 'components/modalDelete'

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormatList = ['DD-MM-YYYY', 'DD-MM-YY'];
const FileManagers = (props) => {
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [selectType, setSelectType] = useState(null)
  const [selectDate, setSelectDate] = useState({ start: '', end: '' })
  const [totalPage, setTotalPage] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(null)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [type, setType] = useState("")
  const [pathURL, setPathURL] = useState("")
  const [visiblePreview, setVisiblePreview] = useState(false)
  const [id, setId] = useState("")
  const [visible, setVisible] = useState(false)
  const [typeFile, setTypeFile] = useState("")

  useEffect(() => {
    APIshowFile()
    console.log('object')
  }, [selectDate, selectType, current])

  const showModalUpload = () => {
    setVisible(true)
  };

  const okModal = () => {
    setVisible(false)
  };

  const cancelModal = () => {
    setVisible(false)
  };

  const setClose = () => {
    setVisible(false)
    APIshowFile()
  }

  const closeDel = () => {
    setVisibleDelete(false)
    APIshowFile()
  }

  const showModalPreview = (e) => {
    const name = e.name.split(".")
    const lenghtName = name.length
    const nameType = name[lenghtName - 1]
    setTypeFile(e.type)
    setType(nameType)
    setPathURL(e.url)
    setVisiblePreview(true)
    };

  const cancelModalPreview = () => {
    setVisiblePreview(false)
  };

  const selectTypeFile = (Value) => {
    setSelectType(Value)
    setCurrent(1)
  }

  const onChange = (pagination) => {
    setCurrent(pagination.current)
  }

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  }

  const selectDateShow = (time, timeString) => {
    const startText = moment(time[0]).format("M-D-YYYY") + " 00:01:01"
    const endText = moment(time[1]).format("M-D-YYYY") + " 23:59:59"
    const range = {
      start_date: moment(moment(startText)).unix(),
      end_date: moment(moment(endText)).unix(),
    }
    setSelectDate(range)
  }

  const APIshowFile = () => {
    const params = {
      page: current,
      filter_by: selectType,
      startdate: selectDate.start_date,
      enddate: selectDate.end_date,
    }

    httpClient.get(config.fileURL + '/file?', { params })
      .then(function (result) {
        const currentPage = result.data.data.pagination.current_page
        const code = result.data.code
        const data = result.data.data.data_list
        const totalPage = result.data.data.pagination.total
        const perPage = result.data.data.pagination.per_page
        setTotalPage(totalPage)
        setPerPage(perPage)
        setPage(currentPage)
        if (code === 200) {
          const dataMap = data.map((item, key) => {
            const dataDate = item.date
            const formatDate = moment(item.date * 1000).format("DD-MM-YYYY")
            item.emptyDate = "/"
            { dataDate == "" ? item.date = item.emptyType : item.date = formatDate }
            item.key = perPage * (currentPage - 1) + (key + 1)
            return item
          })
          setData(dataMap)
        }
      })
      .catch(function (error) {
        console.log('error', error)
        localStorage.setItem('myUsername', '')
        localStorage.setItem('token', '')
        localStorage.setItem('myUsername', '')
        props.history.push('/login')
        window.location.reload()
      })
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      responsive: ['lg'],
      render: (name) => {
        return <div className="text_name" >{name}</div>
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (type) => {
        return type === 'image' ? <PictureOutlined style={{ fontSize: '16px', color: '#404040' }} /> :
          type === 'video' ? <PlaySquareOutlined style={{ fontSize: '16px', color: '#606060' }} /> :
            type === 'document' ? <FileTextOutlined style={{ fontSize: '16px', color: '#808080' }} /> :
              type === 'compessed' ? <FileZipOutlined style={{ fontSize: '16px', color: '#a0a0a0' }} /> : ""
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        return status === 'active' ? <font style={{ fontSize: '16px', color: '#009900' }}>active</font> :
          status === 'inactive' ? <font style={{ fontSize: '16px', color: '#C0C0C0' }}>inactive</font> :
            status === 'terminated' ? <font style={{ fontSize: '16px', color: '#ff9933' }}>terminated</font> :
              <font style={{ fontSize: '16px', color: '#ff0000' }}>deleted</font>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (e) => {
               return e.status === 'deleted' ? <div style={{ color: '#ccc' }}>ไฟล์ถูกลบ</div> :
          e.status === 'terminated' ? <div style={{ color: '#ccc' }}>ไฟล์ถูกลบ</div> :
            <Popover content={() => content(e)} >
              <a type='text' >...</a>
            </Popover>
      }
    },
  ];

  const copyLink = (e) => {
    const URL = e.url
    message.success('copied')
    return <CopyToClipboard text={URL} >
    </CopyToClipboard>
  }

  const downloadFile = (e) => {
    const name = e.name
    const link = e.url
    fetch(link).then(function (t) {
      return t.blob().then((b) => {
        var a = document.createElement('a')
        a.href = URL.createObjectURL(b)
        a.setAttribute('download', name)
        a.click()
      })
    })
  }

  const showModalDelete = (e) => {
    setId(e.id)
    setVisibleDelete(true)
  };

  const cancelModalDelete = () => {
    setVisibleDelete(false)
  };

  const content = (e) => {
    const name = e.name.split(".")
    const lenghtName = name.length
    const nameType = name[lenghtName - 1]
    return <div>
      {e.type === "compessed" ? "" :
        e.status === "terminated" ? "" :
          e.status === "deleted" ? "" :
            nameType === ("docx") ? "" :
              nameType === ("pptx") ? "" :
                nameType === ("xlsx") ? "" :
                  <p><a onClick={() => showModalPreview(e)} ><EyeOutlined /> preview</a></p>
      }
      <p><a onClick={() => downloadFile(e)}><DownloadOutlined /> download</a></p>
      <CopyToClipboard text={e.url} >
        <p><a onClick={() => copyLink(e)} ><CopyOutlined /> copy link</a></p>
      </CopyToClipboard>
      {e.status === "deleted" ? "" :
        localStorage.getItem('permissionDelete') === "true" ?
          <p><a onClick={() => showModalDelete(e)} ><DeleteOutlined /> delete</a></p> : ""
      }
    </div>
  };

  const pagination = {
    pageSize: perPage,
    total: totalPage,
    current: page,
    showSizeChanger: false
  }

  return (
    <>
      <h1>List File</h1>
      <div>
        <Row justify="space-between" >
          <Col span='12'>
            <Space>Type :
            <Select defaultValue="" style={{ width: 140, textAlign: "left" }} onChange={selectTypeFile} >
                <Option value="" >All</Option>
                <Option value="image" >Image</Option>
                <Option value="video">Video</Option>
                <Option value="document" >Document</Option>
                <Option value="compessed">Compressed</Option>
              </Select></Space>
          </Col>
          <Col >
            <Space>
              <div>
                <RangePicker style={{ width: 250 }} onChange={selectDateShow} format={dateFormatList} disabledDate={disabledDate} /></div>
              <div >
                {
                  localStorage.getItem('permissionCreate') === "true" ? <Button type="primary" onClick={showModalUpload}  ><UploadOutlined />Click to Upload</Button> : <Button disabled>Click to Upload</Button>
                }
              </div></Space>
          </Col>
        </Row>
      </div>
      <div>
        <br />
        <link rel="prefetch" href="/style.css" as="style" />

        {/* {data.length === 0 ? <div><Skeleton active /> </div> : */}
        <div>
          <Table bordered style={{ textAlign: "left" }} pagination={pagination} dataSource={data} columns={columns} onChange={onChange} />
        </div>
        {/* } */}
      </div>

      <ModalUpload
        visible={visible}
        cancelModal={() => cancelModal()}
        okModal={() => okModal()}
        setClose={setClose}
      >
      </ModalUpload>
      <ModalPreview
        visiblePreview={visiblePreview}
        cancelModalPreview={cancelModalPreview}
        type={type}
        URL={pathURL}
        typeFile={typeFile}
      >
      </ModalPreview>
      <ModalDelete
        visible={visibleDelete}
        cancelModaldelete={() => cancelModalDelete()}
        id={id}
        closeDel={closeDel}
      >
      </ModalDelete>
    </>
  )
}

export default FileManagers