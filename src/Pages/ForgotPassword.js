import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setemail] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [secreteanswer, setsecreteanswer] = useState("")


    const navigate = useNavigate();

    const forgotpassword = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:8080/forgotpassword", {
            email, newpassword, secreteanswer
        })
        if (response.status === 200) {
            alert("forgotpassword successfully")
            navigate('/login')
        } else {
            alert("password updatation failed")
        }

    };

    return (
        <div className='forgotpassword'>
            <form onSubmit={forgotpassword}>
                <input type='email' placeholder='enter your email' onChange={(e) => { setemail(e.target.value) }} />
                <input type='password' placeholder='enter your new password' onChange={(e) => { setnewpassword(e.target.value) }} />
                <input type='text' placeholder='enter your secrete answer' onChange={(e) => { setsecreteanswer(e.target.value) }} />
                <button>Update Password</button>

            </form>
        </div>
    )
}

export default ForgotPassword
