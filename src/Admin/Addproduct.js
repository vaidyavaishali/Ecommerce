import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Addproduct = () => {
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [category, setcategory] = useState("")
  const [price, setprice] = useState("")
  const [quantity, setquantity] = useState("")
  const [img, setimg] = useState("")
  const navigate = useNavigate();
  
  const addproduct = async (e) => {
    e.preventDefault();
    const productdata = new FormData()
    productdata.append("name", name)
    productdata.append("description", description)
    productdata.append("category", category)
    productdata.append("price", price)
    productdata.append("quantity", quantity)
    productdata.append("img", img)
    const response = await axios.post("http://localhost:8080/addproduct", productdata)
    console.log(response)
    if (response.status === 200) {
      navigate("/dashboard/admin/products")
    } else {
      alert("failed to addproduct")
    }

  }



  return (
    <div className='addproduct'>
      <form onSubmit={addproduct}>
        <input type='text' placeholder='Enter your Name' onChange={(e) => { setname(e.target.value) }} />
        <input type='text' placeholder='Enter your description' onChange={(e) => { setdescription(e.target.value) }} />
        <input type='text' placeholder='Enter your category' onChange={(e) => { setcategory(e.target.value) }} />
        <input type='text' placeholder='Enter your price' onChange={(e) => { setprice(e.target.value) }} />
        <input type='number' placeholder='Enter your quantity' onChange={(e) => { setquantity(e.target.value) }} />
        <input type='file' onChange={(e) => setimg(e.target.files[0])} />
        <button>Add Product</button>

      </form>
    </div>
  )
}

export default Addproduct
