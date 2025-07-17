import React, { useContext, useEffect, useState } from 'react'
import style from './Allorders.module.css'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios';
import { OrderContext } from '../../Context/OrderContext';
import {jwtDecode} from "jwt-decode";
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';


export default function Allorders() {
    let {data,isError,error , isLoading} = useProducts();
  let[orderLits , setorderLits]=useState([]);

  const[userId , setuserId]=useState(0);

  useEffect(() => {
      const token = localStorage.getItem("userToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        setuserId(decodedToken.id); // تأكد من المفتاح الصحيح في التوكن
      }
    }, []);




  
  function getOrders(userId){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res)=>{
          console.log(res.data);
          setorderLits(res.data)
          return res
          
      })
      .catch((res)=>res)
  }
 
      useEffect(() => {
      if (userId) {
        getOrders(userId);
      }
    }, [userId]);


  return (
    <div className='orders  mt-20'>

     {orderLits.map((ord)=>
       <div key={ord.id} className=' border border-black border-opacity-40 rounded-md my-3 md:w-[90%] lg:w-full m-auto'>
          <div className='text-start ps-5 pt-5 text-xl  flex justify-between'>
           <p className='text-slate-500 font-encode '>Order ID <p className='font-medium text-black'>#{ord.id}</p></p>

           <div className='mt-2'>
             <span className='bg-blue-500 mx-3 text-white px-2 py-2 rounded-full text-sm md:text-xl'>
                {ord?.isDelivered? "تم التوصيل" : "قيد التوصيل"}
              </span>
              <span className='bg-emerald-500  text-white px-2  py-2 rounded-full text-sm md:text-xl'>
                {ord?.isPaid? "تم الدفع" : "لم يتم الدفع"}
             </span>
          </div> 
       </div>

         <div className='flex justify-between p-5 '>
            
            <div className='border border-black-600 rounded-lg w-1/2 md:w-1/3 lg:w-1/5 p-3'>

              <img src={ord?.cartItems.map((prod)=>prod.product.imageCover)} className='' alt="" />

              <h1 className='font-encode text-start text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>
                {ord?.cartItems.map((prod)=>prod.product.title.split(" ").slice(0, 4).join(" ") + 
                 (prod.product.title.split(" ").length > 3 ? "..." : ""))}
              </h1>

              <div className='flex justify-between mt-2'>
                <p className='font-encode text-lg'>Count: <span className='text-emerald-600'>{ord?.cartItems.map((prod)=>prod.count)}</span></p>
                <p><span className='font-encode font-semibold text-emerald-600 '>{ord?.cartItems.map((prod)=>prod.price)} LE</span></p>
              </div>
            
            </div>

            <div className=''>
              
            </div>

         </div>

          
         <h1 className='font-encode text-start ps-5 text-xl font-semibold pb-3'>
          Your Total Order Price is: <span className='font-semibold text-emerald-600'>{ord?.totalOrderPrice} LE</span> 
          </h1>

       </div>
    )}

    </div>
  )
}
