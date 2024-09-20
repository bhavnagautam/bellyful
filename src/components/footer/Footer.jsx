import React from 'react';
import appStore from "../../images/app_store.png";
import googleStore from "../../images/google_store.png";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <div className="bg-[#12432D] text-white p-6 md:p-12">
      <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-8">
        <div className="flex flex-col space-y-4">
          <p className="text-lg font-semibold cursor-pointer">Download Our App</p>
          <div className="flex space-x-4">
            <a href='https://www.apple.com/in/app-store/'><img src={appStore} alt="App Store" className="w-20 md:w-24 h-auto cursor-pointer" /></a>
            <a href='https://play.google.com'><img src={googleStore} alt="Google Play" className="w-20 md:w-24 h-auto cursor-pointer" /></a>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <p className="text-lg font-semibold cursor-pointer">Save with us</p>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-300 flex items-center">
              <ArrowForwardIosIcon fontSize="small" />
              <span className="ml-1">Bazaar</span>
            </li>
            <li className="cursor-pointer hover:text-gray-300 flex items-center">
              <ArrowForwardIosIcon fontSize="small" />
              <span className="ml-1">Supermarket</span>
            </li>
            <li className="cursor-pointer hover:text-gray-300 flex items-center">
              <ArrowForwardIosIcon fontSize="small" />
              <span className="ml-1">Travel</span>
            </li>
            <li className="cursor-pointer hover:text-gray-300 flex items-center">
              <ArrowForwardIosIcon fontSize="small" />
              <span className="ml-1">Coupons</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col space-y-4">
          <p className="text-lg font-semibold cursor-pointer">Get to know us</p>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-300 flex items-center">
              <ArrowForwardIosIcon fontSize="small" />
              <span className="ml-1">About us</span>
            </li>
            <li className="cursor-pointer hover:text-gray-300 flex items-center">
              <ArrowForwardIosIcon fontSize="small" />
              <span className="ml-1">Partner with us</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col space-y-4 ">
          <p className="text-lg font-semibold cursor-pointer">Subscribe to receive deals and promotions</p>
          <div className="bg-white rounded-3xl flex items-center w-[280px] md:w-[280px]">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="p-2 h-8 rounded-full text-black border-none focus:outline-none flex-1 w-[180px] md:w-[180px]"
            />
            <button className="p-2 px-4 bg-[#6CBD44] rounded-full text-white font-semibold">
              Subscribe
            </button>
          </div>
          
          <p className="text-lg font-semibold cursor-pointer text-start pt-3">Get in touch with</p>
          <div className="flex space-x-4">
            <a href='https://www.facebook.com'><FacebookIcon className="cursor-pointer hover:text-gray-300" /></a>
            <a href='https://twitter.com'><TwitterIcon className="cursor-pointer hover:text-gray-300" /></a>
            <a href='https://www.instagram.com/'><InstagramIcon className="cursor-pointer hover:text-gray-300" /></a>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <hr className='w-full h-1 bg-[#DFFFC0] mb-4'/>
        <p className="text-center text-sm">Copyright 2024 bellyful. All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
