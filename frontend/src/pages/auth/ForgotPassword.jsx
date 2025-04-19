import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPassword() {

  const [obj, setObj] = useState({ phone: "" });
  const [phoneValid, setPhoneValid] = useState(true);
  const navigate = useNavigate();
  const { apiUrl } = useAuth();

  const handleChange = (e) => { 
    
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });
    
    if (name === "phone") {
      setPhoneValid(/^[6-9]\d{9}$/.test(value));
    }
  
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();
    
    try {
      const result = await axios.post(`${apiUrl}password/request-password-reset`, obj);

      if (result.status === 200) {
        navigate(`/verify-otp?phone=${obj.phone}&mode=forgot-password`);
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-0 p-4 min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 flex items-center gap-2">
      <Link to="/login">
        <button className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </button>
      </Link>
        <div className="flex items-center gap-2">
          <img src="/assets/images/logo.png" alt="College Connect Logo" className="w-6 h-6 object-contain" />
          <span className="text-lg font-medium">CollegeProvider</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Illustration */}
            <div className="hidden md:block">
              <img
                src="/assets/images/otp.png"
                alt="Login Illustration"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Right Side - Login Form */}
            <div className="max-w-md w-full mx-auto space-y-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">Forgot Password</h1>
                <p className="text-gray-600">Forgot your password ?</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="mobile" className="block text-sm font-medium">
                      Enter Your Mobile Number
                    </label>
                    <div className="flex">
                      <div className="flex items-center gap-2 rounded-l-md border border-r-0 border-gray-200 bg-white px-3 text-gray-500">
                        +91
                      </div>
                      <input
                        id="mobile"
                        required
                        type="tel"
                        name="phone"
                        onChange={handleChange}
                        className={`w-full rounded-md border px-3 py-2 pr-10 border-gray-300 focus:outline-none focus:ring-1 ${phoneValid ? 'focus:ring-indigo-600' : 'focus:ring-red-500'}`}
                      />
                    </div>
                  </div>
                </div> 

                <button
                  type="submit"
                  className="w-full bg-[#2c26b0] hover:bg-[#2c26b0]/90 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}