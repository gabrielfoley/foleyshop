import {createSlice} from "@reduxjs/toolkit";
//import cartRedux from "./cartRedux";

//const userRedux = createSlice({
 const userRedux = createSlice({
  name: "user",
  initialState:{
    currentUser : null, //should this be "[]"? was "null"
    isFetching: {}, //should this be "false"? was "{}"
    error: {} //should this be "false"? was "{}"
  },
  reducers: {
    //LOGIN 
    loginStart:(state)=>{
      state.isFetching=true
    },
    loginSuccess:(state,action)=>{
      state.isFetching=false;
      state.currentUser=action.payload
    },
    loginFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
//LOGOUT
    },
    logoutStart:(state)=>{
      state.isFetching=true
    },
    logoutSuccess:(state,action)=>{
      state.isFetching=false;
      state.currentUser=action.payload
    },
    logoutFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
 } = userRedux.actions

export default userRedux.reducer;