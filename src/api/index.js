import ajax from "./ajax"
// 注册接口
export const reqRegister = (user) => ajax('/register', user, 'post')
// 登录接口
export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, 'post')
// 更新用户信息
export const reqUpdateUser = (user) => ajax('/update', user, 'post')
// 获取用户信息
export const reqUser = () => ajax('/user')
// 获取用户列表
export const reqUserList = (type) => ajax('/list', { type })
// 获取用户消息列表
export const reqChatMsgList = () => ajax('/msglist')
// 修改指定消息为已读
export const reqReadMsg = (from) => ajax('/readmsg', { from }, 'post') 
