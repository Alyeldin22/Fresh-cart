import React, {  useContext, useState } from 'react'
import style from './Register.module.css'
import {useFormik} from "formik"
import * as yup from "yup"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from '../../Context/UserContext'


export default function Register() {
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

  function handleRegister(values){
    setisLoading(true);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .then((res)=>{
      setisLoading(false);
      console.log(res);
      if(res.data.message=="success"){
        console.log("ok");
        localStorage.setItem("userToken" ,res.data.token );
        setuserLogin(res.data.token);
        navigate("/");
        
        
        
      }

    })
    .catch((res)=>{
      setisLoading(false);
      console.log(res.response.data.message)
      setApiError(res.response.data.message)
      
    })
  }


  let validationSchema = yup.object().shape({
    name : yup
    .string()
    .min(3, "min length is 3")
    .max(10 ,"max length is 10")
    .required("name is required"),
    email : yup.string().email("not valid email").required("email is required"),
    password : yup.string().required("password is required").min(6,"pass min length is 6"),
    rePassword : yup
    .string()
    .oneOf([yup.ref("password")] , "not matched with password")
    .required("rePassword is required"),
    phone : yup.string().matches(/^01[0125][0-9]{8}$/ ,"phone not valid").required("phone is required")
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
      name : "" , 
      email : "" , 
      password : "" ,
      rePassword : "",
      phone : "",
    },
    validationSchema : validationSchema,
    // validate : myValidation,
    onSubmit : handleRegister,
   })


  return <>
  <h2 className='font-bold text-3xl text-center mt-12 mb-4 text-emerald-500'>Register Now <i class="text-emerald-500 fa-regular fa-circle-user ml-2"></i></h2>

    <div className='min-h-[100vh] flex justify-between items-start mt-10 flex-wrap'>
    {ApiError ? <div className='w-1/2 bg-red-600 mx-auto text-white font-bold p-3 rounded-lg'>
  {ApiError}
  </div> : null }

  
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto md:w-1/2 w-full">
  <div className="relative z-0 w-full mb-5 group">
      <input 
      type="text" 
      name="name" 
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="name" 
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" " 
       />
      <label htmlFor="name" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
      {formik.errors.name && formik.touched.name ? <div className="p-2  my-1 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">{formik.errors.name}</span> 
     </div> : null}
  </div>
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
      type="tel" 
      name="phone" 
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="phone" 
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" " 
       />
      <label htmlFor="phone" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
      {formik.errors.phone && formik.touched.phone ? <div className="p-2  my-1 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">{formik.errors.phone}</span> 
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
  <div className="relative z-0 w-full mb-5  group">
      <input 
      type="password" 
      name="rePassword" 
      value={formik.values.rePassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="rePassword" 
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" " 
       />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">reEnter Your Password</label>
      {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-2  my-1 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">{formik.errors.rePassword}</span> 
     </div> : null}
  </div>

  
  <div className='flex justify-between items-center gap-3 '>
  <button type="submit" className=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm  sm:w-auto px-10 py-2.5 text-center flex">
    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
  </button>
  <Link to={"/login"}  className='hover:text-blue-400'> do you have an account? <span> Login Now</span></Link>
  </div>
  
  
</form>

<div className='md:w-1/2 w-full'>
  <img className='' src={"people_work1.png"} alt="" />
</div>
    </div>

  </>
}
