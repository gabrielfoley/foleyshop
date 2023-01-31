import {createSlice} from "@reduxjs/toolkit";
//import cartRedux from "./cartRedux";

const userRedux = createSlice({
  name: "user",
  initialState:{
    currentUser : null,
    isFetching: {},
    error: {}
  },
  reducers: {
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
    },
    signupStart:(state)=>{
      state.isFetching=true
    },
    signupSuccess:(state,action)=>{
      state.isFetching=false;
      state.currentUser=action.payload
    },
    signupFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
    logout: (state) =>{
      state.currentUser = null
      state.error = {}
      state.isFetching ={};
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, signupFailure, signupSuccess, signupStart } = userRedux.actions
export default userRedux.reducer;