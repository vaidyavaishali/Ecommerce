import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Adminmenu from '../Components/Adminmenu'
import { useNavigate } from 'react-router-dom'
const Products = () => {

    const [product, setproduct] = useState([])
    const navigate = useNavigate();

    async function productDelete (id){
    const response = await axios.delete(`http://localhost:8080/deleteproduct/${id}`)
    if(response.status === 200){
        allproduct();
    }else{
        alert("product not deleted")
    }
}

    console.log(product)
    const allproduct = async () => {
        const response = await axios.get("http://localhost:8080/allproduct")
        // console.log(response)
        if (response.status === 200) {
            setproduct(response.data.products)
        }

    }

    useEffect(() => {
        allproduct();
    }, [])

    return (
        <div className='adminmenu'>
            <Adminmenu />
            <h1>All Your Products</h1>
            <table>
                <thead>
                    <tr className='tbody-child'>
                        <th>S No</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Image</th>
                        <th className='action-btn'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map((val, index) => (
                           
                                <tr className='tboady-child'>
                                    <td>{index + 1}</td>
                                    <td>{val.name}</td>
                                    <td>{val.category}</td>
                                    <td>{val.price}</td>
                                    <td>{val.quantity}</td>
                                    <td>
                                        <img src={`http://localhost:8080/uploads/${val.img}`} width={200} />
                                    </td>
                                   <td className='action'>
                                    <td className='action1' onClick={()=>{navigate(`/dashboard/admin/editproduct/${val._id}`)}}>Edit</td>{" "}
                                    <td className='action2' onClick={()=>productDelete(val._id)}>Delete</td>
                                   </td>
                                </tr>
                            

                        ))
                    }
                </tbody>
            </table>
            {/* {product[0]} */}

        </div>
    )
}

export default Products
