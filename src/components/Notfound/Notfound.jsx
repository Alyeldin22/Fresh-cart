import React from 'react'
import style from './Notfound.module.css'
import { Link } from 'react-router-dom'



export default function Notfound() {
  return (
    <div className='w-full Notfound min-h-[100vh] text-center'>
      <h1 className='font-encode text-emerald-500 text-2xl font-semibold mt-12'>Page Not Found</h1>

        <img src={"/FreshCart/error.svg"} alt=""className=' m-auto' />

      <Link to={"/"}>
        <button className='font-encode bg-emerald-500 hover:bg-emerald-600 transition-all rounded-xl px-2 py-2 mt-1 text-white'>Back to Home</button>
      </Link>
    </div>
  )
    
    
}
