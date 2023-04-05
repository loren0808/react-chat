import { React, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input, TextArea, NavBar, Button } from 'antd-mobile'
import { updateUser } from '../../redux/actions'
import { useNavigate } from "react-router-dom";
import { useDidMountEffect } from '../../utils';
import HeaderSelector from '../../components/header-selector/header-selector'

function ExpertInfo({ user, updateUser }) {

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [header, setHeader] = useState({
    header: ''
  })

  useDidMountEffect(() => {
    if (user.header) {
      // ${user.type}
      navigate(`/`)
    }
  }, [user])
  const onSubmit = async () => {
    try {
      const res = await form.validateFields()
      if (header) {
        const data = { ...res, ...header }
        updateUser(data)
      }
    } catch (err) {
      console.log(err)
    }
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
        <Form.Item label='求职岗位' name='post'>
          <Input placeholder='请输入求职岗位' clearable />
        </Form.Item>
        <Form.Item label='个人介绍' name='info'>
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
  state => ({ user: state.user }),
  { updateUser }
)(ExpertInfo)