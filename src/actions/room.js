import fetchData from './utils/fetchData';

const url='http://localhost:5000/'+'room';

export const createRoom=async(room,currentUser,dispatch,setPage)=>{
    dispatch({type:'START_LOADING'});

    const result=await fetchData({url,method:'POST',body:room, token:currentUser.token},dispatch);

    if(result){
        dispatch({type:'UPDATE_ALERT',payload:{open:true,severity:'success',message:'Room Created Successfully'}});
        dispatch({type:'RESET_ROOM'});    
        setPage(0);
    }

    dispatch({type:'END_LOADING'});
}

export const getRooms=async(dispatch)=>{
    const result=await fetchData({url,method:'GET'},dispatch);
    if(result){
        dispatch({type:'UPDATE_ROOMS',payload:result.result});
    }
}