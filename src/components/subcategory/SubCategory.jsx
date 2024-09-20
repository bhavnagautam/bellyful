// import React, { useState, useEffect } from "react";
// import subCategoryBannerBg from "../../images/sub-category-banner-bg.png";
// import subCategoryBanner from "../../images/sub-category-banner.png";
// import { Link, useLocation } from "react-router-dom";
// import useApi from "../../Customhook/useApi";

// const SubCategory = () => {
//   const location = useLocation();
//   console.log("location", location);
//   const { categoryName, category } = location.state || {};

//   const [currentPage, setCurrentPage] = useState("Colddriks");

//   const handlePageChange = (e, page) => {
//     e.preventDefault();
//     setCurrentPage(page);
//   };

//   const [product, setProduct] = useState([]);

//   var token = localStorage.getItem("userToken");

//   const { data, loading, error } = useApi(
//     location.pathname === "/Groceries/category/subcategory" ||
//       location.state.isSubcategory
//       ? `${
//           process.env.REACT_APP_GET_PRODUCT_BY_SUBCATEGORY
//         }?sub_category_name=${categoryName}&page=${1}`
//       : `${
//           process.env.REACT_APP_GET_PRODUCT_BY_CATEGORY
//         }?category_name=${categoryName}&page=${1}`,
//     "GET",
//     null,
//     token
//   );

//   useEffect(() => {
//     if (data) {
//       console.log("All Product by categories", data);
//       setProduct(data.items.products);
//     }
//     if (error) {
//       console.error("Error:", error);
//     }
//   }, [data, error]);

//   return (
//     <div className="overflow-x-hidden">
//       <div className="relative w-full h-[25vh] sm:h-[300px] md:h-[400px] lg:h-[500px]">
//         <img
//           src={subCategoryBannerBg}
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute bottom-0 right-0 flex items-center justify-end p-4 md:p-6 lg:p-8">
//           <img
//             src={subCategoryBanner}
//             alt="Banner"
//             className="w-[190px] sm:w-[300px] md:w-[400px] lg:w-[550px] h-auto object-contain"
//           />
//         </div>
//       </div>

//       {/* <nav className="p-4 sm:p-6 lg:p-10">
//         <ul className="flex flex-wrap gap-2 justify-center sm:justify-start mx-2 sm:mx-4 lg:mx-6 text-sm sm:text-base">
//           {["Colddriks", "Milk Products", "Water", "Coffee", "Tea"].map(
//             (tab) => (
//               <li
//                 key={tab}
//                 className={`px-4 py-2 sm:px-6 sm:py-1.5 bg-white text-black list-none border border-black rounded-lg cursor-pointer transition-colors duration-300 ${
//                   currentPage === tab
//                     ? "!bg-[#4CD47B] !text-white !border-none"
//                     : "bg-white text-black border border-black"
//                 }`}
//                 onClick={(e) => handlePageChange(e, tab)}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </li>
//             )
//           )}
//         </ul>
//       </nav> */}

//     <div className="flex justify-center p-4 sm:p-4 md:mx-10 sm:mx-4 md:p-4 mt-10 md:mt-20">
//         <div
//           className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full"
//           style={{ gap: "30px" }}
//         >
//         {product?.length>0 ? product?.map((product, index) => (
//           <Link
//             to="ProductDescription"
//             state={{ productName: product.name }}
//             key={index}
//           >
//             <div className="shadow-lg shadow-gray-400/50  w-full p-4  rounded-lg flex flex-col justify-center items-center bg-white h-[225px]">
//               <img
//                 src={product.image_path}
//                 alt={product.name}
//                 className="w-[85px] h-[100px] sm:w-[100px] sm:h[120px] md:w-[140px] lg:w-[100px]  object-fit mb-4"
//               />
//               <div className="flex flex-col items-start text-left sm:text-left w-full">
//                 <p className="text-green-600 font-semibold text-sm sm:text-base">
//                   {product.price}
//                 </p>
//                 <p className="text-gray-800  mt-2 text-sm sm:text-base line-clamp-2">
//                   {product.name}
//                 </p>
//                 <p className="text-gray-600 text-sm sm:text-base"></p>
//               </div>
//             </div>
//           </Link>
//         )) : <p>No Product Available</p>}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SubCategory;

import React, { useState, useEffect } from "react";
import subCategoryBannerBg from "../../images/sub-category-banner-bg.png";
import subCategoryBanner from "../../images/sub-category-banner.png";
import { Link, useLocation } from "react-router-dom";
import useApi from "../../Customhook/useApi";

const SubCategory = () => {
  const location = useLocation();
  const { categoryName, category } = location.state || {};
  // const [currentPage, setCurrentPage] = useState(categoryName);
  const [page, setPage] = useState(1);
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
          {product?.length > 0 ? (
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
                    className="w-[85px] h-[100px] sm:w-[100px] sm:h[120px] md:w-[140px] lg:w-[100px] object-fit mb-4"
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
