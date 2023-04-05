/*
注册路由组件
 */
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { connect } from 'react-redux'
import { register } from '../../redux/actions'
import { useDidMountEffect } from '../../utils'
import Logo from '../../components/logo/logo'
import {
    NavBar,
    Form,
    Input,
    Radio,
    Button,
    Space,
    Dialog
} from 'antd-mobile'
function Register({ user, register }) {
    // const [val,setVal] = useState(0)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    useDidMountEffect(() => {
        if (user.msg) {
            Dialog.alert({ content: user.msg });
        }
        if (user.redirectTo) {
            navigate(user.redirectTo)
        }
    }, [user]);
    const onSubmit = async () => {
        try {
            //表单验证
            const res = await form.validateFields()
            const { username, password, type } = res
            register({ username, password, type })
            // console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    const toLogin = () => {
        navigate("/login")
    }
    //type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);
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
                <Form.Item label='确认密码' name='passwordDup' rules={[
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject("两次密码输入不一致")
                        }
                    }), { required: true, message: '确认密码不能为空' }
                ]}
                >
                    <Input placeholder='请再次输入密码' clearable type='password' />
                </Form.Item>
                <Form.Item label='用户类型' name='type'
                    rules={[{ required: true, message: '用户类型不能为空' }]}
                >
                    <Radio.Group>
                        <Space direction='horizontal'>
                            <Radio value='expert'>大神</Radio>
                            <Radio value='boss'>老板</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </>
    );
}

export default connect(
    state => ({ user: state.user }),
    { register }
)(Register)