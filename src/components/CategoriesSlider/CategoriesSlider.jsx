import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";

// استيراد ملفات الـ CSS الخاصة بـ Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function CategoriesSlider() {

  const[categories , setCategories]=useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 7, // الافتراضي على الشاشات الكبيرة
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // تابلت وأقل
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // موبايل كبير وأقل
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // موبايل صغير جدًا
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  function getCategoreis(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
       setCategories(res.data.data);
       
    })
    .catch((res)=>{

    })
  }

  useEffect(()=>{
    getCategoreis();

  },[])

  return (
    <>
    <h1 className=' font-semibold my-6 capitalize text-xl  lg:text-2xl text-start text-emerald-500 font-encode'>shop popular categories</h1>

      <Slider {...settings}>
        {categories.map((cat)=><div key={cat._id}>
          <img src={cat.image} className='w-full h-[200px] object-cover' alt="" />
          <h4>{cat.name}</h4>
        </div>)}
      </Slider>
    </>
  )
}
