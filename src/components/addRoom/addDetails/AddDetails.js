import React from 'react'
import { FormControl, FormControlLabel, RadioGroup, Stack, TextField, Radio, InputAdornment } from '@mui/material'
import { useValue } from '../../../context/ContextProvider';
import { useState } from 'react';
import InfoField from './InfoField';

const AddDetails = () => {

    const{state:{details:{title,description,price}},dispatch}=useValue();
    const [costType, setCostType] = useState(price?1:0);
    const handleCostTypeChange=(e)=>{
        const costType=e.target.value;
        setCostType(costType);
        if(costType===0){
            dispatch({type:'UPDATE_DETAILS', payload:{price:0}})
            return
        }else{
            dispatch({type:'UPDATE_DETAILS', payload:{price:15}})
        }
        
    }
    const handlePriceChange=(e)=>{
        dispatch({type:'UPDATE_DETAILS', payload:{price:e.target.value}})
    }
  return (
    <Stack sx={{alignItems:'center',"& .MuiTextField-root": { width:'100%', maxWidth:500, m:1}}}>
        <FormControl>
            <RadioGroup
            name='costType'
            value={costType}
            row
            onChange={handleCostTypeChange}>
                <FormControlLabel value={0} control={<Radio/>} label='Free Stay'/>
                <FormControlLabel value={1} control={<Radio/>} label='Nominal Fee'/>
                {Boolean(costType)&&(
                <TextField 
                    name='price' 
                    sx={{width:'7ch !important'}}
                    variant='standard'
                    InputProps={{startAdornment:(<InputAdornment position='start'>$</InputAdornment>)}}
                    inputProps={{type:'number',min:1,max:50}}
                    value={price}
                    onChange={handlePriceChange}
                />)}
            </RadioGroup>
            <InfoField mainProps={{name:'title',label:'Title',value:title}}
                minLength={5}
            />
            <InfoField mainProps={{name:'description',label:'Description',value:description}}
                minLength={10}
                optionalProps={{multiline:true,rows:4}}
            />
        </FormControl>
    </Stack>
  )
}

export default AddDetails