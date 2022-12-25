import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from './../index'
import { privateRoutes, publicRoutes } from '../routes'

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
        
    return (
        <Routes>
            {user ? 
                (privateRoutes.map((item, index) => <Route key={index} path={item.path} element={<item.component to={item.redirect ? item.redirect : ''}/>} />))
            :
                (publicRoutes.map((item, index) => <Route key={index} path={item.path} element={<item.component to={item.redirect ? item.redirect : ''}/>} />))
            }      
        </Routes>
    )
}

export default AppRouter