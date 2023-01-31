import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user?.currentUser);


  return (
<Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products/:category" element={<ProductList/>}/>
      <Route path="/products" element={<ProductList/>}/>
      <Route path="/product/:id" element={<Product/>}/>
      <Route path="/cart" element={!user ? <Navigate to='/login'/>:<Cart/>}/>
      <Route path="/login" 
      element={user ? <Navigate to="/"/> : <Login/>}/>
      <Route path="/register" 
      element={user ? <Navigate to="/"/> : <Register/>}/>
      <Route  path="/success" element={!user ? <Navigate to='/login'/> :<Success/>}/>
</Routes>
)
};


export default App;