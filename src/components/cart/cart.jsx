import React, { useEffect, useState } from "react";
import cartLogo from "../../images/Cart_logo.png";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import RemoveTwoToneIcon from "@mui/icons-material/RemoveTwoTone";
import amazonShortLogo from "../../images/Amazon_short_logo.png";
import carreFourLogo from "../../images/Carrefour_logo.png";
import removeCartImage from "../../images/RemoveCart.png";
import useApi from "../../Customhook/useApi";
import { useAppContext } from "../../context/AppContext";
import { CircularProgress, Backdrop } from "@mui/material";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState({});
  const [removeCart, setRemoveCart] = useState(false);
  const { updateHeader } = useAppContext();

  var token = localStorage.getItem("userToken");
  var userId = localStorage.getItem("userId");

  const { data, loading, error, fetchData } = useApi(
    `${process.env.REACT_APP_GET_CART}?userId=${userId}`,
    "GET",
    null,
    token
  );

  useEffect(() => {
    if (!loading && data) {
      console.log("All cart items", data);
      setCartTotal(data.items);
      setCartItems(data.items.items);
    }
    if (error) {
      console.error("Error:", error);
    }
  }, [data, loading, error]);

  const [addCart, setAddCart] = useState(false);
  const [postData, setPostData] = useState({
    userId: userId,
    quantity: 1,
    name: "",
  });

  const [removeCartPostData, setRemoveCartPostData] = useState({
    userId: userId,
    productId: null,
  });

  const handleIncrement = (name) => {
    setPostData((prevPostData) => ({ ...prevPostData, quantity: 1 }));
    setPostData((prevPostData) => ({ ...prevPostData, name: name }));
    setAddCart(true);
    console.log("handleIncrement");
    // window.location.reload();
  };

  const handleDecrement = (name) => {
    setPostData((prevPostData) => ({ ...prevPostData, quantity: -1 }));
    setPostData((prevPostData) => ({ ...prevPostData, name: name }));
    setAddCart(true);
    console.log("handleDecrement");
    // window.location.reload();
  };

  const {
    data: addCartData,
    loading: addCartLoading,
    error: addCartError,
  } = useApi(
    addCart ? process.env.REACT_APP_ADD_CART : null,
    "POST",
    addCart ? postData : null,
    token
  );

  useEffect(() => {
    if (addCartData?.status) {
      console.log("Cart updated successfully", addCartData);
      setAddCart(false);
      // setRefetchCart(true);
      updateHeader(true);
      fetchData();
    }
    if (addCartError) {
      console.error("Error:", addCartError);
      setAddCart(false);
    }
  }, [addCartData, addCartError]);

  const removeCartItem = (productId) => {
    setRemoveCart(true);
    setRemoveCartPostData((prevState) => ({
      ...prevState,
      productId: productId,
    }));
  };

  const {
    data: removeCartData,
    loading: removeCartLoading,
    error: removeCartError,
  } = useApi(
    removeCart ? process.env.REACT_APP_DELETE_CART_ITEMS : null,
    "DELETE",
    removeCart ? removeCartPostData : null,
    token
  );

  useEffect(() => {
    if (removeCartData?.status) {
      console.log("Cart item deleted successfully", removeCartData);
      setRemoveCart(false); // Reset removeCart flag
      // setRefetchCart(true);
      updateHeader(true);
      fetchData();
    } else if (removeCartError) {
      console.error("Error:", removeCartError);
      setRemoveCart(false); // Reset removeCart flag on error
    }
  }, [removeCartData, removeCartError]);

  useEffect(() => {
    // console.log("App Context from cart remove",headerState)
    if (removeCartData?.status) {
      console.log("Cart item deleted successfully", removeCartData);
      setRemoveCart(false);
      fetchData();
    } else if (removeCartError) {
      console.error("Error:", removeCartError);
      setRemoveCart(false);
    }
  }, [removeCartData, removeCartError]);

  return (
    <div className="cart px-4 lg:px-40">
      <div className="flex flex-col p-4 sm:p-6">
        {/* {/ First Row /} */}
        <div className="flex gap-6 ">
          {/* {/ Product Section /} */}
          <div className="py-1 px-4 sm:p-4 flex flex-col items-center justify-center w-full md:w-1/6 sm:w-1/3"></div>
          <div className=" py-1  px-4 sm:p-4 flex flex-col items-center justify-center w-full md:w-1/6 md:w-1/3">
            <img
              src={amazonShortLogo}
              alt="amazonShortLogo"
              className="w-[50px] h-[50px] md:w-[69px] md:h-[69px] mb-4"
            />
          </div>
          <div className=" px-4 flex flex-col items-center justify-center w-full md:w-1/6 sm:w-1/3">
            <img
              src={carreFourLogo}
              alt="carreFourLogo"
              className="w-[50px] h-[50px] md:w-[69px] md:h-[69px] mb-4"
            />
          </div>
        </div>
        <div className="overflow-auto max-h-[calc(100vh-300px)] p-4 sm:p-10  ">
          {loading ? (
            <Backdrop
              sx={(theme) => ({
                color: "#fff",
                zIndex: theme.zIndex.drawer + 1,
              })}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) :
          cartItems?.map((items, index) => (
            <div className="flex gap-6 mt-8 md:mt-14" key={index}>
              {/* {/ Product Section /} */}
              <div className="relative shadow-md p-2 lg:p-4 sm:p-1 rounded-2xl flex flex-col items-center justify-center w-[125px] md:w-1/6 sm:w-1/3">
                <span
                  className="absolute -top-3 -left-3 cursor-pointer"
                  onClick={() => removeCartItem(items.productId)}
                >
                  <img
                    src={removeCartImage}
                    alt="removeCart"
                    className="w-[20px] h-[20px] md:w-[25px] md:h-[25px] mb-2"
                  />
                </span>

                <img
                  src={items.image_path}
                  alt="Cart Item"
                  className="w-[40px] h-[40px] md:w-[109px] md:h-[109px] mb-2"
                />
                <div className="flex justify-center items-center gap-1 sm:gap-3">
                  <button
                    className="text-black font-semibold"
                    onClick={() => handleDecrement(items.name)}
                  >
                    <RemoveTwoToneIcon />
                  </button>
                  <p className="text-black font-semibold">{items?.quantity}</p>
                  <button
                    className="text-black font-semibold"
                    onClick={() => handleIncrement(items.name)}
                  >
                    <AddTwoToneIcon />
                  </button>
                </div>
              </div>

              <div className="shadow-md p-2 lg:p-4 sm:p-1 rounded-2xl flex flex-col items-center justify-center bg-[#F1FFE3] w-[125px] md:w-1/6 sm:w-1/3">
                <p className="text-[20px] md:text-[24px] text-gray-800 font-medium leading-tight">
                  AED
                </p>
                <p className="text-[20px] md:text-[30px] lg:text-[32px] text-[#6CBD44] font-bold leading-tight">
                  {items?.amazonPrice}
                </p>
                {/* <p className="text-gray-600 text-[14px] md:text-[16px] leading-tight">
                  5 liter
                </p> */}
              </div>
              <div className="shadow-md p-2 lg:p-4 sm:p-1 rounded-2xl flex flex-col items-center justify-center bg-white w-[125px] md:w-1/6 sm:w-1/3">
                <p className="text-[20px] md:text-[24px] text-gray-800 font-medium leading-tight">
                  AED
                </p>
                <p className="text-[20px] md:text-[30px] lg:text-[32px] text-[#6CBD44] font-bold leading-tight">
                  {items?.carrefourPrice || "0"}
                </p>
                {/* <p className="text-gray-600 text-[14px] md:text-[16px] leading-tight">
                  5 liter
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Total and Checkout Section  */}
      <div className="flex gap-6 p-4 sm:p-6 md:pt-48">
        <div className="flex flex-col items-center justify-center gap-6 w-full sm:w-1/6 md:w-1/6">
          <div className="lg:px-6 lg:py-4 sm:px-10 sm:py-8 md:px-16 md:py-12 rounded-2xl flex flex-col items-center justify-center w-full">
            <div className="w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] md:w-[63px] md:h-[63px]">
              <img
                src={cartLogo}
                alt="cartLogo"
                className="w-full h-full mb-4"
              />
            </div>
            <span className="text-[24px] sm:text-[36px] md:text-[48px] font-bold">
              Total
            </span>
          </div>
        </div>

        <div className="shadow-lg px-3 py-3 lg:px-2 sm:px-10 sm:py-8 md:px-12 md:py-8 rounded-2xl flex flex-col items-center bg-[#F1FFE3] w-full h-full sm:w-1/6 md:w-1/6 custom-responsive">
          <p className="text-[18px] md:text-[24px] text-gray-800 font-medium leading-tight">
            AED
          </p>
          <p className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[32px] text-[#6CBD44] font-bold leading-tight">
            {cartTotal?.amazonSubTotal}
          </p>
          <button className="w-full mt-4 bg-[#6CBD44] px-3 py-1 rounded-full text-white text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-150">
            Checkout
          </button>
        </div>

        <div className="shadow-lg px-3 py-3 lg:px-2 sm:px-10 sm:py-8 md:px-12 md:py-8 rounded-2xl flex flex-col items-center bg-white w-full h-full sm:w-1/6 md:w-1/6 custom-responsive">
          <p className="text-[18px] md:text-[24px] text-gray-800 font-medium leading-tight">
            AED
          </p>
          <p className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[32px] text-[#6CBD44] font-bold leading-tight">
            {cartTotal?.carrefourSubTotal}
          </p>
          <button className="w-full mt-4 bg-[#6CBD44] px-3 py-1 rounded-full text-white text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-150">
            Checkout
          </button>
        </div>
      </div>
    </div>

  );
};

export default Cart;
