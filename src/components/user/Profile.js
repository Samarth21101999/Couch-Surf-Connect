import React from 'react'
import { useRef } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Button, Avatar } from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';
import { updateProfile } from '../../actions/user';
const Profile = () => {
    const {state:{profile,currentUser},dispatch}=useValue();
     
    const nameRef=useRef();
    const emailRef=useRef();
    const handleClose=()=>{
        dispatch({
            type:'CLOSE_PROFILE'
        ,payload:{...profile,open:false}});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const name=nameRef.current.value;
        
        updateProfile(currentUser,{name, file:profile.file},dispatch);
        //pass user name and photo to the to new function in user actions

    }

    const handleChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            const photoURL=URL.createObjectURL(file);
            dispatch({type:'UPDATE_PROFILE',payload:{...profile,photoURL,file}});
            
        }
    }
    return (
    <Dialog
        open={profile.open}
        onClose={handleClose}>
        <DialogTitle>Profile
            <Close/>
            <IconButton sx={{position:'absolute',top:8,right:8, color:(theme)=>theme.palette.grey[500]}} onClick={handleClose}/>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                    You can update your profile here
                </DialogContentText>
                
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
                    defaultValue={currentUser?.result.name}
                    />
                    <label htmlFor='profilePhoto'>
                        <input accept='image/*' type='file' id='profilePhoto' style={{display:'none'}} onChange={handleChange}/>
                        <Avatar src={profile.photoURL} sx={{width:75,height:75,cursor:'pointer'}}/>
                        <Button variant='outlined' component='span'>
                            Upload a profile photo
                        </Button>
                    </label>
            </DialogContent>
            <DialogActions sx={{px:'19px'}}>
                <Button type="submit" variant="contained" endIcon={<Send/>}>
                    Update
                </Button>
            </DialogActions>
        </form>
        {/* <DialogActions sx={{justifyContent:'left', p:'5px 24px'}}>
                {isRegister ? 'Do you have an account? Sign in now': "Don't have an account? Register now"}
                <Button onClick={()=>setIsRegister(!isRegister)}>
                    {isRegister ? 'Login': 'Register'}
                </Button>
        </DialogActions>
        <DialogActions sx={{justifyContent:'center', py:'24px'}}>
            <GoogleOneTapLogin/>
        </DialogActions> */}
    </Dialog>
  )
}

export default Profile