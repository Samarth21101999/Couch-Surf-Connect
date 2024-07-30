import { Avatar, Box, Badge, Icon, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import {Mail, Notifications} from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import UserMenu from './UserMenu'
const UserIcons = () => {
    const {state:{currentUser}} = useValue()
    const [anchorUserMenu, setAnchorUserMenu] = useState(null)
  return (
    <Box>
        <IconButton size='large' color='inherit'>
            <Badge color='error' badgeContent={5}>
                <Mail/>
            </Badge>
        </IconButton>
        <IconButton size='large' color='inherit'>
            <Badge color='error' badgeContent={20}>
                <Notifications/>
            </Badge>
        </IconButton>
        <Tooltip title='Open User Settings'>
        
            <IconButton onClick={(e)=>setAnchorUserMenu(e.currentTarget)} size='large' color='inherit'>
                <Avatar src={currentUser?.result.photoURL} alt={currentUser?.result.name}>
                    {currentUser?.result.name.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>
        
        </Tooltip>
        
        <UserMenu {...{anchorUserMenu,setAnchorUserMenu}} />
    </Box>
  )
}

export default UserIcons