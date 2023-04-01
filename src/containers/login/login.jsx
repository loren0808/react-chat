/*
登录路由组件
 */
import React from 'react';
import { useNavigate } from "react-router-dom";
import ajax from '../../api/ajax';
import Logo from '../../components/logo/logo'
import {
    NavBar,
    Form,
    Input,
    Button,
} from 'antd-mobile'

export default function Login() {

    // const [val,setVal] = useState(0)

    const [form] = Form.useForm()
    const navigate = useNavigate()
    const onSubmit = () => {
        const data = form.getFieldValue()
        ajax('/login', data, 'get').then(res => {
            console.log(res)
        })
    }
    const toRegister = () => {
        navigate("/Register")
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
                            登录
                        </Button>
                        <Button block size='small' fill='none' onClick={toRegister} type='submit' color='primary'>
                            没有账号？去注册
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
            </Form>
        </>
    );
}
