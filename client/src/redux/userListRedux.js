import {createSlice} from "@reduxjs/toolkit";
//import cartRedux from "./cartRedux";

//const userRedux = createSlice({
 const userListRedux = createSlice({
  name: "userList",
  initialState:{
    currentUser : [], //should this be "[]"? was "null"
    isFetching: {}, //should this be "false"? was "{}"
    error: {} //should this be "false"? was "{}"
  },
  reducers: {
  //DELETE USER
deleteUserStart:(state)=>{
  state.isFetching=true
},
deleteUserSuccess:(state,action)=>{
  state.isFetching=false;
  state.currentUser=action.payload
},
deleteUserFailure:(state)=>{
  state.isFetching=false;
  state.error=true;
},
//ADD USER
addUserStart:(state)=>{
  state.isFetching=true
},
addUserSuccess:(state,action)=>{
  state.isFetching=false;
  state.currentUser=action.payload
},
addUserFailure:(state)=>{
  state.isFetching=false;
  state.error=true;
},
//Update 

updateUserStart: (state)=>{
  state.isFetching=true;
  state.error=false;
},
updateUserSuccess: (state,action)=>{
  state.isFetching=false;
  state.currentUser[
  state.currentUser.findIndex((item)=>item._id ===action.payload.id) ] = action.payload.User

},
updateUserFailure: (state)=>{
  state.isFetching=false;
  state.error=true;
}
  },
});

export const { 
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart
 } = userListRedux.actions

export default userListRedux.reducer;