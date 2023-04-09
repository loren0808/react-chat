/**
 * 聊天路由组件
 */
import { React, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    List,
    Badge
} from 'antd-mobile'
import { images } from '../../utils'
import { readMsg } from '../../redux/actions'
// 获取最后一条信息并统计未读数
function getLastMsgs(chatMsgs, userid) {
    const lastMsgMap = new Map()
    chatMsgs.forEach(msg => {
        const chatId = msg.chat_id
        // 根据chatId分组
        /**
         * {
         *   lastMsg:Object
         *   unReadCount:Number
         * }
         */
        const countFlag = !msg.read && userid === msg.to
        if (lastMsgMap.has(chatId)) {
            const { lastMsg, unReadCount } = lastMsgMap.get(chatId)
            const flag = lastMsg.create_time < msg.create_time
            if (flag || countflag) {
                lastMsgMap.set(chatId, { lastMsg: flag ? msg : lastMsg, unReadCount: unReadCount + (countFlag ? 1 : 0) })
            }
        } else {
            lastMsgMap.set(chatId, { lastMsg: msg, unReadCount: countFlag ? 1 : 0 })
        }
    })
    const messageList = []
    // 将map中元素取出放入列表中
    lastMsgMap.forEach((msgInfo) => {
        messageList.push(msgInfo)
    })
    messageList.sort((a, b) => (b.lastMsg.create_time - a.lastMsg.create_time))
    return messageList
}

function Message({ user, chat, readMsg }) {
    const { users, chatMsgs } = chat
    const navigate = useNavigate()
    const [lastMsgs, setLastMsgs] = useState(null)
    useEffect(() => {
        setLastMsgs(getLastMsgs(chatMsgs, user._id))
    }, [chat])

    return (
        <>
            <List className='message-list'>
                {
                    // chatId msg
                    lastMsgs && lastMsgs.map(item => {
                        const { lastMsg, unReadCount } = item
                        const targetId = lastMsg.to === user._id ? lastMsg.from : lastMsg.to
                        // 如果users没有及时更新，新注册用户发来的信息无法找到对应的users，
                        // 获取全部的users这个处理是有问题的
                        const targetUser = users[targetId]
                        return (
                            <List.Item
                                key={lastMsg.chat_id}
                                prefix={<img src={images[targetUser.header]}></img>}
                                extra={<Badge content={unReadCount > 0 ? unReadCount : null} />}
                                onClick={() => {
                                    readMsg(targetId, user._id)
                                    navigate(`/chat/${targetId}`)
                                }}
                                description={lastMsg.content}
                            >
                                {targetUser.username}
                            </List.Item>
                        )
                    })
                }
            </List>
        </>

    )
}


export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { readMsg }
)(Message)