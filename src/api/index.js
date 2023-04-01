import ajax from "./ajax"
export const reqRegister = (user)=> ajax('/register',user,'post')
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'post')
export const reqUpdateUser = (user) => ajax('/update',user,'post')

