import React, { useContext, useState } from 'react'
import style from './Products.module.css'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useProducts from '../../Hooks/useProducts';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';


export default function Products() {
  
  let{data , isError , error , isLoading} = useProducts();
   const [loading , setloading]=useState(false);
     let {addToWishlist , deleteFromWishlist , setnumOfWishlistItems , numOfWishlistItems} = useContext(WishlistContext);
     const [currentId , setcurrentId] = useState(0);
     const [added , setadded]=useState(false);

  // console.log(data?.data?.data);

  if(isError){
    return <h3 className='bg-blue-700'>{error}</h3>
  }

  if(isLoading){
    return <>
    <div className='loadingProducts'>
      <div className=" spinner ">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
      </div>
      
  </div></>
  }
  async function addItemToWishlist(id){
    setcurrentId(id);

    let response = await addToWishlist(id);
    console.log(response);
    if(response.data.status=="success"){
      setnumOfWishlistItems(numOfWishlistItems + 1);
      localStorage.setItem(`wishlist_${id}`, true);
      setadded(true);
       toast.success(response.data.message);  
    }else{
      toast.error(response.data.message);  
    }
    
    
  }

  async function delItemFromWishlist(id){
    setcurrentId(id);
    let response = await deleteFromWishlist(id);
    console.log(response);
    if(response.data.status=="success"){
      setnumOfWishlistItems(numOfWishlistItems - 1);
      localStorage.setItem(`wishlist_${id}`, false);
      setadded(false);
       toast.success(response.data.message);


    }else{

      toast.error(response.data.message);
      
    }
    
  }

  return <>

    <div className="row ">
      {data?.data?.data.map((prod)=>
              
              <div key={prod.id} className='w-1/2 md:w-1/3  lg:w-1/4 xl:w-1/6'>   
              
                 <div className=" product relative p-3 my-2 cursor-pointer transition-all group  ">
                  <Link to={`/productdetails/${prod.id}/${prod.category.name}`}>
                  <div className='relative'><img src={prod.imageCover} className='w-full ' alt="" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 ease-in-out rounded-lg"></div>
                  </div>
                    
                    <h3 className=' text-emerald-600 text-start'>{prod.category.name}</h3>
                    <h3 className="font-medium text-nowrap text-start mb-1 text-xl overflow-hidden text-ellipsis whitespace-nowrap">{prod.title.split(" ").slice(0,2).join(" ")}</h3>
                    <div className='flex justify-between mb-2 p-1'>
                      <span>{prod.price} EGP</span>
                      <span><i className='fas - fa-star text-yellow-400 text-sm pe-[2px]'></i>{prod.ratingsAverage}</span>
                    </div>
                  </Link>
                    <button onClick={()=>{addToCart(prod.id)}} className=' btn btnMove '>{loading && currentId==prod.id?  <><i className="fas fa-spinner fa-spin"></i></> : "Add TO Cart"}</button>
                    <button
                       onClick={() => {
                         if (localStorage.getItem(`wishlist_${prod.id}`) === 'true') {
                          delItemFromWishlist(prod.id);
                          localStorage.setItem(`wishlist_${prod.id}`, 'false');
                        } else {
                          addItemToWishlist(prod.id);
                           localStorage.setItem(`wishlist_${prod.id}`, 'true');
                        }
                          }}
                       className={
                      localStorage.getItem(`wishlist_${prod.id}`) === 'true'
                        ? `bg-red-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-90 duration-500 ease-in-out`
                        : `bg-emerald-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-90 duration-500 ease-in-out`
                           }
                      >
                        <i className="fa-solid p-2 text-xl text-white cursor-pointer fa-heart hover:scale-110 hover:rotate-12 transition-all duration-300"></i>
                       </button>
      
                 </div>
              </div>
            )
             }
    </div>

      
  </>
}
