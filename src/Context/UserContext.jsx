import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){

    const [userLogin , setuserLogin] = useState(
        localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
    );
    
    // useEffect(()=>{
    //     if(localStorage.getItem("userToken")){
    //         setuserLogin(localStorage.getItem("userToken"))
    //     }
    // },[])


    return <>
               <UserContext.Provider value={ { userLogin , setuserLogin } }>
                   {props.children}
               </UserContext.Provider>
           </>

    
}