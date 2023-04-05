/*
主界面
 */
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actions'
function Main({ user, getUser }) {

  const [content, setContent] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const userid = Cookies.get('userid')
    if (!userid) {
      navigate('/login')
    }
    if (!user._id) {
      setContent(<div>还未获取到用户数据需要发送请求</div>)
      getUser()
    } else {
      setContent(<div>已经获取到用户数据需要重定向</div>)
      let path = location.pathname
      if (path === '/') {
        console.log('请求的是根路径，需要计算最终路径')
        path = getRedirectTo(user.type, user.header)
        navigate(path)
      }
    }
  }, [user])

  return (
    <>
      {content}
      <Outlet />
    </>
  )
}

export default connect(
  state => ({ user: state.user }),
  { getUser }
)(Main)