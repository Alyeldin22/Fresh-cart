import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import useAllCategories from '../../Hooks/useCategories'
import { Link, useNavigate } from 'react-router-dom'


export default function Categories() {

  let {data , isError , error , isLoading} = useAllCategories();
  let navigate = useNavigate();


  if(isLoading){
    return <>
    <div className='loadingProducts'>
      <div className=" spinner ">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
      </div>
      
  </div></>
  }

  

  return <>
  
  <div  className="row categories mt-4" >
    {data?.data?.data.map((cat)=>
    <div key={cat._id} className="category w-1/2 md:w-1/3  lg:w-1/4 xl:w-1/6 p-2 ">
      <Link to={`/categories/${cat._id}`}>
      <div className='p-2  border-4 border-slate-300 rounded-md hover:bg-emerald-400 transition-all'>
        <img className='w-full h-[280px]  object-cover' src={cat.image}  alt="" />
      </div>
       
      <h2>{cat.name}</h2>
      </Link> 
    </div>
    )}
  </div>

    
  
  </>
}
