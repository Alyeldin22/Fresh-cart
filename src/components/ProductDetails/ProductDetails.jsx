import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';

export default function ProductDetails() {

 
  
  const [product , setProduct] = useState(null);
  const [relatedProducts , setrelatedProducts] = useState([]);
    let {addToWishlist , deleteFromWishlist , setnumOfWishlistItems , numOfWishlistItems} = useContext(WishlistContext);

  let {id,category} = useParams();
  const [currentId , setcurrentId] = useState(0);

  var settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true,
    autoplaySpeed : 2000,
    arrows : false
  };

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
  async function addItemToWishlist(id){
    setcurrentId(id);

    let response = await addToWishlist(id);
    console.log(response);
    if(response.data.status=="success"){
      setnumOfWishlistItems(numOfWishlistItems + 1);
      localStorage.setItem(`wishlist_${id}`, true);
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
       toast.success(response.data.message);

       
       
    }else{

      toast.error(response.data.message);
      
    }
    
  }

  function getProduct(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      console.log(res);
        setProduct(res.data.data);
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  function getAllProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
        
        let related = res.data.data.filter((prod)=>prod.category.name==category && prod.id != id );
        console.log(related)
        setrelatedProducts(related);
        
        
    })
    .catch((res)=>{

    })
  }

  useEffect(()=>{
    getProduct(id);
    getAllProducts();

  },[id])
  
{/* <Slider {...settings}>
             <img src={slide4} className='w-full h-[400px] object-cover' alt="" />
             <img src={slide3} className='w-full h-[400px] object-cover' alt="" />
             <img src={slide5} className='w-full h-[400px] object-cover' alt="" />
           </Slider> */}
           
  return <>
    <div className='row mt-10 md:mt-2 ProductDetails'>
      { product? <>
      
      <div className="w-1/2 lg:w-1/4 mt-2 md:mt-2 m-auto shadow  shadow-slate-400">
        <Slider {...settings}>
          {product.images.map((src)=> 
              <img key={product.id} src={src} className='w-full' />
           )}
        </Slider>
      </div>

      <div className="w-full lg:w-3/4 text-start p-5 content-center mb-8">
         <h3 className='text-2xl font-semibold'>{product.title}</h3>
         <h4 className='text-slate-600 text-base mt-4'>{product.description}</h4>
         <h4 className='mt-5  text-xl text-emerald-500'>{product.category.name}</h4>
         <div className='flex justify-between  p-1 my-5'>
            <span className='text-xl'>{product.price} EGP</span>
            <span><i className='fas - fa-star text-yellow-400 text-sm pe-[2px]'></i>{product.ratingsAverage}</span>
         </div>
          <button onClick={()=>{addToCart(product.id)}} className=' btn '>Add To Cart</button>
      </div>
      
      </> : <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
          }
      

    </div>
    
    <h1 className=' font-semibold  mb-0 capitalize text-xl  lg:text-2xl text-start text-emerald-500 font-encode'>related products</h1>

    <div className="row">
    {relatedProducts.length > 0 ?   relatedProducts.map((prod)=>
        
        <div key={prod.id} className='w-1/2 md:w-1/3  lg:w-1/4 xl:w-1/6'>
           
           <div className=" product relative p-3 my-2 cursor-pointer transition-all group">
            <Link to={`/productdetails/${prod.id}/${prod.category.name}`}>
              <img src={prod.imageCover} className='w-full ' alt="" />
              <h3 className=' text-emerald-600 text-start'>{prod.category.name}</h3>
              <h3 className=' font-semibold text-start mb-1'>{prod.title.split(" ").slice(0,2).join(" ")}</h3>
              <div className='flex justify-between mb-2 p-1'>
                <span>{prod.price} EGP</span>
                <span><i className='fas - fa-star text-yellow-400 text-sm pe-[2px]'></i>{prod.ratingsAverage}</span>
              </div>
            </Link>
              <button className=' btn btnMove '>Add To Cart</button>
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
        
      ) : <div className='h-[50vh]'>
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
      </div> }
    </div>
  </>
}
