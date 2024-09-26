// import React, { useState, useRef } from "react";
// import DehazeIcon from "@mui/icons-material/Dehaze";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { Link } from "react-router-dom";

// const AllCategoryDropdown = ({ categories }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [openCategory, setOpenCategory] = useState(null);
//   const [openSubcategory, setOpenSubcategory] = useState(null);
//   const closeDropdownTimeoutRef = useRef(null);

//   const handleMouseEnter = () => {
//     clearTimeout(closeDropdownTimeoutRef.current);
//     setIsDropdownOpen(true);

//   };

//   const handleMouseLeave = () => {
//   closeDropdownTimeoutRef.current = setTimeout(() => {
//   setIsDropdownOpen(false);
//   setOpenCategory(null);
//   setOpenSubcategory(null);
// }, 200);
//   };

//   const handleCategoryHover = (index) => {
//     clearTimeout(closeDropdownTimeoutRef.current);
//     setOpenCategory(index);
//     setOpenSubcategory(null);
//   };

//   const handleSubcategoryHover = (index) => {
//     clearTimeout(closeDropdownTimeoutRef.current);
//     setOpenSubcategory(index);
//   };

//   return (
//     <div className="relative">
//       {/* All Category Button */}
//       <div
//         className="flex items-center bg-lime-300 h-[29px] w-[205px] border border-lime-200 rounded-full cursor-pointer"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <p className="text-sm font-semibold text-amber-50 w-full h-full flex items-center justify-center">
//           <DehazeIcon className="mr-1" />
//           All Category
//         </p>
//       </div>

//       {/* Dropdown Menu */}
//       {isDropdownOpen && (
//         <div
//           className="absolute text-black top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md z-50"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <ul>
//             {categories?.map((category, index) => (
//               <li
//                 key={index}
//                 className="group relative cursor-pointer py-1 px-2 hover:bg-gray-100"
//                 onMouseEnter={() => handleCategoryHover(index)}
//                 onMouseLeave={() => {
//                   setOpenCategory(null);
//                 }}
//               >
//                 {category.name}
//                 {openCategory === index && category.subcategories && (
//                   <ul
//                     className="absolute left-full top-0 mt-2 w-48 bg-white shadow-md rounded-md"
//                     onMouseLeave={() => setIsDropdownOpen(false)}
//                   >
//                     {category?.subcategories?.map((subcategory, subIndex) => (
//                       <li
//                         key={subIndex}
//                         className="group relative cursor-pointer py-1 px-2 hover:bg-gray-100 flex items-center justify-between"
//                         onMouseEnter={() => handleSubcategoryHover(subIndex)}
//                         onMouseLeave={() => {
//                           setOpenSubcategory(null);
//                         }}
//                       >
//                         <Link
//                           to={
//                             subcategory.sub_categories
//                               ? "category"
//                               : "subcategory"
//                           }
//                           state={{
//                             categoryName: subcategory.name,
//                             isSubcategory: false,
//                             index: subIndex,
//                           }}
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <span>{subcategory.name}</span>
//                         </Link>
//                         {subcategory?.sub_categories && (
//                           <ArrowForwardIosIcon fontSize="small" />
//                         )}
//                         {openSubcategory === subIndex &&
//                           subcategory.sub_categories && (
//                             <ul className="absolute left-full top-0 mt-2 w-48 bg-white shadow-md rounded-md">
//                               {subcategory?.sub_categories?.map(
//                                 (subSubcategory, subSubIndex) => (
//                                   <li
//                                     key={subSubIndex}
//                                     className="cursor-pointer p-2 hover:bg-gray-100"
//                                   >
//                                     <Link
//                                       to="subcategory"
//                                       state={{
//                                         categoryName: subSubcategory.name,
//                                         isSubcategory: true,
//                                         index: subIndex,
//                                       }}
//                                       onClick={(e) => e.stopPropagation()}
//                                     >
//                                       <span> {subSubcategory.name} </span>
//                                     </Link>
//                                   </li>
//                                 )
//                               )}
//                             </ul>
//                           )}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllCategoryDropdown;

import React, { useState, useEffect, useRef } from "react";
import useApi from "../../Customhook/useApi";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress, Backdrop } from "@mui/material";

const AllCategoryDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const closeDropdownTimeoutRef = useRef(null);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([
    {
      name: "Household Cleaners",
      subcategories: [], // Initialize with empty array
    },
    {
      name: "Grocery",
      subcategories: [],
    },
  ]);
  const [category, setCategory] = useState("house_hold");
  const navigate = useNavigate();
  var token = localStorage.getItem("userToken");


  const getCategory = (index) => {
    if (index === 0) {
      setCategory("house_hold");
    }
    if (index === 1) {
      setCategory("groceries");
    }
  };

  const { data, loading, error,fetchData } = useApi(
    `${process.env.REACT_APP_GET_CATEGORY_API_URL}?category=${category}`,
    "GET",
    null,
    token
  );

  useEffect(() => {
    setSubcategories([]);
    fetchData()
  }, [category])
  

  useEffect(() => {
    if (data) {
      setSubcategories(data.categories);
    }
    if (error) {
      console.error("Error:", error);
    }
  }, [data, error]);

  useEffect(() => {
    setCategories((prevCategories) => prevCategories.map((category) => category.name === "Household Cleaners" || "Grocery"
          ? { ...category, subcategories }: category
      )
    );
  }, [subcategories]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width >= 300 && width <= 600);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(closeDropdownTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeDropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setOpenCategory(null);
      setOpenSubcategory(null);
    }, 200);
  };

  const handleCategoryHover = (index) => {
    clearTimeout(closeDropdownTimeoutRef.current);
    setOpenCategory(index);
    setOpenSubcategory(null);
  };

  const handleSubcategoryHover = (index) => {
    clearTimeout(closeDropdownTimeoutRef.current);
    setOpenSubcategory(index);
  };

  // const handleCategoryClick = (categoryName) => {
  //   if (isMobileView) {
  //     // Redirect to the respective page on mobile view
  //     navigate(categoryName === "house_hold" || "groceries"? "category" : "subcategories");
  //     setIsDropdownOpen(false);
  //   }
  // };
  const handleCategoryClick = (categoryName) => {
    if (isMobileView) {
      if (categoryName === "Household Cleaners") {
        navigate("/Groceries");
      } else if (categoryName === "Grocery") {
        navigate("/Groceries");
      }
      setIsDropdownOpen(false);
    }
  };

  const filteredCategories = isMobileView
    ? [{ name: "Household Cleaners" }, { name: "Grocery" }]
    : categories;

  return (
    <div className="relative">
      {/* All Category Button */}
      <div
        className="flex items-center bg-lime-300 h-[29px] w-[205px] border border-lime-200 rounded-full cursor-pointer"
        onMouseEnter={!isMobileView ? handleMouseEnter : undefined}
        onMouseLeave={!isMobileView ? handleMouseLeave : undefined}
        onClick={isMobileView ? handleMouseEnter : undefined}
      >
        <p className="text-sm font-semibold text-amber-50 w-full h-full flex items-center justify-center">
          <DehazeIcon className="mr-1" />
          All Category
        </p>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="absolute text-black top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md z-50"
          onMouseEnter={!isMobileView ? handleMouseEnter : undefined}
          onMouseLeave={!isMobileView ? handleMouseLeave : undefined}
        >
          <ul>
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
            filteredCategories?.map((category, index) => (
              <li
                key={index}
                className="group relative cursor-pointer py-1 px-2 hover:bg-gray-100"
                onMouseEnter={
                  !isMobileView
                    ? () => {
                        handleCategoryHover(index);
                        getCategory(index);
                      }
                    : undefined
                }
                onClick={
                  isMobileView
                    ? () => handleCategoryClick(category.name)
                    : undefined
                }
              >
                {category.name}
                {openCategory === index && category.subcategories && (
                  <ul
                    className="absolute left-full top-0 mt-2 w-48 bg-white shadow-md rounded-md"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {category?.subcategories?.map((subcategory, subIndex) => (
                      <li
                        key={subIndex}
                        className="group relative cursor-pointer py-1 px-2 hover:bg-gray-100 flex items-center justify-between"
                        onMouseEnter={() => handleSubcategoryHover(subIndex)}
                        onMouseLeave={() => {
                          setOpenSubcategory(null);
                        }}
                      >
                        <Link
                          to={
                            subcategory.sub_categories
                              ? ""
                              : "subcategory"
                          }
                          state={{
                            categoryName: subcategory.name,
                            isSubcategory: false,
                            index: subIndex,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{subcategory.name}</span>
                        </Link>
                        {subcategory?.sub_categories && (
                          <ArrowForwardIosIcon fontSize="small" />
                        )}
                        {openSubcategory === subIndex &&
                          subcategory.sub_categories && (
                            <ul className="absolute left-full top-0 mt-2 w-48 bg-white shadow-md rounded-md">
                              {subcategory?.sub_categories?.map(
                                (subSubcategory, subSubIndex) => (
                                  <li
                                    key={subSubIndex}
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                  >
                                    <Link
                                      to="subcategory"
                                      state={{
                                        categoryName: subSubcategory.name,
                                        isSubcategory: true,
                                        index: subIndex,
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <span>{subSubcategory.name}</span>
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllCategoryDropdown;
