import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Layout from './components/Layout/Layout.jsx'
import Products from './components/Products/Products.jsx'
import Cart from './components/Cart/Cart.jsx'
import Brands from './components/Brands/Brands.jsx'
import Categories from './components/Categories/Categories.jsx'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import Checkout from './components/Checkout/Checkout.jsx'
import Allorders from './components/Allorders/Allorders.jsx'
import Notfound from './components/Notfound/Notfound.jsx'
import CounterContextProvider from './Context/CounterContext.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import { QueryClient , QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {CartContextProvider} from "./Context/CartContext.jsx"
import  { Toaster } from 'react-hot-toast';
import Category from './components/Category/Category.jsx'
import BrandProducts from './components/BrandProducts/BrandProducts.jsx'
import Wishlist from './components/Wishlist/Wishlist.jsx'
import { WishlistContextProvider } from './Context/WishlistContext.jsx'
import { OrderContextProvider } from './Context/OrderContext.jsx'
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx'
import VerifyCode from './components/VerifyCode/VerifyCode.jsx'
import UpdatePassword from './components/UpdatePassword/UpdatePassword.jsx'
import PageTitle from './components/PageTitle/PageTitle.jsx'
import 'flowbite';
let query = new QueryClient();


function App() {
  
  let x = createBrowserRouter([
    {path : "" , element : <Layout />,
      children : [
      {index : true , element :<ProtectedRoute><Home /></ProtectedRoute> },
      {path : "products" , element : <ProtectedRoute> <Products /> </ProtectedRoute> },
      {path : "checkout" , element : <ProtectedRoute> <Checkout /> </ProtectedRoute> },
      {path : "allorders" , element : <ProtectedRoute> <Allorders /> </ProtectedRoute> },
      {path : "cart" , element : <ProtectedRoute><Cart /></ProtectedRoute> },
      {path : "wishlist" , element :<ProtectedRoute><Wishlist /></ProtectedRoute> },
      {path : "brands" , element :<ProtectedRoute><Brands /></ProtectedRoute> },
      {path : "brands/:id" , element :<ProtectedRoute><BrandProducts /></ProtectedRoute> },
      {path : "productdetails/:id/:category" , element :<ProtectedRoute><ProductDetails /></ProtectedRoute> },
      {path : "cart" , element :<ProtectedRoute><Cart /></ProtectedRoute> },
      {path : "categories" , element : <ProtectedRoute><Categories /></ProtectedRoute> },
      {path : "categories/:id" , element :<ProtectedRoute><Category /></ProtectedRoute> },
      {path : "register" , element : <Register />},
      {path: "login" , element : <Login />}, 
      {path: "forgetpassword" , element : <ForgetPassword />}, 
      {path: "verifycode" , element : <VerifyCode />},
      {path: "updatepassword" , element : <UpdatePassword />},
      {path : "*" , element : <Notfound />},

    ]}
  ],
  {
    basename:"/FreshCart"
  }
)

  return (
    <>
    <OrderContextProvider>
      <WishlistContextProvider>
    <UserContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <RouterProvider router={x}></RouterProvider>
            <Toaster />
          </CartContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserContextProvider>
    </UserContextProvider>
    </WishlistContextProvider>
    </OrderContextProvider>
    
    
    

      
    </>
  )
}

export default App
