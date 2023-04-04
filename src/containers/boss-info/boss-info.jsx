import {React ,useState} from 'react'
import { connect } from 'react-redux'
import { Form, Input, TextArea,NavBar,Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'


function BossInfo(props) {

  const [form] = Form.useForm()
  const [header,setHeader] = useState({
    header:''
  })
  const onSubmit = () =>{
    
  }


  return (
    <>
      <NavBar back={null} className="my-navbar">老板信息完善</NavBar>
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
                <Form.Item label='招聘职位' name='post'>
                    <Input placeholder='请输入招聘职位' clearable />
                </Form.Item>
                <Form.Item label='公司名称' name='company'>
                    <Input placeholder='请输入公司名称' clearable />
                </Form.Item>
                <Form.Item label='职位薪资' name='salary'>
                    <Input placeholder='请输入职位薪资' clearable />
                </Form.Item>
                <Form.Item label='职位要求' name='info'>
                    <TextArea
                      placeholder='请输入职位要求'
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
)(BossInfo)