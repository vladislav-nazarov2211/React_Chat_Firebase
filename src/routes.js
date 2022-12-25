import { LOGIN_ROUTE, CHAT_ROUTE } from "./utils/consts";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { Navigate } from "react-router-dom";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: Login
    },
    {
        path: '*',
        component: Navigate,
        redirect: LOGIN_ROUTE
    }
]

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        component: Chat
    },
    {
        path: '*',
        component: Navigate,
        redirect: CHAT_ROUTE
    }
]