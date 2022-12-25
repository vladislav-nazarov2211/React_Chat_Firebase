import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter'
import { useContext } from 'react';
import { Context } from './index'
import preloader from './img/preloader.svg'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Container, Grid } from "@mui/material"

function App() {
  const {auth} = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return (
        <Container>
          <Grid container
                    style={{height: window.innerHeight - 50}}
                    alignItems={'center'}
                    justifyContent={'center'}
          >
            <img src={preloader} />
          </Grid>
        </Container>  
    ) 
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
