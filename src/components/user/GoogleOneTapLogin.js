import { Google } from '@mui/icons-material'
import React from 'react'
import { useState } from 'react'
import { useValue } from '../../context/ContextProvider'
import { Button } from '@mui/material'
import {jwtDecode} from 'jwt-decode'
const GoogleOneTapLogin = () => {
  const [disabled, setDisabled] = useState(false);
  const {dispatch} = useValue();

  const handleResponse=(response)=>{
    const token=response.credential;
    const decodedToken=jwtDecode(token);
    const {sub:id, email, name, picture:imageURL}=decodedToken;
    dispatch({
      type:'UPDATE_USER',
      payload:{
        id,
        email,
        name,
        imageURL
      }
    })
    dispatch({
      type:'CLOSE_LOGIN',
    })
  }

  const handleGoogleLogin = () => {
    setDisabled(true);
    try{
      window.google.accounts.id.initialize({
        client_id:"257518355050-o7s9b68505qn3fseclh0fqj2q7q8fds0.apps.googleusercontent.com",
        callback: handleResponse
      });
      window.google.accounts.id.prompt((notification) => {
        if(notification.isNotDisplayed()){
          throw new Error('Try to clear the cookies or try again later!');
        }
        else if(notification.isSkippedMoment() || notification.isDismissedMoment()){
          setDisabled(false);
        }

      })
    }
    catch(err){
      dispatch({
        type:'UPDATE_ALERT',
        payload:{
          open:true,
          severity:'error',
          message:err.message
        }
      })
      console.log(err);
    }
  }
  return (
    <Button variant='outlined'
    startIcon={<Google/>}
    disabled={disabled}
    onClick={handleGoogleLogin}
   >
     Login With Google
    </Button>
  )
}

export default GoogleOneTapLogin