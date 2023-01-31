import "./newUser.css";
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from 'react-redux';
import { addUserStart, addUserSuccess, addUserFailure } from "../../redux/userListRedux";
import { userRequest } from "../../requestMethods";


export default function NewUser() {
  const [ inputs, setInputs] = useState({});
  const [ file, setFile] = useState(null);
  const [ cat, setCat] = useState([]);
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (e) => { 
    setInputs((prev) => {
      return {...prev, [e.target.name]: e.target.value };
    })
   }
   const handleCat = (e) => { 
    setCat(e.target.value.split(","));
   };
const randomImg = 'https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo='
   const handleClick = (e) => {
    e.preventDefault()
    const fileName = new Date().getTime() + (file?.name || randomImg)
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, (file || randomImg));

    //----------------------------------------------------------------
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    
// Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
            default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         const currentUser = { ...inputs, img: downloadURL, categories: cat };
          
        /*addProduct(product, dispatch).then((res) => {
            console.log(res.status);
          })*/

          const addUser = async () => 
      { dispatch(addUserStart());
        try {
          const res = await userRequest.post(`/users/`, currentUser);
          if (res.data) {
           dispatch(addUserSuccess(res.data));
           setError(false)
         }
          }catch(err){
        console.log(err);
          dispatch(addUserFailure());
          setError(true)

         }
};
currentUser && addUser()
     

        });
      }
    );
   }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
        <label>Image</label>
          <input 
          type="file" 
          id="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          />
          <label>Username</label>
          <input type="text" placeholder="john" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" onChange={handleChange} />
        </div>

        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="newUserButton">Create</button>
        {error && <div>name already exists</div>}
      </form>
    </div>
  );
}
