import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api/index'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RESET_USER_LIST,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
} from './action-types'
import { io } from 'socket.io-client'



const initIO = (() => {
    let socket_single = null
    let dispatch_single = null
    return (dispatch, myId) => {
        // 如果未创建socket
        if (!dispatch_single) {
            dispatch_single = dispatch
        }
        if (!socket_single) {
            console.log('创建一个socket')
            socket_single = io()
            socket_single.on('receiveMsg', chatMsg => {
                console.log('客户端收到消息', chatMsg)
                dispatch(receiveMsg(chatMsg))
            })
            socket_single.emit('login', myId)
        }
        return socket_single
    }
})();

// 发送消息
export const sendMsg = ({ from, to, content }) => {
    return async dispatch => {
        const socket = initIO()
        socket.emit('sendMsg', { from, to, content })
        console.log('客户端发送消息', { from, to, content })
    }
}




//action 就是一个对象{type:,data:} 异步action是一个函数
//同步action 封装成一个action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
export const resetUserList = (msg) => ({ type: RESET_USER_LIST, data: msg })
const receiveUserList = (userlist) => ({ type: RECEIVE_USER_LIST, data: userlist })
const receiveMsgList = ({ users, chatMsgs }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs } })
const receiveMsg = (chatMsg) => ({ type: RECEIVE_MSG, data: chatMsg })


// 获取用户消息列表的异步函数
async function getMsgList(dispatch, myId) {
    // 一旦用户登录成功，与消息服务器建立连接
    initIO(dispatch, myId)
    // 初始化消息列表
    const response = await reqChatMsgList()
    const result = response.data
    if (result.code === 0) {
        const { users, chatMsgs } = result.data
        dispatch(receiveMsgList({ users, chatMsgs }))
    }
}

export const register = (user) => {
    return async dispatch => {
        const response = await reqRegister(user)
        const result = response.data
        if (result.code === 0) {
            // 注册成功获取消息列表 
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

export const login = (user) => {
    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) {
            // 登录成功获取消息列表 
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {
            // 自动登录成功获取消息列表 
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}
