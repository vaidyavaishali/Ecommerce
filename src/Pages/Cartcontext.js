import React, { useState, useEffect, createContext, useContext, Children } from 'react'
// import { json } from 'react-router-dom';


const Cartcontext = createContext()
const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        let existitem = localStorage.getItem("cart")
        if (existitem) setCart(JSON.parse(existitem)); 
    }, [])
    return (
        <Cartcontext.Provider value={[cart, setCart]}>
            {children }
        </Cartcontext.Provider>
    )
}
//-----------------custom hook---------------------------------------//

const useCart = () => useContext(Cartcontext)

export { useCart, CartProvider };
