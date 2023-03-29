import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from "./redux/store";
import Register from "./containers/register/register";
import Main from "./containers/main/main";
import Login from "./containers/login/login";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/' element={<Main/>}></Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);