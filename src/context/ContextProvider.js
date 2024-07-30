import React from 'react'
import { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'
import Profile from '../components/user/Profile'
const intialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: {open:false,severity:'info',message:''},
  profile:{open:false, file:null, photoURL:''},
  images:[],
  details:{title:'',description:'',price:0},
  location:{lng:43.6532,lat:-79.3832},
}
const Context = React.createContext(intialState)

export const useValue = () => {
    return useContext(Context)
}

const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, intialState)
    return (
    <Context.Provider value={{state,dispatch}}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider