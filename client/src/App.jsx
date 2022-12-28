import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import { Route, Routes, Navigate, Link } from "react-router-dom";

const App = () => {
  const user = true
  return (
<Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products/:category" element={<Product/>}/>
      <Route path="/product/:id" element={<ProductList/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
      <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
      
      
</Routes>
)
};


export default App;