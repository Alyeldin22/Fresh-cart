import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext();

export function WishlistContextProvider(props){
    
    let headers = {
        token : localStorage.getItem("userToken")
    }
    let [numOfWishlistItems , setnumOfWishlistItems]=useState(0);
   
    function addToWishlist(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                productId : productId
            },
            {
                headers
            }
        )
    }
    function deleteFromWishlist(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, 
            {
                headers
            }
        )
    }

    function getLoggedUserWishlist(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
        {
            headers
        }
    ).then((res)=>{
        setnumOfWishlistItems(res.data.data.length);
        return res
        
    }).catch((res)=>res)
    }

    useEffect(()=>{
        getLoggedUserWishlist();
    },[])


    return <WishlistContext.Provider value={ { getLoggedUserWishlist , addToWishlist , deleteFromWishlist ,numOfWishlistItems ,setnumOfWishlistItems } }>
            {props.children}
        </WishlistContext.Provider>

}