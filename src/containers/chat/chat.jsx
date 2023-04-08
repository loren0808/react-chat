import { React, useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import {
    NavBar,
    List,
    Input,
    Form,
    Grid,

} from 'antd-mobile'
import { sendMsg, getUser } from '../../redux/actions'
function Chat({ user, sendMsg, chat }) {

    const imageContext = require.context('../../assets/images', true, /\.(jpg|png)$/)
    const [images, setImages] = useState({})
    const formRef = useRef(null)
    // 消息内容
    const [value, setValue] = useState('')
    // 对方用户的id
    const { userid } = useParams()
    const navigate = useNavigate()
    // 获取redux中的chat状态
    const { users, chatMsgs } = chat
    const [messages, setMessages] = useState([])
    // 是否展示表情列表
    const [isshow, setIsShow] = useState(false)
    const emojis = [
        '💀', '💀', '😅', '😅', '😅', '😅', '💀', '💀',
        '💀', '💀', '💀', '💀', '💀', '💀', '💀', '💀',
        '💀', '💀', '💀', '💀', '💀', '💀', '💀', '💀',
        '💀', '💀', '💀', '💀', '💀', '💀', '💀', '💀',
    ]
    useEffect(() => {
        // chat页面刷新后
        imageContext.keys().forEach((key) => {
            const str = '头像' + key.match(/\d+/)
            images[str] = imageContext(key)
        })
        setImages({ ...images })
    }, [])

    useEffect(() => {
        // 计算当前chatid
        const chatId = [userid, user._id].sort().join('_')
        // 过滤当前聊天信息
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        setMessages(msgs)
        window.scrollTo(0, document.documentElement.scrollHeight)
    }, [chat])



    const submit = () => {
        const from = user._id
        const to = userid
        const content = value.trim()
        if (content) {
            sendMsg({ from, to, content })
        }
        // 清空对话框
        setValue('')
        setIsShow(false)
        formRef.current.classList.remove('move')
    }

    return (
        <>
            <NavBar onBack={() => { navigate(-1) }} className="my-navbar top">{chat.users[userid] && chat.users[userid].username}</NavBar>
            <List className='body'>
                {
                    messages.map(msg => (
                        <List.Item
                            key={msg._id}
                            prefix={<img src={images[users[msg.from].header]} />}
                        >
                            {msg.content}
                        </List.Item>
                    ))
                }
            </List>

            <div className='bottom' ref={formRef}>
                <Form layout='horizontal'  >
                    <Form.Item
                        extra={
                            <div className='extraPart'>
                                <span style={{ marginRight: '10px' }}
                                    onClick={() => {
                                        console.log(formRef.current)
                                        formRef.current.classList.toggle('move')
                                        setIsShow(!isshow)
                                    }}
                                >💀</span>
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
            </div>


            {
                isshow &&
                <Grid columns={8} gap={8} className='bottom'>
                    {
                        emojis.map((emoji, index) => (
                            <Grid.Item key={index} className='emoji'
                                onClick={() => { setValue(value + emoji) }}
                            >
                                <div>{emoji}</div>
                            </Grid.Item>
                        ))
                    }

                </Grid>
            }
        </>


    )
}

export default connect(
    (state) => ({ user: state.user, chat: state.chat }),
    { sendMsg, }
)(Chat)