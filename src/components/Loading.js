import React from 'react'
import { useValue } from '../context/ContextProvider'
import { Backdrop, CircularProgress } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
const Loading = () => {
    const{state:{loading}}=useValue()
  return (
    <Backdrop
    open={loading}
    sx={{zIndex:(theme)=>theme.zIndex.modal+1}}>
        <CircularProgress sx={{color:'white'}}/>
    </Backdrop>
  )
}

export default Loading