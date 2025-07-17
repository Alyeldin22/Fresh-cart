import React from 'react'
import style from './Footer.module.css'
import paypalImg from '../../assets/paypal.png'
import amazonImg from '../../assets/amazon.png'
import mastercartImg from '../../assets/mastercart.png'
import applestoreImg from '../../assets/applestore.png'
import googleplayImg from '../../assets/googleplay.png'


export default function Footer() {

  function myGitHub() {
    window.location.href = "https://github.com/Alyeldin22"; 
}

  return <>
           <nav className={`footer    font-bold text-center  py-20 ${style.customWidth} `} >
            <h1 className='text-2xl my-3 font-semibold'>Get The FreshCart app</h1>
            <p className=' my-3 text-slate-600 font-normal'>We Will Send You A Link, Open It On Your Phone To Download The App..</p>
            <div className='flex md:justify-between flex-wrap justify-center '>
              <input className='footerInput  w-[95%] m-auto lg:w-[75%] lg:m-0 me-2 h-10 rounded-md border-black border border-opacity-50  ' type="email" placeholder='Enter Your Email Address' /> 
              <button className='w-[50%] md:w-[30%] m-auto lg:w-[20%] lg:m-0  py-2 bg-emerald-600 rounded-lg text-white font-medium hover:bg-emerald-500 transition-all px-3 mt-2 '>Share App Link</button>
            </div>
            <hr  className='my-4 border border-t  border-gray-500 border-opacity-50'/>
            <div className='flex justify-between flex-wrap '>
              <div className='flex items-center justify-center lg:justify-start w-full lg:w-1/2'>
                <span className='text-sm  md:text-lg font-medium me-4 '>Payment Partners</span> 
                <img src={amazonImg}  alt="" className='h-[30px] md:h-[50px]' />
                <img src={paypalImg} alt="" className='h-[10px] md:h-[30px]' />             
                <img src={mastercartImg} alt="" className='h-[60px]' /> 
              </div>
              <div className='flex items-center justify-center lg:justify-end w-full  lg:w-1/2'>
                <span className='text-sm md:text-lg font-medium me-2'>Get Deliveries With FreshCart
                </span> 
                <img src={applestoreImg}  alt="" className='h-[30px] md:h-[50px]' />
                <img src={googleplayImg} alt="" className='h-[20px] md:h-[30px]' />             

              </div>
              
            </div>
            <hr  className='my-4 border border-gray-500 border-opacity-50'/>
            <h2 className='mt-8 pb-5 text-center md:text-left'>© 2025 FreshCart All Rights Reserved By <span onClick={()=>{myGitHub()}} className='text-emerald-500 text-xl '>Aly Eldin El Nawam   <i className="cursor-pointer fa-brands text-black text-lg fa-github"></i></span></h2>
          </nav>
         </>
}
