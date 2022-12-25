import { AppBar, Grid, Toolbar, Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from './../utils/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from './../index'
import { useContext } from 'react'

const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <AppBar color="primary" position="absolute">
            <Toolbar variant={"dense"}>
                <Grid container justifyContent={"flex-end"}>
                    {user ?
                        <Button onClick={() => {auth.signOut()}} variant={"outlined"} color="inherit">EXIT</Button>    
                    :   
                        <NavLink to={LOGIN_ROUTE} style={{textDecoration: "none"}}>
                            <Button variant={"outlined"} color="inherit">Login</Button>
                        </NavLink>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar