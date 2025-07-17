import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {
  
    function getProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      }
    
      let productInfo = useQuery({
        queryKey : ["recentProducts"],
        queryFn  : getProducts,
        // select : (data)=>{data?.data?.data}
        // gcTime : 3000,
        //  staleTime : 7000,
        // retry : 7 ,
        // retryDelay : 6000
        // refetchInterval : 2000,
        // refetchIntervalInBackground : true
        // refetchOnWindowFocus : true 
      })

   return productInfo

}
