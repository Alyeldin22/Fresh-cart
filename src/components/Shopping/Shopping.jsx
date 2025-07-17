import React from 'react'
import { Link } from 'react-router-dom'

export default function Shopping() {
  return (
    <div className='w-full md:w-[85%] m-auto font-encode mb-2'>
      <div className=' text-left'>
        <h1 className='text-2xl font-semibold py-3'>One Stop Grocery Shop</h1>
        <p className='text-slate-500 pb-3'>Shopping for your furry friend? Find food, treats, and more in one easy spot.</p>
        <Link to={"/products"}><button className='my-2 px-2 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-all'>Get Discount on Share</button></Link>
      </div>
      <div className=' row '>
        <div className='item w-1/2 md:w-1/4 text-left pe-4 md:pe-8 lg:pe-16'>
          <i class="fa-regular fa-clock pl-1 text-4xl text-emerald-500 py-2"></i>
          <h1 className='pb-2 text-xl font-medium'>10 minute grocery now</h1>
          <p className='text-slate-500'>Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you.</p>
        </div>
        <div className='item w-1/2 md:w-1/4 text-left pe-4 md:pe-8 lg:pe-16'>
          <i class="fa-solid fa-gift pl-1 text-4xl text-emerald-500 py-2"></i>
          <h1 className='pb-2 text-xl font-medium'>Best Prices & Offers</h1>
          <p className='text-slate-500'>Cheaper prices than your local supermarket, great cashback offers to top it off. Get best pricess & offers.</p>
        </div>
        <div className='item w-1/2 md:w-1/4 text-left pe-4 md:pe-8 lg:pe-16'>
          <i class="fa-solid fa-dolly pl-1 text-4xl text-emerald-500 py-2"></i>
          <h1 className='pb-2 text-xl font-medium'>Wide Assortment</h1>
          <p className='text-slate-500'>Choose from 5000+ products across food, personal care, household, bakery, veg and non-veg & other categories.</p>
        </div>
        <div className='item w-1/2 md:w-1/4 text-left pe-4 md:pe-8 lg:pe-16'>
          <i class="fa-solid fa-rotate pl-1 text-4xl text-emerald-500 py-2"></i>
          <h1 className='pb-2 text-xl font-medium'>Easy Returns</h1>
          <p className='text-slate-500'>Not satisfied with a product? Return it at the doorstep & get a refund within hours. No questions asked policy.</p>
        </div>

      </div>
    </div>
  )
}
