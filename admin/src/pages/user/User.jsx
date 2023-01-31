import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";

import { useState } from "react";

import { updateUser } from '../../redux/apiCalls';
//import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//import app from "../../firebase";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
//import User from './User';


export default function User() {

  const location = useLocation()
  const dispatch = useDispatch()
  const userId = location.pathname.split("/")[2];
  const [ file, setFile] = useState([]);
  const [ inputs, setInputs] = useState({});



  const user = useSelector((state)=> state?.userList?.currentUser?.find((user) => user._id === userId)

  );
  console.log(user, "user");

  const randomImg = 'https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo='

  const handleChange = (e) => { 
      setInputs((prev) => {
        return {...prev, [e.target.name]: e.target.value };
      })
     }



     const handleClick = (e) => {
      e.preventDefault()
      
      const user = {_id: userId, ...inputs,};
           if (user !== {}) {
             updateUser(userId,user, dispatch)
             setTimeout(()=>{
               window.location.pathname = '/users'
    
             },400)
           } 
      
     }
      
  
  



  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img || randomImg}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
  
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">id: {user._id}</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <span className="userShowTitle">{user.isAdmin}</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
           
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name='username'
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="">Admin?</label>
               <select name="isAdmin">
                <option value="true">true</option>
                <option value="false">false</option>
               </select>
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.img || randomImg}
                  alt=""
                />
              </div>
              <button  onClick={handleClick} className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
