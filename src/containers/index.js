import Register from "./register/register"
import Main from "./main/main"
import Login from "./login/login"
import BossInfo from './boss-info/boss-info'
import ExpertInfo from './expert-info/expert-info'
import Boss from './boss/boss'
import Expert from './expert/expert'
import NotFound from '../components/not-found/not-found'
import Personal from './personal/personal'
import Message from './message/message'
import Chat from './chat/chat'

export const routes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "chat/:userid",
        element: <Chat />,
    },
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "bossinfo",
                element: <BossInfo />,
            },
            {
                path: "expertinfo",
                element: <ExpertInfo />,
            },
            {
                path: "boss",
                element: <Boss />,
            },
            {
                path: "expert",
                element: <Expert />,
            },
            {
                path: "personal",
                element: <Personal />,
            },
            {
                path: "message",
                element: <Message />,
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ],
    },
]