import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
import Privateroute from './route/Privateroute'
import Userdashboard from './user/Userdashboard'
import Adminroute from './route/Adminroute'
import Admindashboard from './Admin/Admindashboard'
import Edituser from './user/Edituser'
import Addproduct from './Admin/Addproduct'
import Products from './Admin/Products'
import EditProduct from './Admin/Editproduct'
import Productdetail from './Pages/Productdetail'
import CartPage from './Pages/CartPage'
import Orders from './user/Orders'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/product/:id' element={<Productdetail />} />
        <Route path='/cart' element={<CartPage />} />
        {/* -------------------------------------------------------private routes----------------------- */}
        <Route path='/dashboard' element={<Privateroute />}>
          <Route path='user' element={<Userdashboard />} />
          <Route path='user/edit' element={<Edituser />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<Adminroute />}>
          <Route path='admin' element={<Admindashboard />} />
          <Route path='admin/addproduct' element={<Addproduct />} />
          <Route path='admin/products' element={<Products />} />
          <Route path='admin/editproduct/:id' element={<EditProduct />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
