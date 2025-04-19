import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [obj, setObj] = useState({ phone: "", password: "" });
  const [phoneValid, setPhoneValid] = useState(true);
  const navigate = useNavigate();
  const { apiUrl } = useAuth();
  const [loading, setLoading] = useState(false);


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
      setLoading(true);
      const result = await axios.post(`${apiUrl}user/login`, obj);
      if (result.status === 200) {
        localStorage.setItem("authToken", result.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
            alert("⚠️ " + data.message);
        } else if (status === 401) {
            alert("❌ Invalid credentials! Please check your password.");
        } else if (status === 403) {
            alert("🔒 Phone number not verified! Redirecting to OTP verification...");
            navigate(`/verify-otp?phone=${obj.phone}&mode=signup`);
        } else if (status === 404) {
            alert("🚫 User not found! Please check your phone number.");
        } else {
            alert("❗ Internal server error! Please try again later.");
        }
      } else {
        console.error("Login error:", error);
        alert("Something went wrong. Please check your network.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading ? (
              <div className="flex flex-col items-center justify-center min-h-screen py-10">
                <HashLoader size={50} color="#3B82F6" loading={loading} />
                <p className="text-gray-500 mt-4">Logging in ...</p>
              </div>
            ) : (
    <div className="absolute top-0 min-h-screen bg-white p-4">
      {/* Header */}
      <div className="p-4 md:p-6 ">
        <div className="flex items-center gap-2">
          <img src="/assets/images/logo.png" alt="College Connect Logo" className="h-6 w-6" />
          <span className="font-medium">CollegeProvider</span>
        </div>
      </div>
      
      <main className="container mx-auto px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Illustration */}
            <div className="flex items-center justify-center rounded-xl bg-slate-50 p-8">
              <img
                src="/assets/images/login.png"
                alt="Login Illustration"
                className="w-full max-w-md"
              />
            </div>

            {/* Right Side - Login Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">Log in</h1>
                <p className="text-gray-600">Enter your credentials</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                {/* Mobile Input */}
                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-sm font-medium text-gray-900">
                    Mobile
                  </label>
                  <div className="flex">
                    <div className="flex items-center gap-2 rounded-l-md border border-r-0 border-gray-300 bg-white px-3 text-gray-500">
                      +91
                    </div>
                    <input
                      id="mobile"
                      type="tel"
                      name="phone"
                      required
                      onChange={handleChange}
                      className={`w-full rounded-md border px-3 py-2 pr-10 border-gray-300 focus:outline-none focus:ring-1 ${phoneValid ? 'focus:ring-indigo-600' : 'focus:ring-red-500'}`}
                    />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium">
                      Enter Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
                    Forgot Password ?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2c26b0] hover:bg-[#2c26b0]/90 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  disabled={ !phoneValid }
                >
                  Login
                </button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link to="/register" className="text-[#2c26b0] hover:text-[#2c26b0]/90 font-medium">
                    Create Account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
            )}
            </>
  )
}