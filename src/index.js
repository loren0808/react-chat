import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./redux/store"
import Register from "./containers/register/register"
import Main from "./containers/main/main"
import Login from "./containers/login/login"
import BossInfo from './containers/boss-info/boss-info'
import ExpertInfo from './containers/expert-info/expert-info'
import "./assets/css/base.less"
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>
                {/* 根路径下的子路由 */}
                <Route path='/' element={<Main />}>
                    <Route path='bossinfo' element={<BossInfo />}></Route>
                    <Route path='expertinfo' element={<ExpertInfo />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);