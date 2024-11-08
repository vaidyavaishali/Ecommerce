import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from './Cartcontext';
const Productdetail = () => {
    const {id} = useParams();
    const [cart, setCart] = useCart()
    const [product, setproduct] = useState({});

  function addtoCart(val){
   setCart([...cart, val])
   localStorage.setItem("cart", JSON.stringify([...cart, val]))
   alert("item added successfully");

  }



    const singleproduct = async()=>{
        const { data } = await axios.get(`http://localhost:8080/singleproduct/${id}`);
        console.log(data)
        setproduct(data.product)
    }

    useEffect(()=>{
        singleproduct()
    },[])
  return (
    <div className='productdetail'>
        <img src={`http://localhost:8080/uploads/${product.img}`} width={200} height={200}/>
        <div className=''>
            <h2><span>Name:</span>{product.name}</h2>
            <h2><span>Description:</span>{product.description}</h2>
            <h2><span>Category:</span>{product.category}</h2>
            <h2><span>Price:</span>{product.price}</h2>
            <button onClick={()=>addtoCart(product)}>Add To Cart</button>
        </div>
    </div>
  )
}

export default Productdetail
