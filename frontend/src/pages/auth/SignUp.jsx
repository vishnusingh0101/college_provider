import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [obj, setObj] = useState({ name: "", phone: "", password: "", confirmPassword: ""});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const { apiUrl } = useAuth();

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(name === "password" ? value === obj.confirmPassword : obj.password === value);
    }
    

    if (name === "phone") {
      setPhoneValid(/^[6-9]\d{9}$/.test(value));
    }

    if (name === "password" || name === "confirmPassword") {
      setPasswordValid(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch || !phoneValid || !passwordValid) return;
    try {
      const result = await axios.post(`${apiUrl}user/SignUp`, obj);

      console.log(result);

      if (result.status === 201) {
        navigate(`/verify-otp?phone=${obj.phone}&mode=signup`);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="absolute top-0 p-4 min-h-screen bg-slate-50">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <img src="/assets/images/logo.png" alt="College Connect Logo" className="h-6 w-6" />
            <span className="font-medium">CollegeProvider</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl rounded-2xl border border-indigo-900/10 bg-white p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Side - Illustration */}
            <div className="flex items-center justify-center rounded-xl bg-slate-50 p-8">
              <img
                src="/assets/images/register.png"
                alt="Create Account Illustration"
                className="w-full max-w-md"
              />
            </div>

            {/* Right Side - Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                <p className="text-gray-500">Connect with colleges</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-900">
                    Enter your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="name"
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                {/* Mobile Input */}
                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-sm font-medium text-gray-900">
                    Mobile
                  </label>
                  <div className="flex">
                    <div className="flex items-center gap-2 rounded-l-md border border-r-0 border-gray-200 bg-white px-3 text-gray-500">
                      +91
                    </div>
                    <input
                      id="mobile"
                      type="tel"
                      name="phone"
                      required
                      onChange={handleChange}
                      className={`w-full rounded-md border px-3 py-2 border-gray-200 focus:outline-none focus:ring-1 ${phoneValid ? 'focus:ring-indigo-600' : 'focus:ring-red-500'}`}
                    />
                  </div>
                </div>

                {/* Email Input */}
                {/* <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="email"
                      className="w-full rounded-md border border-gray-200 px-3 py-2 pr-10 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    />
                    <User className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                </div> */}

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-900">
                    Enter Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      placeholder="Password"
                      onChange={handleChange}
                      className={`w-full rounded-md border px-3 py-2 pr-10 border-gray-200 focus:outline-none focus:ring-1 ${passwordValid ? 'focus:ring-indigo-600' : 'focus:ring-red-500'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Must be at least 8 characters consist of 1 capital letter, 1 digit and 1 special character (!@#$%^&*).</p>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      required
                      onChange={handleChange}
                      className={`w-full rounded-md border px-3 py-2 pr-10 border-gray-200 focus:outline-none focus:ring-1 ${passwordMatch ? 'focus:ring-green-500' : 'focus:ring-red-500'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {!passwordMatch && <p className="focus:text-red-500 text-xs">Passwords do not match.</p>}
                </div>

                {/* Submit Button */}
                {/* <Link to="/verify-otp"> */}
                  <button
                    type="submit"
                    className="w-full bg-[#2c26b0] hover:bg-[#2c26b0]/90 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                    disabled={!passwordMatch || !phoneValid || !passwordValid}
                  >
                    Register
                  </button>
                {/* </Link> */}
                <div className="text-center text-sm">
                  <span className="text-gray-600">Already have an account? </span>
                  <Link to="/login" className="text-[#2c26b0] hover:text-[#2c26b0]/90 font-medium">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}