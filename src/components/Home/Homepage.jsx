import React from "react";
import supermarket from "../../images/suparmarketimg1.png";
import amazonlogo from "../../images/amazon-logo.png";
import householdCleaners from "../../images/household_cleaners.png";
import grocery from "../../images/grocery.png";
import homeBanner3 from "../../images/home-banner-3.png";
import darkAppStore from "../../images/dark_app_store.png";
import darkGoogleStore from "../../images/dark_google_store.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <div className="relative h-[25vh] md:h-[522px] w-full">
        <img
          src={supermarket}
          alt="Supermarket Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 md:top-8 left-4 md:left-12 flex flex-col">
          <img
            src={amazonlogo}
            alt="Amazon Logo"
            className="mb-2 md:mb-4 w-20 md:w-32"
          />
          <div className="text-white ml-2 md:ml-3 text-left md:text-left">
            <span className="block text-lg md:text-[54px] font-semibold leading-tight">
              Bringing
            </span>
            <span className="block text-xl md:text-[78px] font-bold text-[#F68F3D] leading-tight">
              Comfort
            </span>
            <span className="block text-lg md:text-[54px] font-semibold leading-tight">
              & Care
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-auto w-full p-5 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-8 md:py-8 md:px-12">
          <p className="text-2xl md:text-3xl text-black font-semibold">
            Shop by Store
          </p>
          {/* <div className="relative mt-2 md:mt-0">
            <input
              type="search"
              placeholder="Academic City"
              className="w-full md:w-[418px] h-[35px] rounded-full border border-gray-300 px-4 pr-10"
            />
            <ExpandMoreIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              fontSize="small"
            />
          </div> */}
        </div>

        <div className="flex flex-col justify-center md:flex-row gap-5 md:gap-10">
          <Link to="Groceries" state={{category:"groceries"}}>
            <div className="bg-grocery-gradient relative flex justify-center items-center p-5 md:p-10 w-full md:w-[44vw] h-auto border rounded-xl">
              <div className="text-center">
                <div className="mb-5  text-lg md:text-xl text-black font-semibold">
                  Grocery
                </div>
                <img
                  className=" bottom-4 w-full md:w-[460px] h-auto md:h-[194px]"
                  src={grocery}
                  alt="grocery"
                />
              </div>
            </div>
          </Link>
          <Link to="Groceries" state={{category:"house_hold"}}>
            <div className="bg-household-cleaners-gradient relative flex justify-center items-center md:p-10  p-5 w-full md:w-[44vw] h-auto border rounded-xl">
              <div className="text-center">
                <div className=" mb-5 text-lg md:text-xl text-black font-semibold">
                  Household Cleaners
                </div>
                <img
                  className=" w-full md:w-[460px] h-auto md:h-[194px]"
                  src={householdCleaners}
                  alt="householdCleaners"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="h-auto md:h-[567px] p-5 md:p-10">
        <div className="flex flex-col md:flex-row h-full justify-center md:justify-evenly items-center">
          <div className="flex flex-col h-full justify-center items-center md:items-start text-center md:text-left">
            <p className="text-2xl md:text-[40px] font-bold mb-2">
              Download the <span className="text-red-600">app</span>
            </p>
            <p className="text-sm md:text-[14px] py-2 md:py-5 font-normal">
              Easily book, change, or cancel a ride on the go. Think of it as
              peace of mind in the palm of your hand.
            </p>
            <div className="flex gap-3 mt-3">
              <img
                className="w-32 md:w-auto"
                src={darkAppStore}
                alt="AppStore"
              />
              <img
                className="w-32 md:w-auto"
                src={darkGoogleStore}
                alt="GoogleStore"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <img
              className="w-full md:w-auto"
              src={homeBanner3}
              alt="Belliful mobile"
            />
          </div>
          <div className="flex md:hidden items-center mt-5">
            <img className="w-full" src={homeBanner3} alt="Belliful mobile" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
