import React from 'react'
import { List, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { Settings, Logout } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import Profile from './Profile'
const UserMenu = ({anchorUserMenu, setAnchorUserMenu}) => {
    const {dispatch,state:{currentUser}}=useValue();
    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null)
    }
  return (
    <>
    <Menu
      anchorEl={anchorUserMenu}
      open={Boolean(anchorUserMenu)}
      onClose={(handleCloseUserMenu)}
      onClick={(handleCloseUserMenu)}
    >
    {!currentUser.google && 
      <MenuItem onClick={()=>dispatch({type:"UPDATE_PROFILE", payload:{open:true,file:null,photoURL:currentUser?.result.photoURL}})}>
        <ListItemIcon>
        <Settings fontSize="small" />
        </ListItemIcon>
        Profile
    </MenuItem>  
    }                                                                          
    <MenuItem onClick={()=>dispatch({type:'UPDATE_USER', payload:null})}>
        <ListItemIcon>
        <Logout fontSize="small" />
        </ListItemIcon>
        Logout
    </MenuItem>
    </Menu>
    <Profile/>   
    </> 
  )
}

export default UserMenu