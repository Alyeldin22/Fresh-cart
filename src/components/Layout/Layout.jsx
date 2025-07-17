import React from 'react'
import style from './Layout.module.css'
import Navbar from './../Navbar/Navbar'
import Footer from './../Footer/Footer'
import { Outlet } from 'react-router-dom'
import PageTitle from '../PageTitle/PageTitle'

export default function Layout() {
  return (
    <div>
      <PageTitle /> {/* تحديث العنوان تلقائيًا */}
      <Navbar />

      <div className="layout container   my-5 py-20 ">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}
