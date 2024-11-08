import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useAuth } from './UserContext'
import { useCart } from './Cartcontext';
const HomePage = () => {
  const [userauth, setuserauth] = useAuth();
  const [product, setproduct] = useState([])
  const [cart, setCart] = useCart();
  const navigate = useNavigate()

  function addtocart(val){
   setCart([...cart, val])
   localStorage.setItem("cart", JSON.stringify([...cart, val]))
   alert("item add to cart")
  }



  async function allproduct(){
    const response = await axios.get('http://localhost:8080/allproduct')
    if(response.status === 200){
      // console.log(response)
      setproduct(response.data.products)
    }
  }
  // console.log(product)

useEffect(()=>{
  allproduct()

}, [])

  return (
    <div className='parent'>
      {product.map((val, i)=>{
        return(
          <div className='child' key={i}>
            <img src={`http://localhost:8080/uploads/${val.img}`} width={200} height={200}/>
            <p>{val.description}</p>
            <h3>
              <span>
                Price:
              </span>
              {val.price}
            </h3>
            <button onClick={()=>navigate(`/product/${val._id}`)}>More Details</button>
            <button onClick={()=>addtocart(val)}>ADD TO CART</button>
          </div>
        )
      })}
      
    </div>
  )
}

export default HomePage
