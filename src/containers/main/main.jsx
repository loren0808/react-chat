/*
主界面
 */
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { getRedirectTo, MainContext } from '../../utils'
import { getUser } from '../../redux/actions'
import { NavBar } from 'antd-mobile'
import NavFooter from '../../components/nav-footer/nav-footer'
import {
  AppOutline,
  MessageOutline,
  UserOutline,
} from 'antd-mobile-icons'


function Main({ user, getUser, unReadCount }) {
  const [nav, setNav] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const contextValue = { setNav }
  const [navList, setNavlist] = useState([{
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
  useEffect(() => {
    const userid = Cookies.get('userid')
    if (!userid) {
      // 尚未登录
      navigate('/login')
    }
    if (!user._id) {
      // redux 获取用户信息
      getUser()
    } else {
      let path = location.pathname
      // 根据访问路径初始化页面内容
      // 针对chat页面不属于4个界面之一，nav为空直接渲染子路由chat
      const navItem = navList.find(nav => nav.path === path)
      setNav(navItem)
      if (user.type === 'boss') {
        navList[1].hide = true
        setNavlist(navList)
      } else {
        navList[0].hide = true
        setNavlist(navList)
      }
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
  // 第二个outlet渲染bossinfo和expertinfo
  return (
    <>
      {nav ?
        <div className='main'>
          <div className='top'>
            <NavBar back={null} className="my-navbar">{nav.title}</NavBar>
          </div>
          <div className='body'>
            <MainContext.Provider value={contextValue}>
              <Outlet context={MainContext} />
            </MainContext.Provider>
          </div>
          <div className='bottom'>
            <NavFooter navList={navList} unReadCount={unReadCount} />
          </div>
        </div> : <Outlet />}
    </>
  )
}

export default connect(
  state => ({ user: state.user, unReadCount: state.chat.unReadCount }),
  { getUser }
)(Main)