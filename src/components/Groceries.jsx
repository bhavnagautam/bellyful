import React from "react";
import { useState, useEffect } from "react";
import useApi from "../Customhook/useApi";
import backgrountblue from "../images/empty-studio-blue.png";
import pngitem from "../images/Pngitem.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import defaultImage from "../images/assorted-beverage-1.png";

const Groceries = () => {
  const location = useLocation();
  console.log("location", location);
  const { category, categoryName } = location?.state || "house_hold";
 
  const [subcategories, setSubcategories] = useState([]);

  // const [isSubcategory, setIsSubcategory] = useState(false);

  var token = localStorage.getItem("userToken");

  const { data, loading, error } = useApi(
    `${process.env.REACT_APP_GET_CATEGORY_API_URL}?category=${encodeURIComponent(category)}`,
    "GET",
    null,
    token
  );

  useEffect(() => {
    if (data) {
      console.log("All Subcategories", data);
      if (location.pathname === "/Groceries/category") {
        const fetchedSubcategories =
          data.categories[location.state.index]?.sub_categories;
        if (fetchedSubcategories && fetchedSubcategories.length > 0) {
          setSubcategories(fetchedSubcategories);
        }
        // setSubcategories(data.categories[location.state.index]?.sub_categories);
      }
      if (location.pathname === "/Groceries") {
        setSubcategories(data.categories);
      }
    }
    if (error) {
      console.error("Error:", error);
    }
  }, [location, data, error]);

  return (
    <>
      <div className="relative w-full h-[25vh] sm:h-[300px] md:h-[400px] lg:h-[500px]">
        <img
          src={backgrountblue}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-5 h-full flex items-center justify-end p-2 md:p-4 lg:p-8">
          <img
            src={pngitem}
            alt="Groceries"
            className="w-[150px] md:w-[300px] lg:w-[556px] h-auto object-contain"
          />
        </div>
        <div className="absolute top-1/2 left-5 md:left-4 lg:left-[135px] transform -translate-y-1/2 flex flex-col items-start md:items-start p-2 md:p-4 lg:p-8">
          <div className="text-white font-sans text-left md:text-left">
            <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#000000]">
              Groceries
            </p>
            <p className="text-3xl md:text-4xl lg:text-6xl font-bold text-white">
              at your
            </p>
            <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#000000]">
              doorstep
            </p>
          </div>
        </div>
      </div>
      {/* <p className="p-4 md:pl-10 md:text-2xl bg-green-100">{category} &gt; {categoryName}</p> */}

      <p className="p-4 md:pl-10 md:text-2xl bg-green-100">
        {category === "groceries"
          ? "Grocery"
          : category === "house_hold"
          ? "Household Cleaner"
          : "Other Category"}{" "}
        &gt; {categoryName}
      </p>

      {/* <div className="flex justify-center md:justify-end p-4">
        <div className="relative w-full max-w-[418px]">
          <input
            type="search"
            placeholder="Search by City"
            className="w-full h-[35px] rounded-full border border-gray-300 px-4 pr-10"
          />
          <ExpandMoreIcon
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            fontSize="small"
          />
        </div>
      </div> */}
      <div className="flex justify-center p-4 md:mx-10 sm:mx-4 md:p-4 ">
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full"
          style={{ gap: "30px" }}
        >
          {subcategories?.map((subcategory, index) => (
            <Link
              to={subcategory.sub_categories ? "category" : "subcategory"}
              state={{
                categoryName: subcategory.name,
                category: category,
                // isSubcategory: isSubcategory,
                index: index,
              }}
              onClick={() => {
                if (subcategory.sub_categories) {
                  setSubcategories(subcategory.sub_categories);
                  // setIsSubcategory(true);
                }
              }}
              key={index}
            >
              <div className="bg-[#F2FFE6] w-full h-[170px]  sm:h-[250px]  rounded-lg flex flex-col justify-between items-center p-4 shadow-custom">
                <p className="text-center font-bold text-xs sm:text-sm md:text-md lg:text-lg line-clamp-2 mb-4">
                  {subcategory.name}
                </p>
                <div className=" w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] md:w-[198px] md:h-[166px] object-fit ">
                  <img
                    src={
                      subcategory.image_url
                        ? subcategory.image_url
                        : defaultImage
                    }
                    alt={subcategory.name}
                    className=" w-full h-full "
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Groceries;
