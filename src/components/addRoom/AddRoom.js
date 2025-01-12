import { Stepper, Container, Step, StepButton,StepLabel, StepConnector, Stack, Button, Box } from '@mui/material'
import React from 'react'
import { useState, useRef, useEffect, useCallback } from 'react'
import AddLocation  from './addLocation/AddLocation'
import AddDetails from './addDetails/AddDetails'
import AddImages from './addImages/AddImages'
import { useValue } from '../../context/ContextProvider'
import { Send } from '@mui/icons-material'
import { createRoom } from '../../actions/room'

const AddRoom = ({setPage}) => {
    // const{state:{images, details, location}}=useValue();
    const { state: { images, details, location, currentUser },dispatch } = useValue();

    const [activeStep,setActiveStep]=useState(0);
    const[steps,setStep]=useState([
    {label:'Location',completed:false},
    {label:'Details',completed:false},
    {label:'Images',completed:false}

    ])

    const [showSubmit,setShowSubmit]=useState(false);
    

    const handleNext=()=>{
        if(activeStep<steps.length-1){
            setActiveStep((activeStep)=>activeStep+1)
            //setStep(steps.map((step,index)=>index===activeStep?{...step,completed:true}:step))
        }else{
            const stepIndex=findUnfinished();
            setActiveStep(stepIndex);
        }
    }

    const checkDisabled=()=>{
        if(activeStep<steps.length-1){
            
            return false
        }
        const index=findUnfinished();
        
        if(index===-1){
            return false
        }
    }
    const findUnfinished=useCallback(()=>{
        return steps.findIndex(step=>!step.completed);
    })

        
    useEffect(()=>{
        if(images.length){
            if(!steps[2].completed) setComplete(2,true)
        }else{
            if(steps[2].completed) setComplete(2,false)
        }
    },[images, steps])
 
    useEffect(()=>{
        if(details.title.length>4 && details.description.length>9){
            if(!steps[1].completed) setComplete(1,true)
        }else{
            if(steps[1].completed) setComplete(1,false)
        }
    },[details, steps])

    useEffect(() => {
        if (location.lng || location.lat) {
          if (!steps[0].completed) setComplete(0, true);
        } else {
          if (steps[0].completed) setComplete(0, false);
        }
      }, [location, steps]);

    const setComplete=(index,status)=>{
        setStep((steps)=>{
            const newSteps=[...steps]
            newSteps[index].completed=status
        return newSteps});
        };
        
    useEffect(()=>{
      if(findUnfinished()===-1){
        if(!showSubmit){ setShowSubmit(true)}
      }
      else{
        if(showSubmit){ setShowSubmit(false)}
      }},[findUnfinished, showSubmit, steps])   

      const handleSubmit=()=>{
        const room={
          lng:location.lng,
          lat:location.lat,
          price:details.price,
          title:details.title,
          description:details.description,
          images:images,
        }
        createRoom(room,currentUser,dispatch,setPage);
      };


    return (
    <Container sx={{my:4}}>
        <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{mb:3}}>
            {steps.map((step,index) => (
                <Step key={step.label} completed={step.completed} >
                <StepLabel>{step.label}</StepLabel>
                <StepConnector></StepConnector>
                    <StepButton onClick={()=>setActiveStep(index)}></StepButton>
                </Step>
            ))
            }
            </Stepper>
            <Box sx={{pb:7,}}>
                {{
                    0:<AddLocation/>,
                    1:<AddDetails/>,
                    2:<AddImages/>
                }[activeStep]}
            
            <Stack direction='row' sx={{pt:2,pb:7,justifyContent:'space-around'}}>
                <Button color="inherit" disabled={!activeStep} onClick={() => {
                    setActiveStep(activeStep => activeStep - 1);
                    //setStep(steps.map((step, index) => index === activeStep - 1 ? {...step, completed: false} : step));
                }}>Back</Button>
                <Button onClick={handleNext} disabled={checkDisabled()}>Next</Button>
            </Stack>
            {showSubmit && 
              <Stack sx={{alignItems:'center'}}>
                <Button
                variant='contained'
                endIcon={<Send/>}
                onClick={handleSubmit}>Submit</Button>
              </Stack>
            }
            </Box>
    </Container>
  )
}
export default AddRoom
// import {
//     Box,
//     Button,
//     Container,
//     Stack,
//     Step,
//     StepButton,
//     Stepper,
//   } from '@mui/material';
//   import React, { useEffect, useState } from 'react';
//   import { useValue } from '../../context/ContextProvider';
//   import AddDetails from './addDetails/AddDetails';
//   import AddImages from './addImages/AddImages';
//   import AddLocation from './addLocation/AddLocation';
  
//   const AddRoom = () => {
//     const {
//       state: { images, details, location },
//     } = useValue();
//     const [activeStep, setActiveStep] = useState(0);
//     const [steps, setSteps] = useState([
//       { label: 'Location', completed: false },
//       { label: 'Details', completed: false },
//       { label: 'Images', completed: false },
//     ]);
//     const handleNext = () => {
//       if (activeStep < steps.length - 1) {
//         setActiveStep((activeStep) => activeStep + 1);
//       } else {
//         const stepIndex = findUnfinished();
//         setActiveStep(stepIndex);
//       }
//     };
//     const checkDisabled = () => {
//       if (activeStep < steps.length - 1) return false;
//       const index = findUnfinished();
//       if (index !== -1) return false;
//       return true;
//     };
//     const findUnfinished = () => {
//       return steps.findIndex((step) => !step.completed);
//     };
  
//     useEffect(() => {
//       if (images.length) {
//         if (!steps[2].completed) setComplete(2, true);
//       } else {
//         if (steps[2].completed) setComplete(2, false);
//       }
//     }, [images, steps]);
//     useEffect(() => {
//       if (details.title.length > 4 && details.description.length > 9) {
//         if (!steps[1].completed) setComplete(1, true);
//       } else {
//         if (steps[1].completed) setComplete(1, false);
//       }
//     }, [details, steps]);
//     useEffect(() => {
//       if (location.lng || location.lat) {
//         if (!steps[0].completed) setComplete(0, true);
//       } else {
//         if (steps[0].completed) setComplete(0, false);
//       }
//     }, [location, steps]);
//     const setComplete = (index, status) => {
//       setSteps((steps) => {
//         steps[index].completed = status;
//         return [...steps];
//       });
//     };
//     return (
//       <Container sx={{ my: 4 }}>
//         <Stepper
//           alternativeLabel
//           nonLinear
//           activeStep={activeStep}
//           sx={{ mb: 3 }}
//         >
//           {steps.map((step, index) => (
//             <Step key={step.label} completed={step.completed}>
//               <StepButton onClick={() => setActiveStep(index)}>
//                 {step.label}
//               </StepButton>
//             </Step>
//           ))}
//         </Stepper>
//         <Box>
//           {
//             {
//               0: <AddLocation />,
//               1: <AddDetails />,
//               2: <AddImages />,
//             }[activeStep]
//           }
//         </Box>
//         <Stack
//           direction="row"
//           sx={{ pt: 2, pb: 7, justifyContent: 'space-around' }}
//         >
//           <Button
//             color="inherit"
//             disabled={!activeStep}
//             onClick={() => setActiveStep((activeStep) => activeStep - 1)}
//           >
//             Back
//           </Button>
//           <Button disabled={checkDisabled()} onClick={handleNext}>
//             Next
//           </Button>
//         </Stack>
//       </Container>
//     );
//   };
  
//   export default AddRoom;