import React, { useEffect, useState } from 'react'
import {useValue} from '../../context/ContextProvider';
import { useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Button } from '@mui/material';
import { Send } from '@mui/icons-material';
import PasswordField from './PasswordField';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import { register, login } from '../../actions/user';
const Login = () => {
    const {state:{openLogin},dispatch} = useValue()
    const [title,setTitle]=useState('Login');
    const [isRegister,setIsRegister]=useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleClose = () => {
        dispatch({
            type:'CLOSE_LOGIN'
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const email=emailRef.current.value;
        
        const password=passwordRef.current.value;
        
        if(!isRegister){
            return login({email,password},dispatch)
        }
        const name=nameRef.current.value;
        const confirmPassword=confirmPasswordRef.current.value;
        
        if(password!==confirmPassword){
            dispatch({
                type:'UPDATE_ALERT',
                payload:{
                    open:true,
                    severity:'error',
                    message:'Password does not match'
                }
            })
            
        }
        register({name,email,password},dispatch)
        // dispatch({type:'START_LOADING'})
        // setTimeout(()=>dispatch({type:'STOP_LOADING'}),2000);

        //testing notification


        // if(password!==confirmPassword){
        //     dispatch({
        //         type:'UPDATE_ALERT',
        //         payload:{
        //             open:true,
        //             severity:'error',
        //             message:'Password does not match'
        //         }
        //     })
        //     return;
        // }
        // if(isRegister){
        //     setTitle('Register')        
        // }   
    }

    useEffect(()=>{
        isRegister ? setTitle('Register'):setTitle('Login')
    },[isRegister]);
  return (
    <Dialog
        open={openLogin}
        onClose={handleClose}>
        <DialogTitle>{title}
            <IconButton sx={{position:'absolute',top:8,right:8, color:(theme)=>theme.palette.grey[500]}} onClick={handleClose}/>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                    Please fill your information in the fields below:
                </DialogContentText>
                {isRegister &&
                <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    inputRef={nameRef}
                    inputProps={{minLength:2}}
                    required
                    />}
                    <TextField
                    autoFocus={!isRegister}
                    margin="normal"
                    variant="standard"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    inputRef={emailRef}
                    required/>
                    <PasswordField {...{passwordRef}}/>
                    {isRegister &&
                    <PasswordField passwordRef={confirmPasswordRef} id='confirmPassword' label='Confirm Password'/>
                    }
            </DialogContent>
            <DialogActions sx={{px:'19px'}}>
                <Button type="submit" variant="contained" endIcon={<Send/>}>
                    Submit
                </Button>
            </DialogActions>
        </form>
        <DialogActions sx={{justifyContent:'left', p:'5px 24px'}}>
                {isRegister ? 'Do you have an account? Sign in now': "Don't have an account? Register now"}
                <Button onClick={()=>setIsRegister(!isRegister)}>
                    {isRegister ? 'Login': 'Register'}
                </Button>
        </DialogActions>
        <DialogActions sx={{justifyContent:'center', py:'24px'}}>
            <GoogleOneTapLogin/>
        </DialogActions>
    </Dialog>
  )
}

export default Login