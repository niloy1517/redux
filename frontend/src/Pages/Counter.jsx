import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../features/counters/countersSlice'

const Counter = () => {
    const dispatch = useDispatch();

    const counters = useSelector((state) => state.counters)


    
  return (
    <div className='w-full h-screen bg-gray-100 flex items-center justify-center'>
        <div className='bg-white py-6 px-10 flex flex-col items-center justify-center'>
            <p className='text-2xl font-bold mb-6'>Counter App</p>
            <p className='text-3xl font-medium mb-6'>{counters.value}</p>
            <div className='flex items-center gap-8'>
                <button onClick={() => dispatch(increment(counters))} className='w-26 h-9 bg-green-500 text-white rounded font-medium cursor-pointer'>Increment</button>
                <button onClick={() => dispatch(decrement(counters))} className='w-26 h-9 bg-red-500 text-white rounded font-medium cursor-pointer'>Decrement</button>
            </div>
        </div>
    </div>
  )
}

export default Counter