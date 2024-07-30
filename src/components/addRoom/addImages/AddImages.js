import { Paper } from '@mui/material'
import React, { useCallback } from 'react'
import {useState} from 'react'
import {useDropzone} from 'react-dropzone'
import ProgressList from './progressList/ProgressList'
import ImageLists from './ImageLists'
const AddImages = () => {
    const [files,setFiles]=useState([]);
    const onDrop=useCallback((acceptedFiles)=>{
        setFiles(acceptedFiles.map(file=>Object.assign(file,{
            preview:URL.createObjectURL(file)
        })))
    },[])
    const {getRootProps,getInputProps, isDragActive}=useDropzone({onDrop,
        accept:{'image/*':[]}
    })
    
  return (
    <>
        <Paper sx={{cursor:'pointer', background:'#fafafa', color:'#bdbdbd', border:'1px dashed #ccc', '&:hover':{border:'1px solid #ccc'} }}> 
        <div style={{padding:'16px'}} {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? (
                <p style={{color:'green'}}>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
            <em>(Images with *.jepg, *.jpg, *.png extension will be accepted)</em>
        </div>
    </Paper>
    <ProgressList {...{files}} />
    <ImageLists/>
    </>
  )
}

export default AddImages