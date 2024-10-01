import React from 'react'
import { Outlet} from 'react-router-dom'
import Header from '../header/Headers'
import Footer from '../footer/Footer'

const DefaultLayout = () => {
  return (
    <div >
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default DefaultLayout;