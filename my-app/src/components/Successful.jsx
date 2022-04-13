import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import WithContext from './WithContext'

 function Successful() {
    const {user,setIsSignin} = useContext(UserContext)

    function handleLogout(){
        setIsSignin(false)
    }
  return (
    <div className=''>
        <div className='welcoming'>سلام {user.firstName}</div>
        <button className="mainBut" onClick={handleLogout}>خروج</button>
    </div>
  )
}

export default WithContext(Successful)
