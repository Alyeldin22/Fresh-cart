import React, { useContext, useEffect, useState } from 'react'
import style from './login.module.css'
import {useFormik} from "formik"
import * as yup from "yup"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from '../../Context/UserContext'
import toast from 'react-hot-toast'





export default function Login() {
  let {userLogin , setuserLogin} = useContext(UserContext);
  let navigate = useNavigate();
  const [ApiError,setApiError]=useState("");
  const [isLoading , setisLoading]=useState(false);
  

  // async function handleRegister(values){
  //   console.log(values);

  // let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values);
  // console.log(data);

  // if(data.message == "success"){
  //   // go to home
  //   navigate("/")
  // }else{
  //   // show error
  // }

  // }

  function handleLogin(values){
    setisLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .then((res)=>{
      setisLoading(false);
      console.log(res);
      if(res.data.message=="success"){
        console.log("ok");
        localStorage.setItem("userToken" ,res.data.token );
        setuserLogin(res.data.token);
        navigate("/")
        
      }

    })
    .catch((res)=>{
      setisLoading(false);
      console.log(res.response.data.message)
      setApiError(res.response.data.message)
      
    })
  }

 


  let validationSchema = yup.object().shape({

    email : yup.string().email("not valid email").required("email is required"),
    password : yup.string().required("password is required").min(6,"pass min length is 6"),


  })

  // function myValidation(values){
  //   let errors ={};
  //   if(values.name==""){
  //     errors.name="name is required";
  //   }else if (!/^[a-zA-Z]{3,10}$/.test(values.name)){
  //     errors.name="not valid name";
  //   }

  //   if(values.phone ==""){
  //     errors.phone="phone is required"
  //   }else if(!/^01[1250][0-9]{8}$/.test(values.phone)){
  //     errors.phone="not valid phone";
  //   }
  //   return errors
  // }


   let formik = useFormik({
    initialValues : {
      email : "" , 
      password : "" ,

    },
    validationSchema : validationSchema,
    // validate : myValidation,
    onSubmit : handleLogin,
   })


  return <>
  <div className='min-h-[100vh] mt-12'>
  {ApiError ? <div className='mt-5 w-1/4 bg-red-500 mx-auto text-white font-bold p-2 rounded-lg'>
  {ApiError}
  </div> : null }

  <h2 className='font-bold text-3xl text-center mt-4 mb-4 text-emerald-500'> Login Now <i class="text-emerald-500 fa-regular fa-circle-user ml-2"></i> </h2>
  
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

  <div className="relative z-0 w-full mb-5 group">
      <input 
      type="email" 
      name="email" 
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="email" 
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" " 
       />
      <label htmlFor="email" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      {formik.errors.email && formik.touched.email ? <div className="p-2  my-1 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">{formik.errors.email}</span> 
     </div> : null}
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input 
      type="password" 
      name="password" 
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="password" 
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" " 
       />
      <label htmlFor="password" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
      {formik.errors.password && formik.touched.password ? <div className="p-2  my-1 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">{formik.errors.password}</span> 
     </div> : null}
  </div>


  
  <div className='flex items-center gap-3 justify-between'>
  <button type="submit" className=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base  sm:w-auto px-10 py-2.5 text-center flex">
    {isLoading ? <><i className="fas fa-spinner fa-spin"></i>
      
      </> : "Login"}
  </button>

  <Link to={"/forgetpassword"}>
    <span className='hover:text-emerald-500 transition-all'>Forgtten Password?</span>

  </Link>
  

  </div>
  
  
</form>
<img className='md:w-[80%] m-auto' src={"shopping-carts.png"} alt="" />
  </div>

      

  <div>
    
  </div>
  

  </>
}
