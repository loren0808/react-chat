import { reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList } from '../api/index'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST
} from './action-types'
import { io } from 'socket.io-client'


function initIO(){
    
}



//action 就是一个对象{type:,data:} 异步action是一个函数
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
const receiveUserList = (userlist) => ({ type: RECEIVE_USER_LIST, data: userlist })

export const register = (user) => {
    return async dispatch => {
        const response = await reqRegister(user)
        const result = response.data
        if (result.code === 0) {
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
// 发送消息
export const sendMsg = ({ from, to, content }) => {
    return async dispatch => {
        console.log({ from, to, content })
    }
}