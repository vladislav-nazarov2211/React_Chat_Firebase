import { Container, Grid, Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = (login, pass) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, login, pass)
    }

    return ( 
        <Container>
            <Grid 
                style={{height: window.innerHeight - 50}}
                container
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Grid style={{width: 700, borderRadius: "10px", background: '#ffffff', border: "3px solid #1976d2"}}
                    container 
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box p={2}>
                        <TextField
                            style={{margin: 5}}
                            id="outlined-uncontrolled"
                            label="Email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <TextField
                            style={{margin: 5}}
                            id="outlined-uncontrolled"
                            label="Password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                        <Button
                            style={{margin: 5, marginTop: 15}}
                            onClick={() => {login(email, password)}}
                            variant={"outlined"}
                        >Войти</Button>
                    </Box>    
                </Grid>   
            </Grid>
        </Container>
    )
}

export default Login