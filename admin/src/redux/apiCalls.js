import { publicRequest, userRequest } from '../requestMethods';
import {   
  loginStart, 
  loginSuccess,
  loginFailure,
 } from "./userRedux";
import { 
  getProductStart, 
  getProductSuccess, 
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
 } from "./productRedux";
import { addUserStart, addUserSuccess, addUserFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure} from './userListRedux';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try{
    const res = await publicRequest.post("/auth/login",user);
    dispatch(loginSuccess(res.data));
  }catch(err){
    dispatch(loginFailure())
  }
};
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try{
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  }catch(err){
    dispatch(getProductFailure());
  }
};
export const deleteProduct = async ( id, dispatch ) => {
  dispatch(deleteProductStart());
  try{
    const res = await userRequest.delete(`/products/${id}`);
    if (res.data) { dispatch(deleteProductSuccess(id)) }
  }catch(err){
    console.log(err);
    dispatch(deleteProductFailure());
  }
};
export const updateProduct = async ( id, product, dispatch ) => { 
  dispatch(updateProductStart());
  try{
    //UPDATE
    const res = await userRequest.put(`/products/${id}`, product);
    if (res.data) {
      dispatch(updateProductSuccess({ id, product }));
      window.location.pathname = '/product'
    }
  }catch (err) {
    console.log(err);
    dispatch(updateProductFailure());
  }
};
export const addProduct = async ( product, dispatch ) => 
{ dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products/`, product);
    if (res.data) {
      dispatch(addProductSuccess(res.data));
    }
  }catch(err){
    console.log(err);
    dispatch(addProductFailure());

  }
};



//user

export const addUsers = async (dispatch) => {
  dispatch(addUserStart());
  try{
    const res = await userRequest.get("/users");
    dispatch(addUserSuccess(res.data));
  }catch(err){
    dispatch(addUserFailure());
  }
};
export const deleteUser = async ( id, dispatch ) => {
  dispatch(deleteUserStart());
  try{
    const res = await userRequest.delete(`/users/${id}`);
    if (res.data) { dispatch(deleteUserSuccess(id)) }
  }catch(err){
    console.log(err);
    dispatch(deleteUserFailure());
  }
};
export const updateUser = async ( id, user, dispatch ) => { 
  dispatch(updateUserStart());
  try{
    //UPDATE
    const res = await userRequest.put(`/users/${id}`, user);
    if (res.data) {
      dispatch(updateUserSuccess({ id, user }));
      window.location.pathname = '/user'
    }
  }catch (err) {
    console.log(err);
    dispatch(updateUserFailure());
  }
};
export const addUser = async ( user, dispatch ) => 
{ dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/users/`, user);
    if (res.data) {
      dispatch(addUserSuccess(res.data));
    }
  }catch(err){
    console.log(err);
    dispatch(addUserFailure());

  }
};