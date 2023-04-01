/*
主界面
 */
import React, { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {

  const navigate = useNavigate()
  useEffect(() => {
    //直接跳转
    navigate("/login")
    return () => {

    }
  }, [])

  return (
    <div>Main</div>
  )
}
