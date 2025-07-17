import React from 'react'
import style from './Brands.module.css'
import useBrands from '../../Hooks/useBrands'
import { Link } from 'react-router-dom';

export default function Brands() {

  let {data , isError , error , isLoading} = useBrands();

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
   
   <div className="row brands mt-4">
    {data?.data?.data.map((brand)=>
      <div key={brand._id} className="item w-1/2 md:w-1/3  lg:w-1/4 xl:w-1/6 mt-8 md:mt-0 p-2 cursor-pointer">
        <Link to={`/brands/${brand._id}`}>
        <div className="brand  border-4 border-slate-500 rounded-md border-opacity-50 hover:border-emerald-500 transition-all">
         <img src={brand.image} alt="" />
        </div>
        </Link>
      </div>
    )}
   </div>
  
  
  </>
    
}
