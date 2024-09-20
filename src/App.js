import "./App.css";
import Header from "./components/header/Headers.jsx";
import Homepage from "./components/Home/Homepage.jsx";
import Footer from "./components/footer/Footer.jsx";
import SubCategory from "./components/subcategory/SubCategory.jsx";
import Cart from "./components/cart/cart.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout.jsx";
import Faqs from "./components/Faqs.jsx";
import Groceries from "./components/Groceries.jsx";
import ProductDescription from "./components/ProductDescription.jsx";
import { AppProvider } from "./context/AppContext";
import Searchcategoryname from "./components/subcategory/Searchcategoryname.jsx"

function App() {
  return (
    <div className="App">
      <AppProvider>
          <Routes>
            {/* <Route path="/home" element={<DefaultLayout />} /> */}
            {/* <Route path="login" element={<Login />} />
          <Route path="signUp" element={<Signup />} /> */}

            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Homepage />} />
              <Route path="searchcategoryname" element={<Searchcategoryname />} />
              <Route path="searchcategoryname/ProductDescription" element={<ProductDescription />}/>
              <Route path="subcategory" element={<SubCategory />} />
              <Route path="Faqs" element={<Faqs />} />
              <Route path="Groceries" element={<Groceries />} />
              <Route path="Groceries/category" element={<Groceries />} />
              <Route
                path="Groceries/category/subcategory"
                element={<SubCategory />}
              />
              <Route path="Groceries/subcategory" element={<SubCategory />} />
              <Route
                path="Groceries/category/subcategory/ProductDescription"
                element={<ProductDescription />}
              />
              <Route
                path="Groceries/subcategory/ProductDescription"
                element={<ProductDescription />}
              />
              <Route
                path="subcategory/ProductDescription"
                element={<ProductDescription />}
              />
              <Route path="Cart" element={<Cart />} />
              <Route
                path="Groceries/category/subcategory/ProductDescription/Cart"
                element={<Cart />}
              />
              <Route
                path="Groceries/subcategory/ProductDescription/Cart"
                element={<Cart />}
              />
            </Route>
          </Routes>
      </AppProvider>
    </div>
  );
}
export default App;