import {createSlice} from "@reduxjs/toolkit";
import cartRedux from "./cartRedux";

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
    logout: (state) =>{
      state.currentUser = null
      state.error = false
      state.isFetching =false;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userRedux.actions
export default cartRedux.reducer;