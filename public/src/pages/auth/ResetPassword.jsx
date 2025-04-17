import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function CreateAccount() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phoneNumber = queryParams.get("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [obj, setObj] = useState({ phone: phoneNumber, newPassword: "", confirmPassword: ""});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const { apiUrl } = useAuth();

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });

    if (name === "newPassword" || name === "confirmPassword") {
      setPasswordMatch(name === "newPassword" ? value === obj.confirmPassword : obj.newPassword === value);
    }

    if (name === "newPassword" || name === "confirmPassword") {
      setPasswordValid(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch || !passwordValid) return;
    try {
      const result = await axios.post(`${apiUrl}password/reset-password`, obj);

      console.log(result);

      if (result.status === 200) {
        alert("Password Changed Successfully! ✅");
        navigate(`/login`);
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
        {phoneNumber ? (
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
                <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="text-sm font-medium text-gray-900">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
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

                  <button
                    type="submit"
                    className="w-full bg-[#2c26b0] hover:bg-[#2c26b0]/90 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                    disabled={!passwordMatch || !passwordValid}
                  >
                    Submit
                  </button>
              </form>
            </div>
          </div>
        </div>
        ):(<p className="">404 Not Found</p>)
        }
      </div>
    </div>
  )
}