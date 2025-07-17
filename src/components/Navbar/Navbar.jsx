import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'


export default function Navbar() {

  let {userLogin , setuserLogin} = useContext(UserContext);
  let {numOfItems} = useContext(CartContext);
  let { numOfWishlistItems} = useContext(WishlistContext);
  const [navOpen, setNavOpen] = useState(false);
  let navigate = useNavigate();

  function signout(){
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  

  return <>
           

{/* <nav className="bg-slate-100 fixed top-0 left-0 right-0 border-gray-200 z-50">

    <div className="flex flex-wrap justify-center lg:justify-between items-center mx-auto max-w-screen-xl p-4 gap-3">

        <div className='flex justify-center items-center gap-5'>
          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse ">
              <img src={`${logo}`}  className="w-[150px]" alt="Flowbite Logo " />
          </Link>
          {userLogin != null ? <ul className='flex gap-4'>
            <li><NavLink to="" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors '>Home</NavLink></li>
            
            <li><NavLink to="products" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Products</NavLink></li>
            <li><NavLink to="categories" className=' font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Categories</NavLink></li>
            <li><NavLink to="brands" className=' font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Brands</NavLink></li>
            <li><NavLink to="allorders" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Orders</NavLink></li>

          </ul> : null}

        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          
         <ul className='flex gap-5'>
            {userLogin != null ? <>
           <li><Link to="cart" className='relative  text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors me-2'>
             <i className="fa-solid fa-cart-shopping sm:text-2xl text-lg    text-emerald-500 relative "></i>
             {numOfItems? <div className='text-sm text-white text-center absolute right-[-15px] top-[-10px] size-[20px] bg-slate-400 rounded-full'> {numOfItems} </div> : <div className='text-sm text-white absolute text-center right-[-15px] top-[-10px] size-[20px] bg-slate-400 rounded-full'> 0 </div> }
               </Link>
           </li>

          <li><Link to="wishlist" className='relative  text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors me-7'>
             <i className="fa-solid fa-heart sm:text-2xl text-lg    text-emerald-500 relative "></i>
             {numOfWishlistItems? <div className='text-sm text-white text-center absolute right-[-15px] top-[-10px] size-[20px] bg-slate-400 rounded-full'> {numOfWishlistItems} </div> : <div className='text-sm text-white text-center absolute right-[-15px] top-[-10px] size-[20px] bg-slate-400 rounded-full'> 0 </div> }
             </Link>
          </li>  </> : null}

            <li className='hidden lg:block'><i className='fab fa-facebook cursor-pointer hover:text-blue-800 transition-colors'></i></li>
            <li className='hidden lg:block'><i className='fab fa-instagram cursor-pointer hover:text-red-500 transition-colors'></i></li>
            <li className='hidden lg:block'><i className='fab fa-tiktok cursor-pointer'></i></li>
            <li className='hidden lg:block'><i className='fab fa-twitter cursor-pointer hover:text-blue-500 transition-colors'></i></li>
            <li className='hidden lg:block'><i className='fab fa-linkedin cursor-pointer hover:text-blue-700 transition-colors'></i></li>
            <li className='hidden lg:block'><i className='fab fa-youtube cursor-pointer hover:text-red-600 transition-colors'></i></li>

           
         </ul>

           <div className='flex gap-2'>

              {userLogin == null ?<> <Link to="login" className='hover:text-emerald-500 transition'>Login</Link>
              <Link className='hover:text-emerald-500 transition' to="register">Register</Link> </> : null}

              {userLogin != null ?<>

              <i onClick={signout}  className="cursor-pointer fa-solid fa-right-from-bracket text-xl ms-2 hover:text-emerald-500 transition" title="Logout"></i>
              </>  : null}
  
           </div>
            
        </div>

    </div>

</nav> */}




<nav className="border-gray-200 bg-gray-50 fixed top-0 left-0 right-0 z-50">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between md:justify-normal mx-auto p-4 relative">

    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse me-2 md:me-7">
      <img src={`${logo}`} className="w-[150px]" alt="Flowbite Logo" />
    </Link>


    

    <div
      className={`${navOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-gray-50 dark:bg-gray-800 md:hidden z-50`}
      id="navbar-solid-bg"
    >
      <ul className="flex flex-col gap-4 p-4">
        {userLogin != null && (
          <>
            <li><NavLink to="" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Home</NavLink></li>
            <li><NavLink to="products" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Products</NavLink></li>
            <li><NavLink to="categories" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Categories</NavLink></li>
            <li><NavLink to="brands" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Brands</NavLink></li>
            <li><NavLink to="allorders" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Orders</NavLink></li>
          </>
        )}
      </ul>
    </div>

    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      {userLogin != null && (
        <ul className='flex flex-col md:flex-row gap-4'>
          <li><NavLink to="" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Home</NavLink></li>
          <li><NavLink to="products" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Products</NavLink></li>
          <li><NavLink to="categories" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Categories</NavLink></li>
          <li><NavLink to="brands" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Brands</NavLink></li>
          <li><NavLink to="allorders" className='font-encode text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors'>Orders</NavLink></li>
        </ul>
      )}
    </div>

    <ul className='flex gap-5 md:ml-auto'>
      {userLogin != null && (
        <>
          <li>
            <Link to="cart" className='relative text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors me-2'>
              <i className="fa-solid fa-cart-shopping sm:text-2xl text-lg text-emerald-500 relative"></i>
              {numOfItems ? (
                <div className='text-sm text-white text-center absolute right-[-15px] top-[-10px] size-[20px] bg-slate-400 rounded-full'>{numOfItems}</div>
              ) : (
                <div className='text-sm text-white text-center absolute right-[-15px] top-[-10px] size-[20px] bg-slate-400 rounded-full'>0</div>
              )}
            </Link>
          </li>
          <li>
            <Link to="wishlist" className='relative text-slate-700 text-xl pb-1 hover:text-emerald-600 transition-colors me-7'>
              <i className="fa-solid fa-heart sm:text-2xl text-lg text-emerald-500 relative"></i>
              {numOfWishlistItems ? (
                <div className='text-sm text-white text-center absolute right-[-15px] top-[-10px] size-[20px] bg-slate-400 rounded-full'>{numOfWishlistItems}</div>
              ) : (
                <div className='text-sm text-white text-center absolute right-[-15px] top-[-10px] size-[20px] bg-slate-400 rounded-full'>0</div>
              )}
            </Link>
          </li>
        </>
      )}
      <li className='hidden lg:block'><i className='fab fa-facebook cursor-pointer hover:text-blue-800 transition-colors'></i></li>
      <li className='hidden lg:block'><i className='fab fa-instagram cursor-pointer hover:text-red-500 transition-colors'></i></li>
      <li className='hidden lg:block'><i className='fab fa-tiktok cursor-pointer'></i></li>
      <li className='hidden lg:block'><i className='fab fa-twitter cursor-pointer hover:text-blue-500 transition-colors'></i></li>
      <li className='hidden lg:block'><i className='fab fa-linkedin cursor-pointer hover:text-blue-700 transition-colors'></i></li>
      <li className='hidden lg:block'><i className='fab fa-youtube cursor-pointer hover:text-red-600 transition-colors me-8'></i></li>
    </ul>
    {userLogin != null && (
    <div className="md:hidden">
      <button
        data-collapse-toggle="navbar-solid-bg"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-solid-bg"
        aria-expanded="false"
        onClick={() => setNavOpen(!navOpen)}
      >
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
    </div>
)}
    <div className="flex items-center gap-3">
    {userLogin == null ? (
  <>
    <NavLink 
      to="login" 
      className={({ isActive }) => 
        `text-xl pb-1 transition-colors ${
          isActive ? 'text-emerald-600' : 'text-slate-700 hover:text-emerald-600'
        }`
      }>
      Login
    </NavLink>

    <NavLink 
      to="register" 
      className={({ isActive }) => 
        `text-xl pb-1 transition-colors ${
          isActive ? 'text-emerald-600' : 'text-slate-700 hover:text-emerald-600'
        }`
      }>
      Register
    </NavLink>
  </>
) : (
  <i onClick={signout} className="cursor-pointer fa-solid fa-right-from-bracket text-2xl md:ms-8 hover:text-emerald-500 transition" title="Logout"></i>
)}

    </div>
  </div>
</nav>



        </>
}
