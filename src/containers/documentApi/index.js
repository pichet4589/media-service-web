import React from 'react'
import { Collapse, Col, Row, Input } from 'antd';

const { TextArea } = Input;
const DocumentAPI = () => {
  const { Panel } = Collapse;

  const textUpload =
    <Row >
      <Col className="colText">
        <font style={{ color: '#cccc00', fontWeight: 'bold' }}>POST  </font> Upload File<br /><br />
        <input type="text" Class="ant-input" value="http://api-media.touchdevhub.com/upload" /><br /><br />
        <p>Request :</p>
        <p>Body From-data</p>
        <Row  >
          <Col className="colTextRequst">file</Col>
          <Col className="colTextRequst">file</Col>
        </Row>
      </Col>
      <Col className="colText" >
        <p>Response </p>
        <p>200 : OK</p>
        <p>Successfully</p>
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} value="{
        'code':200, 'message' : 'สร้างข้อมูลสำเร็จ','data':{'id':'5f5a7240e6251438ac71e7f4',
        'name':'1599763008_week2.rar','path':'uploads/compessed/','name_s':'',
        'name_m':'','name_l':'','type':'compessed','date':'1599763008',
        'status':'inactive','created_at':1599763008,'updated_at':159976300 
      }" /><br /><br />
        <p>401 : ERROR</p>
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} value="{
        'message': 'ไม่มีสิทธิ์เข้าใช้งาน',
        'error': 'Unauthorized'
      }" /><br /><br />
        <p>422 : ERROR</p>
        <input type="text" Class="ant-input" value=" {'message' : 'พบข้อผิดพลาดในการทำงาน'} " /><br /><br />
      </Col>
    </Row>
    ;

  const textGetFile =
    <Row >
      <Col className="colText">
        <font style={{ color: '#00cc00', fontWeight: 'bold' }}>GET  </font> Get File<br /><br />
        <input type="text" Class="ant-input" value="http://api-media.touchdevhub.com/link" /><br /><br />
        <p>Request </p>
        <p>Query Paramiter</p>
        <Row  >
          <Col className="colTextRequst">id</Col>
          <Col className="colTextRequst">string</Col>
        </Row>
      </Col>
      <Col className="colText" >
        <p>Response </p>
        <p>200 : OK</p>
        <p>Successfully</p>
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} value="{
         'code': 200,
         'message': 'เรียกดูข้อมูลสำเร็จ',
         'data': { 'link': 'http://api-media.touchdevhub.com/uploads/compessed/
                  1600083717_week1 Requirements and Planning.rar' }
         }" /><br /><br />
        <p>422 : ERROR</p>
        <p>Could not find</p>
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} value="{
    'code': 404,
    'message': 'ไม่พบข้อมูล',
    'error': 'encoding/hex: odd length hex string'
    }" /><br /><br />
      </Col>
    </Row>
    ;

  const textDelete =
    <Row >
      <Col className="colText">
        <font style={{ color: '#ff0000', fontWeight: 'bold' }}>DELETE  </font> Delete File<br /><br />
        <input type="text" Class="ant-input" value="http://api-media.touchdevhub.com/file" /><br /><br />
        <p>Request </p>
        <p>Path Parameter</p>
        <Row >
          <Col className="colTextRequst">id</Col>
          <Col className="colTextRequst">string</Col>
        </Row>
      </Col>
      <Col className="colText" >
        <p>Response </p>
        <p>200 : OK</p>
        <p>Successfully</p>
        <input type="text" Class="ant-input" value="{ 'code' : 200, 'message' : 'ลบข้อมูลสำเร็จ', 'data' : null }" /><br /><br />
        <p>422 : ERROR</p>
        <p>Could not find</p>
        <input type="text" Class="ant-input" value="{'message' : 'พบข้อผิดพลาดในการทำงาน' }" /><br /><br />
      </Col>
    </Row>
    ;

  const textDashboard =
    <Row >
      <Col className="colText">
        <font style={{ color: '#00cc00', fontWeight: 'bold' }}>GET  </font> Dashboard<br /><br />
        <input type="text" Class="ant-input" value="http://api-media.touchdevhub.com/dashboard" /><br /><br />
        <p>Response </p>
        <p>200 : OK</p>
        <p>Successfully</p>
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} value="{ 
          'code' : 200, 'message' : 'เรียกดูข้อมูลสำเร็จ', 'data' : 
          'id' : '5f59ebaae6251438ac71e7f3' ,'total' : 30 ,'active': 10, 'delete' : 20 
          }" /> <br /><br />
        <p>422 : ERROR</p>
        <p>Could not find</p>
        <input type="text" Class="ant-input" value="{'message' : 'พบข้อผิดพลาดในการทำงาน' }" /><br /><br />
      </Col>
    </Row>
    ;

  const getData =
    <Row >
      <Col className="colText">
        <font style={{ color: '#00cc00', fontWeight: 'bold' }}>GET  </font> Get Data File<br /><br />
        <input type="text" Class="ant-input" value="http://api-media.touchdevhub.com/file" /><br /><br />
        <p>Request </p>
        <p>Query Paramiter</p>
        <Row  >
          <Col className="colTextRequst">id</Col>
          <Col className="colTextRequst">string</Col>
        </Row>
      </Col>
      <Col className="colText" >
        <p>Response </p>
        <p>200 : OK</p>
        <p>Successfully</p>
        <TextArea autoSize={{ minRows: 2, maxRows: 10 }} value="{
           'code': 200,
           'message': 'เรียกดูข้อมูลสำเร็จ',
           'data': {
           'pagination': {
           'total': 16,
           'per_page': 20,
           'current_page': 1,
           'total_page': 1,
           'sort_field': 'created_at',
           'sort_by': 'desc',
           'filter_field': '',
           'filter_by': 'image',
           'search': ''},
          }" /><br /><br />
      </Col>
    </Row>
    ;

  const textFlagFile =
    <Row >
      <Col className="colText">
        <font style={{ color: '#0000cc', fontWeight: 'bold' }}>PUT  </font> Flag Status File<br /><br />
        <input type="text" Class="ant-input" value="http://api-media.touchdevhub.com/flag" /><br /><br />
        <p>Request </p>
        <p>Path Paramiter</p>
        <Row >
          <Col className="colTextRequst">id</Col>
          <Col className="colTextRequst">string</Col>
        </Row>
      </Col>
      <Col className="colText" >
        <p>Response </p>
        <p>200 : OK</p>
        <p>Successfully</p>
        <TextArea autoSize={{ minRows: 2, maxRows: 10 }} value="{
          'code': 200,
          'message': 'อัพเดทข้อมูลสำเร็จ',
          'data': {
          'id': '5f5f4034b98fba7726f689ec',
          'name': '1600077876_Screenshot_25630914_162706.jpg',
          'path': 'uploads/image/',
          'name_s': '',
          'name_m': '',
          'name_l': '',
          'type': 'image',
          'date': '1600077876',
          'status': 'active',
          'used_total': 0,
          'created_at': 1600077876,
          'updated_at': 1600096552
          }" /><br /><br />
        <p>422 : ERROR</p>
        <p>Could not find</p>
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} value="{
    'code': 404,
    'message': 'ไม่พบข้อมูล',
    'error': 'encoding/hex: odd length hex string'
    }" /><br /><br />
      </Col>
    </Row>
    ;

  const textPing =
    <Row >
      <Col className="colText">
        <font style={{ color: '#00cc00', fontWeight: 'bold' }}>GET  </font> Ping<br /><br />
        <input type="text" Class="ant-input" value="http://api-media.touchdevhub.com/ping" /><br /><br />
        <p>Response </p>
        <p>200 : OK</p>
        <p>Successfully</p>
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} value="ping" /> <br /><br />
      </Col>
    </Row>
    ;

  return (
    <>
      <Collapse accordion className="Collapse">
        <Panel header="การอัปโหลดไฟล์" key="1">
          <p>{textUpload}</p>
        </Panel>
        <Panel header="การดึงไฟล์ไปใช้งาน" key="2">
          <p>{textGetFile}</p>
        </Panel>
        <Panel header="การลบไฟล์" key="3">
          <p>{textDelete}</p>
        </Panel>
        <Panel header="หน้า Dashboard" key="4">
          <p>{textDashboard}</p>
        </Panel>
        <Panel header="การดึงข้อมูลไฟล์มาแสดง" key="5">
          <p>{getData}</p>
        </Panel>
        <Panel header="การ flag สถานะ" key="6">
          <p>{textFlagFile}</p>
        </Panel>
        <Panel header="ping" key="7">
          <p>{textPing}</p>
        </Panel>
      </Collapse>

    </>
  )
}


export default DocumentAPI