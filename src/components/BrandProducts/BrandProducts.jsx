
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useProducts from '../../Hooks/useProducts';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';




export default function BrandProducts() {

  let {id} = useParams();
  let [brandName , setbrandName]=useState("");
  let {data,error , isError ,isLoading , isFetching}=useProducts();
  console.log(data?.data?.data);

  let navigate = useNavigate();

  function goToBrand(){
    navigate("/brands")
  }

  if(isLoading){
    return <><div className="spinner">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
  </div></>
  }

  let {addProductToCart} = useContext(CartContext);

  async function addToCart(id){
    let response = await addProductToCart(id)
    console.log(response.data);

    if(response.data.status=="success"){
       toast.success(response.data.message);
       
    }else{
      toast.error(response.data.message);
    }
    
  }
  
  
  function getSpecificBrands(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then((res)=>{
        console.log(res.data.data);
        setbrandName(res.data.data.slug);
    })
    .catch((res)=>{

    })
  }

  useEffect(()=>{
    getSpecificBrands();
  },[])

  

  return <>
  
   <div className="row mt-8 md:mt-0 min-h-[100vh]">

     {isLoading || isFetching ? ( // لو لسه بيحمل أو البيانات مش جاهزة
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  ) : data?.data?.data.filter((brand)=> brand.brand.slug==brandName).length > 0 ?
     data?.data?.data.filter((brand)=> brand.brand.slug==brandName).map((prod)=>
     
     <div key={prod.id} className='w-1/2 md:w-1/3  lg:w-1/4 xl:w-1/6'>   
        <div className="product p-3 my-2 cursor-pointer ">
         <Link to={`/productdetails/${prod.id}/${prod.category.name}`}>
           <img src={prod.imageCover} className='w-full ' alt="" />
           <h3 className=' text-emerald-600 text-start'>{prod.category.name}</h3>
           <h3 className=' font-semibold text-start mb-1'>{prod.title.split(" ").slice(0,2).join(" ")}</h3>
           <div className='flex justify-between mb-2 p-1'>
             <span>{prod.price} EGP</span>
             <span><i className='fas - fa-star text-yellow-400 text-sm pe-[2px]'></i>{prod.ratingsAverage}</span>
           </div>
         </Link>
           <button onClick={()=>{addToCart(prod.id)}} className=' btn btnMove '>Add To Cart</button>
        </div>
     </div>
   
     ) :  <><div className=' m-auto mt-36 bg-slate-400  flex flex-col  items-center bg-opacity-50 rounded-md shadow-md'>
     <div className='p-4 md:p-10'>
       <h1 className=''>Oops ! No Products In this Brands Choose Another Brand</h1>
     <button onClick={goToBrand} className='bg-emerald-600 rounded-md text-white hover:bg-emerald-500 transition-colors py-1 px-3 mt-5'>Back To Brands</button>
     </div>
     
     </div></> }


 </div>

  </>
}
