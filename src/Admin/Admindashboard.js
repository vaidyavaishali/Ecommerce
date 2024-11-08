import React from 'react'
import Adminmenu from '../Components/Adminmenu'
import { useAuth } from '../Pages/UserContext'

const Admindashboard = () => {
  const [userauth, setuserauth] = useAuth();

  return (
    <div className='dashboard'>
      <Adminmenu/>
      <div className='user-details'>
      <h1>Admin Details</h1>
      <h3>
        <span>Name:</span>{userauth?.user.name} </h3>
      <h3>
        <span>Email:</span>{userauth?.user.email}

      </h3>
      <h3>
        <span>Phone:</span>{userauth?.user.phone}

      </h3>
      <h3>
        <span>Address:</span>{userauth?.user.address}

      </h3>
      </div>
    



    </div>
  )
}

export default Admindashboard
