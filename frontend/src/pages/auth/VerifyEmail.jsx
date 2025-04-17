import { ArrowLeft } from "lucide-react"

export default function VerifyEmail() {
  return (
    <div className="absolute top-0 min-h-screen w-full bg-white p-4 md:p-6 lg:p-8">
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
              src="https://s3-alpha-sig.figma.com/img/24b1/c630/1c0c754a0d521c8fc8309692577970e8?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UFJCJg5Lc9Z9tqj8TeewrYeW9VXCz~H5lOnIt8vx4Sn5g~CWTogayHPSSn-K25c8HCRO22fkBTqrSJxItxKzET5YmcJnxFkNiqmvxwfFxNTZYjdMS2-A56Jte3WRZ5QKtlQjSrT69c74Xdb66rTONJt0Bh0D6P-P5nDLxx9D7p1ehYp0CEOWVPvxZhJQeKEklocaMZ1ysr~6o5YyXmlgaXeBuqClIf8iItMg2x~5Z0Mhk6Cq-KQRPgakgsPxykmOA~cwDVrPTstSLDy6ukbrPVgB4NBEXLtQj2CafWXmtbkywiRJuH~t~wmeL3lV4XfoD8Zxvzk-jCYBNPHviU9cfA__"
              alt="College Connect Logo"
              className="h-auto w-[180px]"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-center text-2xl font-bold text-black md:text-3xl">Verify Email</h1>

            <div className="space-y-2 text-center">
              <p className="text-sm text-gray-600 md:text-base">
                Before proceeding, please verify your email address by clicking the link we just sent you.
              </p>
              <p className="text-sm text-gray-600 md:text-base">
                If you didn't receive it, we're happy to send another
              </p>
            </div>

            {/* Resend Button */}
            <button
              onClick={() => {}}
              className="w-full rounded-lg bg-[#2c26b0] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2c26b0]/90 focus:outline-none focus:ring-2 focus:ring-[#2c26b0] focus:ring-offset-2 md:text-base"
            >
              Resend Verification Email
            </button>

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