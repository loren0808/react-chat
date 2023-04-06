/*
主界面
 */
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actions'
import { NavBar } from 'antd-mobile'
import NavFooter from '../../components/nav-footer/nav-footer'
import {
  AppOutline,
  MessageOutline,
  UserOutline,
} from 'antd-mobile-icons'
function Main({ user, getUser }) {
  const [content, setContent] = useState(null)
  const [nav, setNav] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [navList,setNavlist] = useState([{
    path: '/boss',
    title: '牛人列表',
    text: '牛人',
    icon: <AppOutline />,
  },
  {
    path: '/expert',
    title: '老板列表',
    text: '老板',
    icon: <AppOutline />,
  },
  {
    path: '/message',
    title: '消息列表',
    text: '消息',
    icon: <MessageOutline />,
  },
  {
    path: '/personal',
    title: '用户中心',
    text: '个人',
    icon: <UserOutline />,
  }])
  const userid = Cookies.get('userid')
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
      // 根据访问路径初始化页面内容
      const navItem = navList.find(nav => nav.path === path)
      if (user.type === 'boss') {
        console.log('...')
        navList[1].hide = true
        setNavlist(navList)
      } else {
        console.log('...')
        navList[0].hide = true
        setNavlist(navList)
      }
      if (navItem) setNav(navItem)
      if (path === '/') {
        console.log('请求的是根路径，需要计算最终路径')
        path = getRedirectTo(user.type, user.header)
        //判断是否是4个界面之一
        const navItem = navList.find(nav => nav.path === path)
        setNav(navItem)
        navigate(path)
      }
    }
  }, [user, location])

  return (
    <>
      {nav ?
        <div className='main'>
          <div className='top'>
            {content}
            <NavBar back={null} className="my-navbar">{nav.title}</NavBar>
          </div>
          <div className='body'>
            <Outlet />
          </div>
          <div className='bottom'>
            <NavFooter navList={navList} />
          </div>
        </div> : <Outlet />}
    </>
  )
}

export default connect(
  state => ({ user: state.user }),
  { getUser }
)(Main)