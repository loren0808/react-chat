import { combineReducers } from 'redux'
import { getRedirectTo } from '../utils'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    RESET_USER_LIST,
    READ_MSG,
} from './action-types'


const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}


function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { type, header } = action.data
            return { ...action.data, redirectTo: getRedirectTo(type, header) }
        case ERROR_MSG:
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return { ...initUser, msg: action.data }
        default:
            return state
    }
}

const initUserList = []

function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        case RESET_USER_LIST:
            return [...initUserList]
        default:
            return state
    }
}

const initChat = {
    users: {},
    chatMsgs: [],
    unReadCount: 0,
}

function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs, userid } = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preCount, msg) => {
                    return preCount + (!msg.read && msg.to === userid ? 1 : 0)
                }, 0),
            }
        case RECEIVE_MSG:
            const { chatMsg, isToMe } = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (isToMe ? 1 : 0),
            }
        case READ_MSG:
            const { count, from, to } = action.data

            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (!msg.read && msg.from === from && msg.to === to) {
                        return { ...msg, read: true }
                    } else {
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}



export default combineReducers({
    user,
    userList,
    chat
})

