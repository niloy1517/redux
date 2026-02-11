import React from 'react'
import { UserRound } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = ({ setIsAuthPopup }) => {
    const userData = useSelector((state) => state.user.userData);
    return (
        <div className='w-full h-14 bg-orange-700 text-white flex items-center justify-around'>
            <div className='text-3xl font-bold'>
                <p>Redux</p>
            </div>
            <ul className='flex items-center gap-4'>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <div className='font-bold'>
                {
                    !userData ?
                        (
                            <button onClick={() => setIsAuthPopup(true)} className='w-20 h-8 bg-white text-orange-600 cursor-pointer rounded-2xl'>Login</button>
                        )
                        :
                        (
                            <div className='text-white flex items-center gap-2'>
                                <UserRound />
                                <p>{userData.name}</p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Navbar