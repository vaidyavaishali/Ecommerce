import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../Pages/UserContext'
const Privateroute = () => {
    const [ok, setok] = useState(false);
    const [userauth, setuserauth] = useAuth()
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("http://localhost:8080/loginverify")
            if (res.data.ok) {
                setok(true)
            } else {
                setok(false)
            }
        }
        if (userauth?.token) authCheck();


    }, [userauth?.token])
    return (
        <div>
            {ok ? <Outlet /> : "loading........."}

        </div>
    )
}

export default Privateroute
