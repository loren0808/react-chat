/**
 * 个人信息路由组件
 */
import { React, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { resetUser } from '../../redux/actions'
import Cookies from 'js-cookie'
import {
    Button,
    Dialog,
} from 'antd-mobile'
function Personal({ user, resetUser }) {

    const [icon, setIcon] = useState({})
    const imageContext = require.context('../../assets/images', true, /\.(jpg|png)$/)
    useEffect(() => {
        const list = []
        imageContext.keys().forEach((key) => {
            const str = key.match(/\d+/)
            list.push({
                key,
                text: '头像' + str,
                index: parseInt(str),
                image: imageContext(key)
            })
        })
        setIcon(list.find(item => item.text === user.header))
    }, [])

    const logout = () => {
        Dialog.confirm({
            content: '是否退出登录',
            onConfirm: () => {
                Cookies.remove('userid')
                resetUser()
            },
        })
    }
    return (
        <div className='personal'>
            <div className='image'>
                {icon ? <img src={icon.image} /> : null}
            </div>
            <div className='name'>
                {user.username}
            </div>
            <div className='details'>
                <div>职位: {user.post}</div>
                {user.company ? <div>公司: {user.company}</div> : null}
                {user.salary ? <div>月薪: {user.salary}</div> : null}
                <div>简介: {user.info}</div>
            </div>
            <Button block color='danger' onClick={logout} >退出登录</Button>
        </div>
    )
}


export default connect(
    state => ({ user: state.user }),
    { resetUser }
)(Personal)