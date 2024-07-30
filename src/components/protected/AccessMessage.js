import React from 'react'
import { Lock } from '@mui/icons-material'
import { Alert, Button, Container } from '@mui/material'
import { useValue } from '../../context/ContextProvider'
const AccessMessage = () => {
    const {dispatch}=useValue();
  return (
    <Container sx={{py:5}}>
        <Alert severity='error' variant='outlined'>You need to be logged in to access this page</Alert>
        <Button 
        variant='outlined' 
        sx={{ml:2}}
        startIcon={<Lock/>} 
        onClick={()=>dispatch({type:'OPEN_LOGIN'})}>Login</Button>
    </Container>
  )
}

export default AccessMessage