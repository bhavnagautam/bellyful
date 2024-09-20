// import React, { createContext, useState, useCallback } from "react";
// import debounce from "lodash.debounce";
// import { useNavigate } from "react-router-dom";

// // Create Context
// export const SearchContext = createContext();

// // Search Provider Component
// export const SearchProvider = ({ children }) => {
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(12);
//   const [products, setProducts] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [triggerSearch, setTriggerSearch] = useState(false);
//   const token = localStorage.getItem("userToken");
//   const navigate = useNavigate();

//   const apiUrl = `${process.env.REACT_APP_GET_PRODUCT_DATABYNAME}?searchTerm=${query}&page=${page}&limit=${limit}`;

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch(apiUrl, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//             ...(token && { 'token': token }), // Conditionally add Authorization header
//           },
//       });
//       const data = await response.json();
//       if (data.status === true && Array.isArray(data.items.products)) {
//         setProducts(data.items.products);
//         setCategoryName(data.items.products[0]?.category || "Data is not available");
//         navigate(`/searchcategoryname`, {
//           state: { products: data.items.products, categoryName, page, limit },
//         });
//       } else {
//         console.warn("No products found or invalid data structure", data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }, [apiUrl, page, limit, token, navigate]);

//   const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData]);

//   const handleSearch = () => {
//     setTriggerSearch(true);
//     debouncedFetchData();
//   };

//   const contextValue = {
//     query,
//     setQuery,
//     page,
//     setPage,
//     limit,
//     setLimit,
//     products,
//     setProducts,
//     categoryName,
//     setCategoryName,
//     triggerSearch,
//     handleSearch,
//   };

//   return (
//     <SearchContext.Provider value={contextValue}>
//       {children}
//     </SearchContext.Provider>
//   );
// };


// import React, { createContext, useState, useCallback, useEffect } from "react";
// import debounce from "lodash.debounce";
// import { useNavigate, useLocation } from "react-router-dom";

// // Create Context
// export const SearchContext = createContext();

// // Search Provider Component
// export const SearchProvider = ({ children }) => {
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(12);
//   const [products, setProducts] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [triggerSearch, setTriggerSearch] = useState(false);
//   const token = localStorage.getItem("userToken");
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Read URL parameters
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const queryParam = params.get('query');
//     const pageParam = params.get('page');
//     const limitParam = params.get('limit');

//     if (queryParam) setQuery(queryParam);
//     if (pageParam) setPage(Number(pageParam));
//     if (limitParam) setLimit(Number(limitParam));

//     // Trigger search when query changes
//     if (queryParam) {
//       handleSearch(queryParam, Number(pageParam), Number(limitParam));
//     }
//   }, [location.search]);

//   const fetchData = useCallback(async (searchQuery, searchPage = page, searchLimit = limit) => {
//     const apiUrl = `${process.env.REACT_APP_GET_PRODUCT_DATABYNAME}?searchTerm=${searchQuery}&page=${searchPage}&limit=${searchLimit}`;
//     try {
//         const response = await fetch(apiUrl, {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(token && { 'token': token }), // Conditionally add Authorization header
//             },
//         });
//         const data = await response.json();
//         if (data.status === true && Array.isArray(data.items.products)) {
//             setProducts(data.items.products);
//             setCategoryName(data.items.products[0]?.category || "Data is not available");
//             navigate(`/searchcategoryname`, {
//                 state: { products: data.items.products, categoryName, page, limit },
//             });
//         } else {
//             console.warn("No products found or invalid data structure", data);
//         }
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }, [token]);



//   const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData]);

//   const handleSearch = (searchQuery, searchPage = page, searchLimit = limit) => {
//     setQuery(searchQuery);
//     setPage(searchPage);
//     setLimit(searchLimit);
//     setTriggerSearch(true);

//     // Update URL with search parameters
//     navigate(`/searchcategoryname?query=${searchQuery}&page=${searchPage}&limit=${searchLimit}/`);

//     // Fetch data based on the search query
//     debouncedFetchData(searchQuery, searchPage, searchLimit);
// };


//   const contextValue = {
//     query,
//     setQuery,
//     page,
//     setPage,
//     limit,
//     setLimit,
//     products,
//     setProducts,
//     categoryName,
//     setCategoryName,
//     triggerSearch,
//     handleSearch,
//   };

//   return (
//     <SearchContext.Provider value={contextValue}>
//       {children}
//     </SearchContext.Provider>
//   );
// };


import React, { createContext, useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import { useNavigate, useLocation } from "react-router-dom";

// Create Context
export const SearchContext = createContext();

// Search Provider Component
export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const location = useLocation();

  // Read URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query');
    const pageParam = params.get('page');
    const limitParam = params.get('limit');

    if (queryParam) setQuery(queryParam);
    if (pageParam) setPage(Number(pageParam));
    if (limitParam) setLimit(Number(limitParam));

    // Trigger search when query changes
    if (queryParam) {
      handleSearch(queryParam, Number(pageParam), Number(limitParam));
    }
  }, [location.search]);

  const fetchData = useCallback(async (searchQuery, searchPage, searchLimit) => {
    const apiUrl = `${process.env.REACT_APP_GET_PRODUCT_DATABYNAME}?searchTerm=${searchQuery}&page=${searchPage}&limit=${searchLimit}`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'token': token }), // Conditionally add Authorization header
        },
      });
      const data = await response.json();
      if (data.status === true && Array.isArray(data.items.products)) {
        setProducts(data.items.products);
        setTotalProducts(data.items.totalProducts); // Set total products for pagination
        setCategoryName(data.items.products[0]?.category || "Data is not available");

        // Check if we need to navigate back to homepage
        const totalPages = Math.ceil(data.items.totalProducts / searchLimit);
        if (searchPage > totalPages) {
          navigate("/"); // Navigate to homepage if the page number exceeds total pages
        } else {
          const currentUrl = new URL(window.location.href);
          const newUrl = `/searchcategoryname?query=${searchQuery}&page=${searchPage}&limit=${searchLimit}`;
          if (currentUrl.pathname + currentUrl.search !== newUrl) {
            navigate(newUrl);
          }
        }
      } else {
        console.warn("No products found or invalid data structure", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [token, navigate]);

  const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData]);

  const handleSearch = (searchQuery, searchPage = page, searchLimit = limit) => {
    setQuery(searchQuery);
    setPage(searchPage);
    setLimit(searchLimit);
    setTriggerSearch(true);

    // Fetch data based on the search query
    debouncedFetchData(searchQuery, searchPage, searchLimit);
  };

  const contextValue = {
    query,
    setQuery,
    page,
    setPage,
    limit,
    setLimit,
    products,
    setProducts,
    totalProducts,
    setTotalProducts,
    categoryName,
    setCategoryName,
    triggerSearch,
    handleSearch,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
