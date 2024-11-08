import React, { useEffect, useState } from 'react'
import { useAuth } from '../Pages/UserContext'
import axios from 'axios'
const Orders = () => {
    const [order, setOrder] = useState([])
    const [userauth, setuserauth] = useAuth()

    const getOrders = async()=>{
        try {
            const {data} = await axios.get("http://localhost:8080/userorders")
            console.log(data)
            setOrder(data)
            
        } catch (error) {
           console.log(error) 
        }
    }

    useEffect(()=>{
        if(userauth?.token) getOrders();
    }, [userauth?.token])


  return (
    <div>
      
    </div>
  )
}

export default Orders
