import React, { useState, useEffect } from "react";
import amazon from "../images/amazon-logo.png";
import carrefour from "../images/carrefour.png";
import { useNavigate, useLocation } from "react-router-dom";
import useApi from "../Customhook/useApi";
import { useAppContext } from "../context/AppContext";
import { CircularProgress, Backdrop } from "@mui/material";

const ProductDescription = ({ filledStars = 4, totalStars = 5 }) => {
  const { updateHeader } = useAppContext();

  useEffect(() => {
    updateHeader(true);

    return () => {
      updateHeader(false);
    };
  }, [updateHeader]);

  const stars = Array(totalStars)
    .fill(false)
    .map((_, index) => index < filledStars);
  const navigate = useNavigate();
  const location = useLocation();
  const { productName } = location.state || {};
  const encodedProductName = encodeURIComponent(productName);

  const [ProductDescription, setProductDescription] = useState({});
  const [carrefourAmazonPrice, setCarrefourAmazonPrice] = useState({
    amazonPrice: null,
    carrefourPrice: null,
  });
  const [quantity, setQuantity] = useState(1);
  const [postData, setPostData] = useState({
    userId: localStorage.getItem("userId"),
    quantity: 1,
    name: "",
    image_path: "",
  });
  const [addCart, setAddCart] = useState(false);

  const token = localStorage.getItem("userToken");
  const { data, loading, error } = useApi(
    `${process.env.REACT_APP_GET_PRODUCT_DESCRIPTION}?productName=${encodedProductName}`,
    "GET",
    null,
    token
  );

  useEffect(() => {
    if (data) {
      console.log("ProductDescription", data);

      const amazonProduct = data.products?.Amazon?.[0];
      const carrefourProduct = data.products?.Carrefouruae?.[0];

      setProductDescription(amazonProduct || carrefourProduct);

      setCarrefourAmazonPrice({
        amazonPrice: amazonProduct?.price || "NA",
        carrefourPrice: carrefourProduct?.price || "NA",
      });

      setPostData((prevPostData) => ({
        ...prevPostData,
        name: amazonProduct?.name || carrefourProduct?.name || "",
      }));
    }

    if (error) {
      console.error("Error:", error);
    }
  }, [data, error]);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    setPostData((prevPostData) => ({
      ...prevPostData,
      quantity: prevPostData.quantity + 1,
    }));
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : prevQuantity
    );
    setPostData((prevPostData) => ({
      ...prevPostData,
      quantity:
        prevPostData.quantity > 1
          ? prevPostData.quantity - 1
          : prevPostData.quantity,
    }));
  };

  const handleAddCart = (e) => {
    e.preventDefault();
    setAddCart(true);
    console.log("setAddCart");
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
      console.log("Cart Added successfully", addCartData);
      navigate("/cart");
    }
    if (addCartError) {
      console.error("Error:", addCartError);
    }
  }, [addCartData, addCartError, navigate]);

  // Calculate the total price based on quantity and Amazon price
  const amazonPrice = parseFloat(carrefourAmazonPrice.amazonPrice) || 0;
  const totalAmazonPrice = quantity * amazonPrice;
  const carrefourPrice = parseFloat(carrefourAmazonPrice.carrefourPrice) || 0;
  const totalcarrefourPrice = quantity * carrefourPrice;

  return (
    <>
      <div className="flex flex-col items-center space-y-8 lg:space-y-0 lg:space-x-4 p-4 sm:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 justify-center items-center w-full max-w-screen-xl">
          <div className="w-full flex justify-center h-[214px] sm:h-[314px] col-span-2 lg:w-1/2 lg:h-[414px] mt-12">
            <img
              src={ProductDescription?.image_path}
              alt={ProductDescription?.name}
              className="sm:w-full sm:h-auto object-contain"
            />
          </div>

          <div className="col-span-3 w-full flex flex-col space-y-0">
            <p className="sm:text-sm md:text-md lg:text-lg xl:text-3xl font-extrabold">
              {ProductDescription?.name}
            </p>
            <div className="flex items-center pt-2 sm:pt-4 mt-0">
              <p className="text-xl md:text-2xl lg:text-4xl font-medium font-black text-[#6CBD44]">
                {ProductDescription?.price}
              </p>
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
              ) : (
                stars.map((isFilled, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ml-2 ${
                      isFilled
                        ? "text-yellow-300"
                        : "text-gray-300 dark:text-gray-500"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))
              )}
              <p className="w-[50px] h-[16px] ml-4 mt-6 text-[10px] bg-[#E0EEE9] text-black text-center font-bold">
                IN Stock
              </p>
            </div>

            <p className="text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-3 py-4">
              {ProductDescription?.name}
            </p>
            <div className="flex flex-col lg:flex-row items-center mt-8 space-y-4 lg:space-y-0 lg:space-x-12">
              <p className="h-9 w-full lg:w-[261px] rounded-full text-xl text-center border border-gray-400 flex items-center justify-center space-x-8">
                <span
                  className="text-[#6CBD44] text-4xl cursor-pointer"
                  onClick={handleDecrement}
                >
                  -
                </span>
                <span className="text-gray-500">|</span>
                <span>{quantity}</span>
                <span className="text-gray-500">|</span>
                <span
                  className="text-[#6CBD44] text-2xl cursor-pointer"
                  onClick={handleIncrement}
                >
                  +
                </span>
              </p>

              <button
                type="submit"
                onClick={handleAddCart}
                className="h-12 w-full lg:w-[261px] rounded-full bg-[#6CBD44] text-white"
              >
                Add to Cart
              </button>
            </div>
            <div className="mt-4">
              <p className="font-bold text-md">Price Comparison</p>
              <p className="flex items-center rounded-lg shadow-md w-full lg:w-[615px] h-[40px] border border-[#DADADA] bg-[#F4F4F4] text-black justify-between mt-4 text-wrap">
                <img
                  src={carrefour}
                  alt=""
                  className="w-[35px] h-[29px] ml-2"
                />
                <span className="pr-2 text-lg text-base font-semibold text-[#6CBD44]">
                  AED {totalcarrefourPrice.toFixed(2)}
                </span>
              </p>
              <p className="flex items-center rounded-lg shadow-md w-full lg:w-[615px] h-[40px] border border-[#DADADA] text-black justify-between mt-4">
                <img src={amazon} alt="" className="w-[50px] h-[25px] ml-2" />
                <span className="pr-2 text-lg text-base font-semibold text-[#6CBD44]">
                  AED {totalAmazonPrice.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 lg:p-20">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          Description
        </h5>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

        {ProductDescription?.description?.map((item, index) => (
          <p className="font-normal line-clamp-3">{item} </p>
        ))}

        <h5 className="font-bold mt-4">Overview :</h5>
        <p>
          Organic farming helps avoid the use of chemical additives or
          genetically engineered ingredients. It must be fresh, and flavorful
          with the myriad of vitamins and minerals that only come from whole
          foods that have been harvested and consumed at their prime. Organic
          food products provide a multitude of benefits.
        </p>
        <h5 className="font-bold mt-4">Health Benefits :</h5>
        <p>
          Organic products may include higher concentrations of certain
          antioxidants and flavonoids with antioxidant capabilities. A naturally
          occurring toxic substance called cadmium is absorbed by plants and can
          be found in higher quantities in fruits and vegetables.Omega-3 fatty
          acids, a form of healthy unsaturated fat, are present in organic dairy
          products, meats, and eggs in amounts up to 50% higher than in
          conventional products.
        </p>
        <h5 className="font-bold mt-4">Environment :</h5>
        <p>
          Sustainable agricultural practices like organic farming aid in
          mitigating the effects of global warming. Organic farming helps to
          retain the soil's capacity for reproduction and regeneration, proper
          plant nutrition, and solid soil management results in the production
          of nutrient-rich and disease-resistant food. By diversifying their
          crop portfolio, employing physical weed control, animal and green
          manure, and crop rotation organic farmers seek to mitigate ecological
          damage. Organic farming has the ability to sluggish carbon dioxide
          emissions and slow down the effects of climate change.
        </p>
      </div>
    </>
  );
};
export default ProductDescription;
