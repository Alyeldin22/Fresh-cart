import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export function CartContextProvider(props){

    let headers ={ token : localStorage.getItem("userToken") }; 
    let [cartId , setcartId]=useState(0);
    let [cartOwner , setcartOwner]=useState(localStorage.getItem("cartOwner"));
    let [numOfItems , setnumOfItems]=useState(0);

    function addProductToCart(productId){
        
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
        
        {
            productId : productId,
        }, 
        { 
            headers ,
        })
        .then((res)=>
           res
        ).catch((err)=>
            err
        )
    }

    function getLoggedUserCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        })
        .then((res)=> {

            
            
            
            setnumOfItems(res.data.numOfCartItems);
            setcartId(res?.data?.data._id);
            setcartOwner(res?.data?.data?.cartOwner);
            localStorage.setItem("CartOwner" , res?.data?.data?.cartOwner )

            
            
            
            
            
            
           return res
        })
        .catch((err)=>err)
    }

    function updateCartProductQuantity(productId, newCount){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count : newCount
        } , 
        {
            headers
        })
        .then((res)=> res)
        .catch((err)=>err)
    }

    function deleteCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
            {
                headers
            }
        ).then((res)=> res )
        .catch((err)=> err)
    }

    function deleteAllCartItem(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , 
            {
                headers
            }
        ).then((res)=> res )
        .catch((err)=> err)
    }

    useEffect(()=>{
        getLoggedUserCart();
        const savedCartOwner = localStorage.getItem("CartOwner");
    if (savedCartOwner) {
      setcartOwner(savedCartOwner);
    }
    },[])
    
    function checkout(cartId , url , formData){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` , 
            {
                shippingAddress : formData
            } , 
            {
                headers
            }
        )
        .then((res)=> res )
        .catch((err)=> err)
    }
   



    return <CartContext.Provider value={ { addProductToCart , getLoggedUserCart , updateCartProductQuantity , deleteCartItem , deleteAllCartItem , checkout , cartId , numOfItems , setnumOfItems , cartOwner} }>
        {props.children}
    </CartContext.Provider>
}