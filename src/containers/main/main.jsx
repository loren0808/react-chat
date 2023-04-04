/*
主界面
 */
import React, { useEffect } from 'react'
import { BrowserRouter, Route, useNavigate } from 'react-router-dom'
import BossInfo from '../boss-info/boss-info'
import ExpertInfo from '../expert-info/expert-info'

export default function Main() {

  const navigate = useNavigate()
  useEffect(() => {
    //直接跳转
    return () => {

    }
  }, [])

  return (
    <>
    </>
  )
}
