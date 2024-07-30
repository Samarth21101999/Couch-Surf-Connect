import React from 'react'
import {AppBar, Box, IconButton, Container, Toolbar, Typography, Button} from '@mui/material'
import {Lock, Menu} from '@mui/icons-material'
import imageURL from '../logo192.png'
import {useValue} from '../context/ContextProvider'
import UserIcons from './user/UserIcons'
const user={name:'test', imageURL}
const NavBar = () => {
    const {
        state:{currentUser},
        dispatch} = useValue();
  return (
    <AppBar sx={{ bgcolor: "#000000" }}>
        <Container maxWidth='xl' >
            <Toolbar disableGutters>
                <Box>
                    <IconButton size='large' color='inherit'>
                        <Menu />
                    </IconButton>
                </Box>
                <Typography 
                    variant='h6' 
                    component='h1' 
                    noWrap
                    sx={{ flexGrow: 1, display:{xs:'none',md:'flex'} }}>
                    CouchSurfConnect
                </Typography>
                <Typography 
                    variant='h6' 
                    component='h1' 
                    noWrap
                    sx={{ flexGrow: 1, display:{xs:'flex',md:'none'} }}>
                    CSC
                </Typography>
                {!currentUser ? (<Button 
                    color='inherit'
                    startIcon={<Lock/>}
                    onClick={()=>{
                        dispatch({
                            type:'OPEN_LOGIN',
                            payload: user
                        })
                    }}>
                    Login
                </Button>):(
                    <UserIcons/>
                )}
                
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default NavBar