import React, { useEffect, useState } from 'react'
import style from './Cart.module.css'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'








export default function Cart() {

  let {getLoggedUserCart ,  updateCartProductQuantity , deleteCartItem , deleteAllCartItem , setnumOfItems , numOfItems } = useContext(CartContext);
  let [CartDetails , setCartDetails] = useState(null);
  const [loading , setloading] = useState(false);

  
  
  async function getCartItem(){
    setloading(true);
    let response = await getLoggedUserCart();

    if(response?.data?.status=="success"){
      setloading(false);
       setCartDetails(response.data.data);

       
    }else{
      setloading(false);
    }
    
  }
  let navigate = useNavigate();
  function goToHome(){
    navigate("/")
  }

  async function updateProdcut(id , count){
    let response = await updateCartProductQuantity(id , count);
    console.log(response);
    if(response.data.status=="success"){
      setCartDetails(response.data.data)
      toast.success("Product Updated Successfully")
    }
    else{
      toast.error("Error")
    }
  }

  async function deleteItem(id){
    let response = await deleteCartItem(id);
    if(response.data.status == "success"){
      setCartDetails(response.data.data);
      toast.success("product removed successfully");
      setnumOfItems(numOfItems-1);
    }
    console.log(response.data.data);
    
    
  }
  async function deleteAllItems(){
    let response = await deleteAllCartItem();
    
    setCartDetails(response.data.data);
    toast.success("all products removed successfully");
    setnumOfItems(0);
    
    console.log(response);
  }

  useEffect(()=>{
 
    getCartItem()

  },[])

  return <>
    <div className='cart mt-16 md:mt-12 lg:mt-10  '>
    {  CartDetails?.products.length>0 ? <>
     <div className='border border-black border-opacity-50 rounded-full md:w-[50%] m-auto shadow shadow-slate-500'>
      <h2 className='block text-center text-2xl  font-semibold capitalize my-4'><i class="fa-solid fa-sack-dollar me-2 text-emerald-500"></i>total cart price: <span className='text-emerald-500'>{CartDetails?.totalCartPrice}</span></h2>
      <h2 className='block text-center text-1xl text-gray-800 font-semi capitalize my-4'>total cart items: {CartDetails?.products.length}</h2>
      </div> 
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3  m-auto">
      <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">

    <tbody>
      {CartDetails?.products.map((prod)=>  <tr key={prod.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        
        
        <td className="ps-4 pt-4">
          <img src={prod.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
          <p className=" py-4 font-semibold text-gray-900 text-sm md:text-base">
          {prod.product.title.split(" ").slice(0, 3).join(" ")}

        </p>
        </td>
        <td className=" py-4 pe-2  font-semibold text-gray-900  text-sm md:text-base">
          Price: <span className='text-emerald-500'>{prod.price} EGP</span>
        </td>


        <td className="pe-2 py-4">
          <div className="flex items-center">
            <button onClick={()=>{updateProdcut(prod.product.id , prod.count-1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              {prod.count }
            </div>
            <button onClick={()=>{updateProdcut(prod.product.id , prod.count+1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>

        <td className="pe-2 py-4">
          <span onClick={()=>{deleteItem(prod.product.id)}}  className=" cursor-pointer font-medium text-white bg-red-600 hover:bg-red-500 rounded-xl px-4 py-1 ">Remove</span>
        </td>
      </tr>)}

    </tbody> 

      </table>

      <div className='flex justify-end pt-2 pe-2'>
      {CartDetails?.products.length>0 ? <span className=' cursor-pointer text-white p-2 capitalize bg-red-600  rounded-md ' onClick={deleteAllItems}> <i class="fa-solid fa-trash me-2"></i>Clear Cart</span> : null}

      </div>

      <Link to={`/checkout`}>
      <button  className='btn-blue  my-3'>Next Step (Payment)</button>
      </Link>
     </div> </>
   : <>
    {loading? <><div className="spinner">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
    </div></> 
    : 
     <><div className='w[95%] 1/2 m-auto mt-36 bg-slate-400  flex flex-col  items-center bg-opacity-50 rounded-md shadow-md'>
     <div className='p-2 md:p-10'>
       <h1 className=''>Oops! Your Cart Is Empty, Start Shopping Now by Clicking the button below and find something you love! ❤</h1>
     <button onClick={goToHome} className='bg-emerald-600 rounded-md text-white hover:bg-emerald-500 transition-colors py-1 px-3 mt-5'>
     <i className="fa-solid fa-bag-shopping fa-beat me-1"></i> Start Shopping
      </button>
     </div>
     
     </div></>}
    </> } 
    </div>
  


  
  
  
  


  </>
}
