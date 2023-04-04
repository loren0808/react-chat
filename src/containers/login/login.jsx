/*
登录路由组件
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../../components/logo/logo'
import { login } from '../../redux/actions';
import { connect } from 'react-redux';
import {
    NavBar,
    Form,
    Input,
    Button,
} from 'antd-mobile'

function Login({ user, login }) {

    // const [val,setVal] = useState(0)
    // 第一次加载
    const [isMounted, setIsMounted] = useState(false);

    const [form] = Form.useForm()
    const navigate = useNavigate()
    useEffect(() => {
        if (isMounted) {
            console.log(isMounted)
            if (user.redirectTo) {
                navigate(user.redirectTo)
            }
        } else {
            setIsMounted(true);
        }
    }, [user.redirectTo])
    const onSubmit = async () => {
        try {
            //表单验证
            const res = await form.validateFields()
            login(res)
            // console.log(res)
        } catch (err) {
            console.log(err)
        }
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
                <Form.Item label='用户名' name='username'
                    rules={[{ required: true, message: '用户名不能为空' }]}
                >
                    <Input placeholder='请输入用户名' clearable />
                </Form.Item>
                <Form.Item label='密码' name='password'
                    rules={[{ required: true, message: '密码不能为空' }]}
                >
                    <Input placeholder='请输入密码' clearable type='password' />
                </Form.Item>
            </Form>
        </>
    );
}
export default connect(
    state => ({ user: state.user }),
    { login }
)(Login)
