import React, { useState,useEffect,useRef } from 'react'
import {Box, Paper} from '@mui/material'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { AddLocationAlt, LocationOn, Bed } from '@mui/icons-material'
import ClusterMap from './map/ClusterMap'
import Rooms from './rooms/Rooms'
import AddRoom from './addRoom/AddRoom'
import Protected from './protected/protected'
const BottomNav = () => {
    const [value, setValue] = useState(0);
    const ref = useRef();
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);
  return (
    <Box ref={ref}>
        {{
            0:<ClusterMap/>,
            1:<Rooms/>,
            2:<Protected><AddRoom setPage={setValue} /></Protected>
        }[value]}
        <Paper
        elevation={3}
        sx={{position:'fixed',bottom:0,left:0,right:0,zIndex:2}}>
            <BottomNavigation
            showLabels
            value={value}
            onChange={(e,newValue)=>setValue(newValue)} >
            
                <BottomNavigationAction label='Map' icon={<LocationOn/>} />
                <BottomNavigationAction label='Rooms' icon={<Bed/>}/>
                <BottomNavigationAction label='Add' icon={<AddLocationAlt/>} />
                
            </BottomNavigation>
            
        </Paper>
    </Box>
  )
}

export default BottomNav