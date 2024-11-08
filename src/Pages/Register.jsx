import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [secreteanswer, setsecreteAnswer] = useState("")
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:8080/register", {
            name, email, phone, password, address, secreteanswer
        })
        if (response.status === 201) {
            alert("registration successfully")
            navigate('/login')
        } else {
            alert(`Registration Failed`)
        }

    }

    return (
        <div className='register'>
            <form onSubmit={register}>
                <input type='text' placeholder='enter your name' onChange={(e) => { setName(e.target.value) }} />
                <input type='email' placeholder='enter your email' onChange={(e) => { setemail(e.target.value) }} />
                <input type='password' placeholder='enter your password' onChange={(e) => { setpassword(e.target.value) }} />
                <input type='number' placeholder='enter your phone' onChange={(e) => { setphone(e.target.value) }} />
                <input type='text' placeholder='enter your address' onChange={(e) => { setaddress(e.target.value) }} />
                <input type='text' placeholder='enter your secret answer' onChange={(e) => { setsecreteAnswer(e.target.value) }} />
                <button>SignUp</button>
            </form>
        </div>
    )
}

export default Register
