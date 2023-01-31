import React, { useState } from 'react'
import { useLocation } from "react-router"
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../redux/cartRedux';
import { userRequest } from '../requestMethods';
import { useSelector} from "react-redux";

const Success = () => {
  const cart = useSelector(state=>state.cart);
  const location = useLocation()
  const user = useSelector(state=>state.user?.currentUser)
  console.log(user._id);
const [orderId, setOrderId] = useState(null)
const [address, setAddress] = useState('')
const [fullName, setFullName] = useState('')


const handleSubmit = async(e) =>{
e.preventDefault()
try {
  const res = await userRequest.post('orders', { 
    userId: user._id,
    product: cart.products.map(({_id, quantity}) => ({
      productId: _id,
      quantity: quantity,
    })),
    amount: cart.total,
    address: address
  })
  setOrderId(res.data._id)
  setTimeout(() => {
    resetCart()
    window.location.replace('/')
  }, 10000);
} catch (error) {
  console.log(error)
}
}



  return (

    <div >
      { !orderId && <div >
    <label > fullname</label>
    <input type="text" placeholder="full name" onChange={(e) => setFullName(e.target.value)}/>
    <label>Order destination</label>
    <input type="text" placeholder="address" onChange={(e) => setAddress(e.target.value)}/>
      <button onClick={handleSubmit} >complete</button>
      </div>}
      { orderId &&
        <div > Payment successfull, {fullName} your order id is {orderId}, you will be redirected in 10 sec</div>
      }
    </div>
  )
}
export default Success