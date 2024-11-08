import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from './UserContext'
import { useCart } from './Cartcontext'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react"

const CartPage = () => {
  const [userauth, setuserauth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setclientToken] = useState("");
  const [instance, setinstance] = useState("");
  const navigate = useNavigate();


  const removeCartItem = (pid) => {
    let mycart = [...cart];
    let index = mycart.findIndex((item) => (item._id === pid));
    mycart.splice(index, 1)
    setCart(mycart)
    localStorage.setItem("cart", JSON.stringify(mycart));

  }



  const handlepayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8080/braintree/payment", {
        nonce, cart
      })
      localStorage.removeItem("cart")
      setCart([])
      alert("payment successfull")
      navigate('/dashboard/user/orders')

    } catch (error) {
      console.log(error)
    }
  }




  const totalprice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error)
    }
  }


  const gettoken = async () => {
    try {
      console.log("hhh")
      const { data } = await axios.get("http://localhost:8080/braintree/token");

      console.log(data)
      setclientToken(data.clientToken)

    } catch (error) {
      console.log(error)
    }


  }
  useEffect(() => {
    gettoken();

  }, [userauth?.token])


  return (
    <div className='cartpage' >
      <h2>{!userauth?.user ? "Hello guest" : `Hello ${userauth?.token && userauth?.user.name}`}
        <p>
          {cart?.length ? `you have ${cart.length} items in  your cart ${userauth?.token ? "" : "please login to checkout"}` : "your cart is empty"}
        </p>
      </h2>
      <div className='parent-cart '>
        <div className='container'>
          {cart?.map((p, i) => {
            return (
              <>

                <div className='first' key={i}>
                  <img src={`http://localhost:8080/uploads/${p.img}`} width={200} height={200} />
                  <div>
                    <p><span> Product: <span> {p.name}</span> </span>
                    </p>
                    <p><span> Description: <span> {p.description}</span> </span>
                    </p>
                    <p><span> Price: <span> {p.price}</span> </span>
                    </p>

                    <button onClick={() => { removeCartItem(p._id) }}>Remove Item</button>
                  </div>

                </div>
              </>
            )
          })}
        </div>
        <div className='second'>
          <h2>Cart Summary</h2>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total:{totalprice()}</h4>

          {
            userauth?.user?.address ? (
              <>
                <div>
                  <h3>Current address</h3>
                  <h5>{userauth?.user?.address}</h5>
                  <button onClick={() => { navigate("/dashboard/user/edit") }}>Update Address</button>
                </div>
              </>
            ) : (
              <div>
                {
                  userauth?.token ? (
                    <button onClick={() => { navigate("/dashboard/user/edit") }}>Update Address</button>
                  ) : <button onClick={() => { navigate('/login') }}>Please Login to Checkout</button>
                }

              </div>
            )}
          <div>
            {!clientToken || !userauth?.token || !cart?.length} (
            ""
            ):(
            <>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault"
                  },
                }}

                onInstance={(instance) => setinstance(instance)} />
              <button disabled={!userauth?.user?.address || !instance} onClick={handlepayment}>
                Make Payment
              </button>

            </>
            )
          </div>

        </div>

      </div>

    </div>
  )
}

export default CartPage
