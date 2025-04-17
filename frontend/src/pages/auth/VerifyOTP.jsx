import React, { useState, useEffect, searchParams } from "react"
import { ArrowLeft } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../context/AuthContext";



export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const { apiUrl } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phoneNumber = queryParams.get("phone");
  const mode = queryParams.get("mode");
  // const [toastMessage, setToastMessage] = useState("");

  // const showToast = (message) => {
  //   setToastMessage(message);
  //   setTimeout(() => setToastMessage(""), 3000);
  // };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.value && element.nextElementSibling) {
      element.nextElementSibling.focus()
    }
  }

  const resendOTP = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${apiUrl}user/resend-otp`, {
        phone: phoneNumber,
      });

      if (result.status === 200) {
        setTimer(60);
        setIsResendDisabled(true);
        toast.success("✅ OTP sent successfully");
        // showToast("✅ OTP sent successfully");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
        console.error("Invalid OTP: Must be 6 digits.");
        return;
    }

    // Select API URL based on mode
    const apiURL = mode === "signup"
        ? `${apiUrl}user/verify-otp`
        : `${apiUrl}password/verify-password-reset`;

    try {
        const response = await axios.post(apiURL, {
            phone: phoneNumber,
            otp: otpValue,
        });

        console.log("API Response:", response);

        if (response.status === 200) {
          if (mode === "signup") {
              localStorage.setItem("authToken", response.data.token);
              navigate(`/`);
          } else {
              navigate(`/reset-password?phone=${phoneNumber}`);
          }
        }
      } catch (error) {
        console.error(`${mode === "signup" ? "Signup" : "Forgot Password"} OTP verification failed:`, error);
      }
    };


  return (
    <>
    <header className="absolute top-0 p-4 flex items-center gap-2">
      {/* <Link to="/login">
        <button className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </button>
      </Link> */}
      <div className="flex items-center gap-2">
        <img src="/assets/images/logo.png" alt="College Connect Logo" className="w-6 h-6 object-contain" />
        <span className="text-lg font-medium">CollegeProvider</span>
      </div>
    </header>
    {phoneNumber ? (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit}>
      <div className="w-full max-w-md bg-white rounded-2xl p-6 space-y-8">

        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-black">Enter OTP</h1>
            <p className="text-gray-600">we have sent an OTP to {phoneNumber?phoneNumber:"your contact number"}</p>
          </div>

          <div className="flex justify-center">
            <img
              src="/assets/images/otp.png"
              alt="Security Illustration"
              className="w-3/4 h-auto object-contain"
            />
          </div>

          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                className={`w-10 h-10 text-center text-2xl font-bold rounded-lg border-2 
                  ${digit ? "border-indigo-600 bg-indigo-600 text-white" : "border-gray-300 bg-gray-100"}
                  focus:border-indigo-600 focus:outline-none transition-colors`}
              />
            ))}
          </div>

          <button
          type="submit"
          disabled={otp.join("").length !== 6}
          className={`mt-2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white cursor-pointer bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto ${otp.join("").length !== 6 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Submit
          </button>

          <br />

          <button onClick={resendOTP}  disabled={isResendDisabled} className={`text-indigo-600 hover:text-indigo-800 font-medium transition-colors cursor-pointer ${isResendDisabled ? "opacity-50 cursor-not-allowed" : ""}`}>
          {isResendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </button>
        </div>
      </div>
      </form>
    </div>
    ) : (<p className="">404 Not Found</p>)
    }
    <ToastContainer position="top-center" autoClose={3000} />
    {/* {toastMessage && (
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
        {toastMessage}
      </div>
    )} */}
    </>
  )
}