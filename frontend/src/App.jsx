import React, { useState } from 'react'
import Counter from './Pages/Counter'
import Authentication from './Pages/Authentication'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';

const App = () => {
  const [isAuthPopup, setIsAuthPopup] = useState(false);

  const userData = useSelector((state) => state.user.userData);
  
  return (
    <div className='w-full h-screen bg-gray-100'>
      <ToastContainer />
      <Navbar setIsAuthPopup={setIsAuthPopup} />
      <div className='w-full h-full flex item-center justify-center'>
        {
          isAuthPopup &&
          <Authentication setIsAuthPopup={setIsAuthPopup} />
        }

        {
          userData &&
          <Counter />
        }
      </div>
    </div>
  )
}

export default App