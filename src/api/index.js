import ajax from "./ajax"
// 注册接口
export const reqRegister = (user)=> ajax('/register',user,'post')
// 登录接口
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'post')
// 更新用户信息
export const reqUpdateUser = (user) => ajax('/update',user,'post')
// 获取用户信息
export const reqUser = () => ajax('/user')
// 获取用户列表
export const reqUserList = (type) => ajax('/list',{type})
