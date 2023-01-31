import { useState } from 'react'
import { useDispatch } from 'react-redux';
//import { login } from "../../redux/apiCalls";
import { loginFailure, loginStart, loginSuccess } from '../../redux/userRedux';
import { publicRequest } from '../../requestMethods';

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const handleClick = async(e)=>{
    e.preventDefault();
    //login(dispatch,{ username,password })
    dispatch(loginStart())
    try {
      const response = await publicRequest.post("/auth/login", {username, password})
      .then((res) =>{
        if (res.status === 200) {
          console.log("success")
          dispatch(loginSuccess(res.data))
          setError(false)
        }else if (res.status === 401){
          console.log(res.statusText)
          setError(true)
          dispatch(loginFailure())
        }
      })
    } catch (error) {
      setError(true) 
      dispatch(loginFailure())
    }
  }
  return (
    <div 
    style={{
      height: '100vh',
      display: "flex",
      flex:1,
      flexDirection:"column", 
      alignItems:"center", 
      justifyContent: "center",
      }}
      >
      <input 
      style={{padding:10,marginBottom:20,}}
      type="text" 
      placeholder="username" 
      onChange={e => setUsername(e.target.value)} 
      />
      <input 
      style={{padding:10,marginBottom:20,}}
      type="password" 
      placeholder="password" 
      onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleClick} style={{padding:10,width:100}}>Login</button>
      </div>
  )
}

export default Login