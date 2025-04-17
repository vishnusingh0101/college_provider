import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function ResetEmail() {
  return (
    <div className="min-h-screen w-full bg-white p-4 md:p-6 lg:p-8">
      {/* Back Button */}
      <div className="mx-auto max-w-[480px] w-full">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </a>

        {/* Main Card */}
        <div className="mt-8 w-full rounded-xl border border-[#2c26b0] p-6 md:p-8">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img
              src=""
              alt="College Connect Logo"
              className="h-auto w-[180px]"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-center text-2xl font-bold text-black md:text-3xl">Check Email</h1>

            <div className="space-y-2 text-center">
              <p className="text-sm text-gray-600 md:text-base">
              Please check your inbox 
              for an email with a link to reset your password.
              </p>
            </div>

            {/* Resend Button */}
            <Link to="/login">
            <button
              onClick={() => {}}
              className="w-full rounded-lg bg-[#2c26b0] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2c26b0]/90 focus:outline-none focus:ring-2 focus:ring-[#2c26b0] focus:ring-offset-2 md:text-base"
            >
              Back to Login
            </button>
            </Link>

            {/* Help Text */}
            <div className="space-y-1 pt-4 text-center">
              <p className="text-sm font-medium text-gray-900 md:text-base">Didn't receive the email?</p>
              <p className="text-xs text-gray-600 md:text-sm">
                Check your spam folder or try using a different email address
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}