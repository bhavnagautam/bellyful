// import React, { useContext , useEffect } from "react";
// import { SearchContext } from "../../context/SearchContext";
// import {Link} from "react-router-dom"
// import subCategoryBannerBg from "../../images/sub-category-banner-bg.png";
// import subCategoryBanner from "../../images/sub-category-banner.png"; // Import the context

// const SearchCategoryName = () => {
//   const { products, categoryName, page, limit } = useContext(SearchContext); // Get values from context

//   return (
//     <div className="overflow-x-hidden">
//       <div className="relative w-full h-[25vh] sm:h-[300px] md:h-[400px] lg:h-[500px]">
//         <img src={subCategoryBannerBg} alt="Background" className="w-full h-full object-cover" />
//         <div className="absolute bottom-0 right-0 flex items-center justify-end p-4 md:p-6 lg:p-8">
//           <img
//             src={subCategoryBanner}
//             alt="Banner"
//             className="w-[190px] sm:w-[300px] md:w-[400px] lg:w-[550px] h-auto object-contain"
//           />
//         </div>
//       </div>

//       <div className="flex justify-center p-4 sm:p-4 md:mx-10 sm:mx-4 md:p-4 mt-10 md:mt-20">
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full" style={{ gap: "30px" }}>
//           {products.length > 0 ? (
//             products.map((product, index) => (
//               <Link
//                 to="ProductDescription"
//                 state={{ productName: product.name }}
//                 key={index}
//               >
//                 <div className="shadow-lg shadow-gray-400/50 w-full p-4 rounded-lg flex flex-col justify-center items-center bg-white h-[225px]">
//                   <img
//                     src={product.image_path}
//                     alt={product.name}
//                     className="w-[85px] h-[100px] sm:w-[100px] sm:h[120px] md:w-[140px] lg:w-[100px] object-fit mb-4"
//                   />
//                   <div className="flex flex-col items-start text-left sm:text-left w-full">
//                     <p className="text-green-600 font-semibold text-sm sm:text-base">
//                       {product.price}
//                     </p>
//                     <p className="text-gray-800 mt-2 text-sm sm:text-base line-clamp-2">
//                       {product.name}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p>No Product Available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchCategoryName;

// import React, { useContext,useEffect } from "react";
// import { SearchContext } from "../../context/SearchContext";
// import { Link ,useLocation} from "react-router-dom";
// import subCategoryBannerBg from "../../images/sub-category-banner-bg.png";
// import subCategoryBanner from "../../images/sub-category-banner.png";

// const SearchCategoryName = () => {

//   const { state } = useLocation();
//   const { products, categoryName } = useContext(SearchContext);
//   const displayProducts = state?.products || products;
//   const displayCategoryName = state?.categoryName || categoryName;

//   return (
//     <div className="overflow-x-hidden">
//       <div className="relative w-full h-[25vh] sm:h-[300px] md:h-[400px] lg:h-[500px]">
//         <img src={subCategoryBannerBg} alt="Background" className="w-full h-full object-cover" />
//         <div className="absolute bottom-0 right-0 flex items-center justify-end p-4 md:p-6 lg:p-8">
//           <img
//             src={subCategoryBanner}
//             alt="Banner"
//             className="w-[190px] sm:w-[300px] md:w-[400px] lg:w-[550px] h-auto object-contain"
//           />
//         </div>
//       </div>

//       <div className="flex justify-center p-4 sm:p-4 md:mx-10 sm:mx-4 md:p-4 mt-10 md:mt-20">
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full" style={{ gap: "30px" }}>
//           {displayProducts.length > 0 ? (
//             displayProducts.map((product, index) => (
//               <Link
//                 to="ProductDescription"
//                 state={{ productName: product.name }}
//                 key={index}
//               >
//                 <div className="shadow-lg shadow-gray-400/50 w-full p-4 rounded-lg flex flex-col justify-center items-center bg-white h-[225px]">
//                   <img
//                     src={product.image_path}
//                     alt={product.name}
//                     className="w-[85px] h-[100px] sm:w-[100px] sm:h[120px] md:w-[140px] lg:w-[100px] object-fit mb-4"
//                   />
//                   <div className="flex flex-col items-start text-left sm:text-left w-full">
//                     <p className="text-green-600 font-semibold text-sm sm:text-base">
//                       {product.price}
//                     </p>
//                     <p className="text-gray-800 mt-2 text-sm sm:text-base line-clamp-2">
//                       {product.name}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p>No Product Available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchCategoryName;

import React, { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { Link, useLocation } from "react-router-dom";
import subCategoryBannerBg from "../../images/sub-category-banner-bg.png";
import subCategoryBanner from "../../images/sub-category-banner.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { CircularProgress, Backdrop } from "@mui/material";

const SearchCategoryName = () => {
  const { search } = useLocation();
  const {
    products,
    categoryName,
    page,
    limit,
    totalProducts,
    handleSearch,
    loading,
  } = useContext(SearchContext);

  // Extract search parameters from URL
  const params = new URLSearchParams(search);
  const urlPage = parseInt(params.get("page")) || page;
  const urlLimit = parseInt(params.get("limit")) || limit;

  const totalPages = Math.ceil(totalProducts / limit);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      handleSearch(params.get("query"), newPage, limit);
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
          ) : products.length > 0 ? (
            products.map((product, index) => (
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
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No Product Available</p>
          )}
        </div>
      </div>

      {/* for pagination */}
      <div className="flex justify-center m-4">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => handlePageChange(value)}
            color="primary"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default SearchCategoryName;
