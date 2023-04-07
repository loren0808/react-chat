import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./redux/store"
import "./assets/css/base.less"
import App from './App'

// socketio test
// import './test/socketio_test'

const root = ReactDOM.createRoot(document.getElementById('root'))
// const element = useRoutes(routes)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);