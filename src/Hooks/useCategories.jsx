import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'


export default function useAllCategories() {

   function getAllCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
   }

   let categoriesInfo = useQuery({
    queryKey : ["allCategories"],
    queryFn : getAllCategories,

   })






  return categoriesInfo
}
