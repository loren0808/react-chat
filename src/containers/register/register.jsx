/*
注册路由组件
 */
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../../components/logo/logo'
import {
    NavBar,
    Form,
    Input,
    Radio,
    Button,
    Space
} from 'antd-mobile'
export function Register() {

    // const [val,setVal] = useState(0)

    const [form] = Form.useForm()
    const navigate = useNavigate()
    const onSubmit = () => {
        console.log(form.getFieldsValue())
    }
    const toLogin = () => {
        navigate("/login")
    }

    return (
        <>
            <NavBar back={null} className="my-navbar">CHAT</NavBar>
            <Logo />
            <Form layout='horizontal'
                form={form}
                footer={
                    <>
                        <Button block onClick={onSubmit} type='submit' color='primary' size='large'>
                            提交
                        </Button>
                        <Button block size='small' fill='none' onClick={toLogin} type='submit' color='primary'>
                            已有账号
                        </Button>
                    </>
                }
            >
                <Form.Item label='用户名' name='username'>
                    <Input placeholder='请输入用户名' clearable />
                </Form.Item>
                <Form.Item label='密码' name='password'>
                    <Input placeholder='请输入密码' clearable type='password' />
                </Form.Item>
                <Form.Item label='确认密码' name='passwordDup'>
                    <Input placeholder='请再次输入密码' clearable type='password' />
                </Form.Item>
                <Form.Item label='用户类型' name='type'>
                    <Radio.Group>
                        <Space direction='horizontal'>
                            <Radio value='dashen'>大神</Radio>
                            <Radio value='laoban'>老板</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </>
    );
}