import React, { useState, useEffect } from "react";
import logo from "../images/image 1.png";
import closeup from "../images/close-up.png";
import google from "../images/google.png";
import facebook from "../images/facebook.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import useApi from "../Customhook/useApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ toggleForm, setModalOpen }) => {
  const [postData, setPostData] = useState({ email: "", password: "" });
  const [triggerApiCall, setTriggerApiCall] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const { data, loading, error } = useApi(
    triggerApiCall ? process.env.REACT_APP_LOGININ_API_URL : null,
    "POST",
    triggerApiCall ? postData : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   // Remove all spaces from the input value
  //   const formattedValue = value.replace(/\s+/g, '');
  //   setPostData((prevData) => ({ ...prevData, [name]: formattedValue }));
  // };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent the space character from being entered
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setTriggerApiCall(true); // Trigger the API call
    }
  };

  // useEffect(() => {
  //   if (data?.status === false && data.message) {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       api: data.message
  //     }));
  //     setTriggerApiCall(false); // Reset to avoid multiple hits
  //   } else if (data?.status === true) {
  //     setErrors({});
  //     console.log("Login successful:", data);
  //     localStorage.setItem("userToken", data.items.token);
  //     localStorage.setItem("userId", data.items.userId);
  //     alert("Login Successfully");
  //     setModalOpen(false);
  //     setTriggerApiCall(false); // Reset to avoid multiple hits
  //   }
  //   if (error) {
  //     console.error("Error:", error);
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       api: "An unexpected error occurred. Please try again."
  //     }));
  //     setTriggerApiCall(false); // Reset to avoid multiple hits
  //   }
  // }, [data, error]);

  useEffect(() => {
    if (data?.status === false && data.message) {
      if (data.message.includes("email")) {
        // Customize error handling if API provides specific messages
        setErrors({
          email: "This email doesn't exist. Please double-check your email",
          password: "",
        });
      } else if (data.message.includes("password")) {
        setErrors({
          email: "",
          password: "Invalid password",
        });
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: data.message,
        }));
      }
      setTriggerApiCall(false); // Reset to avoid multiple hits
    } else if (data?.status === true) {
      // API returned success
      setErrors({});
      console.log("Login successful:", data);
      localStorage.setItem("userToken", data.items.token);
      localStorage.setItem("userId", data.items.userId);
      alert("Login Successfully");
      setModalOpen(false);
      setTriggerApiCall(false); // Reset to avoid multiple hits
    }
    if (error) {
      console.error("Error:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        api: "An unexpected error occurred. Please try again.",
      }));
      setTriggerApiCall(false); // Reset to avoid multiple hits
    }
  }, [data, error]);

  const validateForm = () => {
    const errors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!postData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(postData.email)) {
      errors.email = "Write Valid Email Address";
    }

    if (!postData.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(postData.password)) {
      errors.password =
        "Password must include uppercase, lowercase, number, special character, and be 6+ chars.";
    }

    return errors;
  };

  return (
    <div className="flex h-full w-full items-center justify-center md:p-0">
      <div className="flex flex-col justify-center md:flex-row w-full h-full rounded-2xl bg-white border overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 md:p-8">
          <img
            src={logo}
            alt="Logo"
            className="w-40 h-12 mb-4 md:w-[200px] md:h-[58px]"
          />
          <form
            className="w-full justify-center items-center"
            method="POST"
            onSubmit={handleSubmit}
            action="#"
          >
            <div className="flex flex-col mt-4 ">
              <label className="text-black font-bold text-sm md:text-base text-left">
                Email address:
              </label>
              <input
                id="email"
                type="text"
                className="h-8  px-4 border rounded-lg border-gray-300"
                name="email"
                placeholder="Enter Your address"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
              />
              {errors.api && (
                <p className="text-red-500 text-sm mt-2">{errors.api}</p>
              )}
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col mt-4 relative">
              <label className="text-black font-bold text-sm md:text-base">
                Password:
              </label>
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                className="h-8 px-4 border rounded-lg border-gray-300 w-full pr-10" // Add some padding to the right for the icon
                name="password"
                placeholder="Enter Your Password"
                minLength="6"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
              />
              <span
                className="absolute right-2 top-9 sm:top-10 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              {errors.api && (
                <p className="text-red-500 text-sm mt-2">{errors.api}</p>
              )}
            </div>
            <div className="flex flex-col mt-6">
              <button
                type="submit"
                className="h-8 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg"
                onSubmit={handleSubmit}
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex items-center text-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-600">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-center">
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="google"
                src={google}
                sx={{ width: 24, height: 24 }}
              />
              <Avatar
                alt="facebook"
                src={facebook}
                sx={{ width: 24, height: 24 }}
              />
            </Stack>
          </div>
          <div className="flex justify-center items-center pt-4">
            <p className="text-sm font-semibold">
              Don’t have an account yet?{" "}
              <span
                className="text-green-600 cursor-pointer"
                onClick={toggleForm}
              >
                Register Now
              </span>
            </p>
          </div>
        </div>
        <div
          className="hidden md:block w-1/2  bg-cover bg-center"
          style={{ backgroundImage: `url(${closeup})` }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
