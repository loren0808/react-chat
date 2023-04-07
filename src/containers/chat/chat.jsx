import { React, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import {
    NavBar,
    List,
    Input,
    Form
} from 'antd-mobile'
import { sendMsg, getUser } from '../../redux/actions'
function Chat({ user, sendMsg, getUser }) {

    const imageContext = require.context('../../assets/images', true, /\.(jpg|png)$/)
    const [images, setImages] = useState({})
    // 消息内容
    const [value, setValue] = useState('')
    // 对方用户的id
    const { userid } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user._id) {
            getUser()
        }
        imageContext.keys().forEach((key) => {
            const str = '头像' + key.match(/\d+/)
            images[str] = imageContext(key)
        })
        setImages({ ...images })
    }, [])

    const submit = () => {
        const from = user._id
        const to = userid
        const content = value.trim()
        if (content) {
            sendMsg({ from, to, content })
        }
        setValue('')
    }

    return (
        <>
            <div>{userid}</div>
            <NavBar onBack={() => { navigate(-1) }} className="my-navbar">aa</NavBar>
            <List>
                <List.Item
                    prefix={<img src={images['头像2']} />}
                >
                    Novalee Spicer
                </List.Item>
            </List>

            <Form layout='horizontal' className='bottom'>
                <Form.Item
                    extra={
                        <div className='extraPart'>
                            <a onClick={submit}>发送</a>
                        </div>
                    }
                >
                    <Input
                        placeholder='请输入内容'
                        value={value}
                        onChange={(value) => { setValue(value) }}
                    />
                </Form.Item>
            </Form>
        </>


    )
}

export default connect(
    (state) => ({ user: state.user }),
    { sendMsg, getUser }
)(Chat)