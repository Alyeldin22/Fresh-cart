import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import style from './VerifyCode.module.css'
import {useFormik} from "formik"
import * as yup from "yup"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from '../../Context/UserContext'



export default function VerifyCode() {
  let {userLogin , setuserLogin} = useContext(UserContext);
  let navigate = useNavigate();
  const [ApiError,setApiError]=useState("");
  const [isLoading , setisLoading]=useState(false);
  
  

  function handleVerifyCode(values){
    setisLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
    .then((res)=>{
      setisLoading(false);
      console.log(res);
      if(res.data.status=="Success"){
        toast.success(res.data.status);


        navigate("/updatepassword")
        
      }


    })
    .catch((err)=>{
      // toast.error("There is no user registered with this email address");
      
    setisLoading(false);
    console.log(err);
    if (err.response) { 

      toast.error(err.response.data.message || "حدث خطأ، حاول مرة أخرى");
    } else { 

      toast.error("حدث خطأ غير متوقع، تأكد من اتصال الإنترنت");
    }
    
    
  //   setApiError(res.data.message)
    
  })
  }


     let validationSchema = yup.object().shape({
   
      resetCode : yup.string().required("required"),

    
   
     })


   let formik = useFormik({
    initialValues : {
      resetCode : "" , 
    },

    validationSchema : validationSchema,
    onSubmit : handleVerifyCode,
   })


  return <>

  <div className='min-h-[100vh] mt-12'>
  {ApiError ? <div className='w-1/2 bg-red-500 mx-auto text-white font-bold p-3 rounded-lg'>
  {ApiError}
  </div> : null }

  <h2 className='font-semibold text-2xl text-center my-4 '>Verify Code</h2>
  
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

  <div className="relative z-0 w-full mb-5 group">
      <input 
      type="tel" 
      name="resetCode" 
      value={formik.values.resetCode}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      id="resetCode" 
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" " 
       />
      <label htmlFor="resetCode" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Code</label>
      {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-2  my-1 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
       <span className="font-medium">{formik.errors.resetCode}</span> 
     </div> : null}
  </div>




  
  <div className='flex items-center gap-3 justify-between'>
  <button type="submit" className=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm  sm:w-auto px-10 py-2.5 text-center flex">
    {isLoading ? <><i className="fas fa-spinner fa-spin"></i>
      
      </> : "verify"}
  </button>

  

  </div>
  
  
</form>
  </div>

  </>
}

