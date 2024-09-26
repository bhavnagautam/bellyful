import React, { useState, useEffect } from "react";
import subCategoryBannerBg from "../../images/sub-category-banner-bg.png";
import subCategoryBanner from "../../images/sub-category-banner.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useApi from "../../Customhook/useApi";
import { CircularProgress, Backdrop } from "@mui/material";

const SubCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryName, category ,categoryNames } = location.state || {};

// Extract the page from URL query parameters
const searchParams = new URLSearchParams(location.search);
const initialPage = parseInt(searchParams.get("page")) || 1; 

  const [page, setPage] = useState(initialPage);
  const [product, setProduct] = useState([]);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1); // State to store the total number of pages

  var token = localStorage.getItem("userToken");
  const { data, loading, error } = useApi(
    location.pathname === "/Groceries/category/subcategory" ||
      location.state.isSubcategory
      ? `${process.env.REACT_APP_GET_PRODUCT_BY_SUBCATEGORY}?sub_category_name=${encodeURIComponent(categoryName)}&page=${page}&limit=${limit}`
      : `${process.env.REACT_APP_GET_PRODUCT_BY_CATEGORY}?category_name=${encodeURIComponent(categoryName)}&page=${page}&limit=${limit}`,
    "GET",
    null,
    token
  );

  useEffect(() => {
    if (data) {
      console.log("All Product by categories", data);
      setProduct(data.items.products);
      setTotalPages(data.items.totalPages); // Assuming the API returns totalPages in the response
    }
    if (error) {
      console.error("Error:", error);
    }
  }, [data, error]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      navigate(`${location.pathname}?page=${newPage}`, { state: location.state });
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="relative w-full h-[25vh] sm:h-[300px] md:h-[400px] lg:h-[500px]">
        <img
          src={subCategoryBannerBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-0 flex items-center justify-end p-4 md:p-6 lg:p-8">
          <img
            src={subCategoryBanner}
            alt="Banner"
            className="w-[190px] sm:w-[300px] md:w-[400px] lg:w-[550px] h-auto object-contain"
          />
        </div>
      </div> 
      <p className="p-4 md:pl-10 md:text-2xl bg-green-100">
        {category === "groceries"
          ? "Grocery"
          : category === "house_hold"
          ? "Household Cleaner"
          : "other category"}{" "}
         &gt; {categoryName}
      </p>

      <div className="flex justify-center p-4 sm:p-4 md:mx-10 sm:mx-4 md:p-4 mt-10 md:mt-20">
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full"
          style={{ gap: "30px" }}
        >
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
          product?.length > 0 ? (
            product.map((product, index) => (
              <Link
                to="ProductDescription"
                state={{ productName: product.name }}
                key={index}
              >
                <div className="shadow-lg shadow-gray-400/50 w-full p-4 rounded-lg flex flex-col justify-center items-center bg-white h-[225px]">
                  <img
                    src={product.image_path}
                    alt={product.name}
                    className="w-[85px] h-[100px] sm:w-[100px] sm:h[120px] md:w-[140px] lg:w-[100px] object-contain mb-4"
                  />
                  <div className="flex flex-col items-start text-left sm:text-left w-full">
                    <p className="text-green-600 font-semibold text-sm sm:text-base">
                      {product.price}
                    </p>
                    <p className="text-gray-800 mt-2 text-sm sm:text-base line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base"></p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No Product Available</p>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center m-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 mx-2 bg-green-900 text-white rounded disabled:bg-gray-400"
        >
          &lt;
        </button>
        <span className="px-4 py-2 mx-2 bg-white text-gray-700 rounded-lg">
          {page} to {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 mx-2 bg-green-900 text-white rounded disabled:bg-gray-400"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SubCategory;
