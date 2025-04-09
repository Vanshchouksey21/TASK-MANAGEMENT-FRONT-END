import React from 'react'
import Header from './component/Header'
import {Outlet , Link} from "react-router-dom"
import Footer from './component/Footer'

const Layout = () => {
  return (
    <div>
      

      <Header/>
      <Outlet/>
      <Footer/>

      
    </div>
  )
}

export default Layout