import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { WishlistContext } from '../../Context/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';



export default function Wishlist() {

  let { getLoggedUserWishlist ,addToWishlist , deleteFromWishlist , setnumOfWishlistItems , numOfWishlistItems} = useContext(WishlistContext);
  let {addProductToCart , setnumOfItems , numOfItems} = useContext(CartContext);

  
  let [wishlistDetails , setwishlistDetails]=useState(null);
    const [loading , setloading]=useState(false);
      const [currentId , setcurrentId] = useState(0);
    let navigate=useNavigate();
  
    async function addToCart(id){
      setcurrentId(id);
      setloading(true);
      let response = await addProductToCart(id);
      console.log(response.data);
  
      if(response.data.status=="success"){
        setloading(false);
         toast.success(response.data.message);
         setnumOfItems(numOfItems+1)
              
      }else{
        setloading(false);
        toast.error(response.data.message);  
      }
      
    }

  async function getWishlistItems(){
    setloading(true);
     let  response =await getLoggedUserWishlist();

     if(response){
      setloading(false)
     }
      
      setwishlistDetails(response?.data?.data);

     
  }
  async function addItemToWishlist(id){
    setcurrentId(id);

    let response = await addToWishlist(id);
    console.log(response);
    if(response.data.status=="success"){
      setwishlistDetails(response?.data?.data);
      setnumOfWishlistItems(numOfWishlistItems + 1);
      localStorage.setItem(`wishlist_${id}`, true);
      

       toast.success(response.data.message);  
    }else{
      toast.error(response.data.message);  
    }
    
    
  }

  async function delItemFromWishlist(id) {
    setcurrentId(id);
    let response = await deleteFromWishlist(id);
    console.log("Delete Response:", response);
  
    if (response.data.status === "success") {

      setwishlistDetails((prevWishlist) => prevWishlist.filter(prod => prod._id !== id));
  
      setnumOfWishlistItems(numOfWishlistItems - 1);
      localStorage.setItem(`wishlist_${id}`, false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }
  
  function goToShopping(){
    navigate("/")
  }

  useEffect(()=>{
    getWishlistItems();
  },[])


  return <>
  <div className='wishlis mt-5 min-h-[100vh]'>
  {wishlistDetails?.length>0? 

  <div className='d-flex row justify-between mt-10 md:mt-0 '>
    <h1 className='text-3xl font-medium'><i className=" text-primary-500 fa-fade text-4xl fa-solid fa-clipboard-list text-emerald-500"></i> Wishlist</h1> <span className='text-xl text-slate-500'> Number of items: {wishlistDetails?.length}</span>
    </div> : null}
  
  {wishlistDetails?.length>0?
   <><div className="row ">
    
      {wishlistDetails?.map((prod)=>
        
        <div key={prod.id} className='w-1/2 md:w-1/3  lg:w-1/4 xl:w-1/6'>   
        {console.log(wishlistDetails)}
           <div className="product relative p-3 mb-2 cursor-pointer transition-all group ">
           <Link to={`/productdetails/${prod.id}/${prod?.category?.name}`}>
              <img src={prod.imageCover} className='w-full ' alt="" />
              <h3 className=' text-emerald-600 text-start'>{prod.category?.name || "Unknown Category"}</h3>
              <h3 className=' font-semibold text-start mb-1'>{prod?.title?.split(" ").slice(0,2).join(" ")}</h3>
              <div className='flex justify-between mb-2 p-1'>
                <span>{prod.price} EGP</span>
                <span><i className='fas - fa-star text-yellow-400 text-sm pe-[2px]'></i></span>
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
      )}
    </div></>
     : 
     <>
    {loading? <><div className="spinner">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
    </div></> 
    : 
     <><div className='m-auto mt-36 bg-slate-400  flex flex-col bg-opacity-50 rounded-md shadow-md w[95%]'>
     <div className='p-4 md:p-10 '>
       <h1 className=''>Your Wishlist Is Empty, Start Shopping Now by Clicking the button below and find something you love! ❤</h1>
     <button onClick={goToShopping} className='bg-emerald-600 rounded-md text-white hover:bg-emerald-500 transition-colors py-1 px-3 mt-5'>Start Shopping</button>
     </div>
     
     </div></>}
    </>}
  </div>
  
  </>
}


{/* <><div className='m-auto mt-36 bg-slate-400  flex flex-col bg-opacity-50 rounded-md shadow-md w-1/2'>
     <div className='p-10 '>
       <h1 className=''>Your Wishlist Is Empty, Start Shopping Now by Clicking the button below and find something you love! ❤</h1>
     <button onClick={goToShopping} className='bg-emerald-600 rounded-md text-white hover:bg-emerald-500 transition-colors py-1 px-3 mt-5'>Start Shopping</button>
     </div>
     
     </div></> */}