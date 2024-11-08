import React from 'react'
import Usermenu from '../Components/Usermenu'
import { useAuth } from '../Pages/UserContext'
const Userdashboard = () => {
  const [userauth, setuserauth] = useAuth();

  return (
    <div className='dashboard'>
      <Usermenu />
      <div className='user-details'>
      <h1>User Details</h1>
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

export default Userdashboard
