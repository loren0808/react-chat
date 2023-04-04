import {React ,useState} from 'react'
import { connect } from 'react-redux'
import { Form, Input, TextArea,NavBar,Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

function ExpertInfo(props) {

  const [form] = Form.useForm()

  const [header,setHeader] = useState({
    header:''
  })

  // const setHeader = (header) => { second }

  const onSubmit = () =>{
    console.log(header)
  }
  return (
    <>
      <NavBar back={null} className="my-navbar">牛人信息完善</NavBar>
      <HeaderSelector setHeader={setHeader}></HeaderSelector>
      <Form layout='horizontal'
        form={form}
        footer={
          <>
            <Button block onClick={onSubmit} type='submit' color='primary' size='large'>
              保存
            </Button>
          </>
        }
      >
        <Form.Item label='求职岗位' name='username'>
          <Input placeholder='请输入求职岗位' clearable />
        </Form.Item>
        <Form.Item label='个人介绍' name='type'>
          <TextArea
            placeholder='请输入个人介绍'
            rows={5}
          />
        </Form.Item>
      </Form>
    </>
  )
}


export default connect(
  state => ({}),
  {}
)(ExpertInfo)