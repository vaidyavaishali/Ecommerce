
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
const AuthContext = createContext();


const UserContext = ({children}) => {
    const [userauth, setuserauth] = useState({
        user:null,
        token:""
    
    })

    axios.defaults.headers.common["Authorization"]=userauth?.token



    useEffect(()=>{
        const userData = localStorage.getItem("auth")
        if(userData){
            const parseData = JSON.parse(userData)
            setuserauth({...useAuth, user:parseData.user, token:parseData.token})
        }
    }, [])

  return (
    <div>
     <AuthContext.Provider value={[userauth, setuserauth]}>
        {children}
     </AuthContext.Provider>
    </div>
  )
}
//custom hook
const useAuth = ()=>useContext(AuthContext);

export {useAuth, UserContext}
