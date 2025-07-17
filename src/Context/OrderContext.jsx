import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

export let OrderContext = createContext();


 export function OrderContextProvider(props){
    const[userId , setuserId]=useState(0);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          setuserId(decodedToken.id); // تأكد من المفتاح الصحيح في التوكن
        }
      }, []);

      useEffect(() => {
        if (userId) {
          getOrders(userId);
        }
      }, [userId]);


    
    function getOrders(userId){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        .then((res)=>{
            console.log(res);
            return res
            
        })
        .catch((res)=>res)
    }


    return <OrderContext.Provider value={{getOrders}}>
    {props.children}
</OrderContext.Provider>
}





