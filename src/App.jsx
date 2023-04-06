import React from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './containers'

export default function App() {
    //根据路由表生成对应的路由规则
    const element = useRoutes(routes)
    return (
        <>
            {element}
        </>
    )
}
