import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import { setUserData } from '../features/user/userSlice';



const Authentication = ({setIsAuthPopup}) => {
    const [isLoginPage, setIsLoginPage] = useState(false);
    const [userAuthData, setUserAuthData] = useState({})

    const handleOnchange = (e) => {
        setUserAuthData({...userAuthData, [e.target.name] : e.target.value})
    }

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    axios.defaults.withCredentials = true;

    const dispatch = useDispatch();
 
    const handleAuthentication = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/user/registration`, userAuthData, {withCredentials: true});
            if(response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)
        }
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/user/login`, userAuthData, {withCredentials: true});
            if(response.data.success) {
                toast.success(response.data.message);
                dispatch(setUserData(response.data.data));
                setIsAuthPopup(false)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)
        }
    }
   
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-[300px] h-[400px] bg-white rounded-2xl'>
                <h1 className='py-6 text-2xl font-semibold text-center'>{isLoginPage ? 'Login' : 'Register'}</h1>
                <div className='mt-6'>
                    {
                        isLoginPage ? (
                            <div className='flex flex-col gap-8 px-4'>
                                <input type="email"
                                    name="email"
                                    id=""
                                    placeholder='Enter your email'
                                    onChange={handleOnchange}
                                    className='w-full border-b border-gray-200 outline-0'
                                />
                                <input type="password"
                                    name="password"
                                    id=""
                                    placeholder='Enter your password'
                                    onChange={handleOnchange}
                                    className='w-full border-b border-gray-200 outline-0'
                                />
                                <button onClick={handleLogin} className='mt-6 h-8 bg-orange-600 text-white cursor-pointer'>Login</button>
                                <p>Don't have an account <button onClick={() => setIsLoginPage(false)} className='hover:text-orange-600 cursor-pointer'>Register here</button></p>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-8 px-4'>
                                <input type="text"
                                    name="name"
                                    id=""
                                    placeholder='Enter your name'
                                    onChange={handleOnchange}
                                    className='w-full border-b border-gray-200 outline-0'
                                />
                                <input type="email"
                                    name="email"
                                    id=""
                                    placeholder='Enter your email'
                                    onChange={handleOnchange}
                                    className='w-full border-b border-gray-200 outline-0'
                                />
                                <input type="password"
                                    name="password"
                                    id=""
                                    placeholder='Enter your password'
                                    onChange={handleOnchange}
                                    className='w-full border-b border-gray-200 outline-0'
                                />
                                <button onClick={handleAuthentication} className='mt-6 h-8 bg-orange-600 text-white cursor-pointer'>Register</button>
                                <p>Already have an account <button onClick={() => setIsLoginPage(true)} className='hover:text-orange-600 cursor-pointer'>Login here</button></p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Authentication