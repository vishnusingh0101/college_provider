import { ChevronLeft, Upload } from "lucide-react"
import { Link } from "react-router-dom"

export default function Preferences() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="mx-auto flex items-center gap-4">
          <a href="/" className="flex items-center text-black hover:opacity-80">
            <ChevronLeft className="w-5 h-5" />
          </a>
          <div className="flex items-center gap-2">
            <img src="https://s3-alpha-sig.figma.com/img/24b1/c630/1c0c754a0d521c8fc8309692577970e8?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UFJCJg5Lc9Z9tqj8TeewrYeW9VXCz~H5lOnIt8vx4Sn5g~CWTogayHPSSn-K25c8HCRO22fkBTqrSJxItxKzET5YmcJnxFkNiqmvxwfFxNTZYjdMS2-A56Jte3WRZ5QKtlQjSrT69c74Xdb66rTONJt0Bh0D6P-P5nDLxx9D7p1ehYp0CEOWVPvxZhJQeKEklocaMZ1ysr~6o5YyXmlgaXeBuqClIf8iItMg2x~5Z0Mhk6Cq-KQRPgakgsPxykmOA~cwDVrPTstSLDy6ukbrPVgB4NBEXLtQj2CafWXmtbkywiRJuH~t~wmeL3lV4XfoD8Zxvzk-jCYBNPHviU9cfA__" alt="College Connect Logo" className="w-6 h-6 object-contain" />
            <span className="font-medium">CollegeProvider</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="p-6 md:p-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-8 rounded-2xl border border-[#c2c2c2] bg-white">
          {/* Left Side - Illustration */}
          <div className="bg-[#f6f7f9] rounded-xl p-8 flex items-center justify-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/c48d/09e6/ccd55179023ff135791e6aadd80aaa31?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NWPDAbkpQbai~eRx1Zfl04Fe1EbYPAnuyMDekmVT24J5uCgmdUhNm3UkDBrDBfLUK7l9y6rFIuTGoQRwUGPio~lF9zugOpl63AhimXOgCRKzccqIzGh-F05F3A7pBpaTO~GRp8-l3~UxHRNxrZELYz-oHT0NxUqJgLbWeDxsqrIyAaxxbBu3POdOjWqnrvaVw0PlppZ7SDxFF1AFkYKg9BJGuv0Vypd~hoZEmBVSraYT4ggXYvtas2BDtT59MQemBkLq78ASrvbBJlHQhWfpOjM5Z7B9d1AUc837ypqcGSDqkw66XzzcCh5rk5xthSPorGP-vUddJmKW6jaRw27xKg__"
              alt="Create Account Illustration"
              className="w-full max-w-sm"
            />
          </div>

          {/* Right Side - Form */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Create Account</h1>

            <div className="space-y-4">
              {/* Register As Section */}
              <div>
                <h2 className="text-lg font-medium mb-3">Register as</h2>
                <button className="w-full text-left px-4 py-3 h-12 bg-[#f6f7f9] hover:bg-[#f6f7f9]/80 rounded-lg border border-[#e5e7eb]">
                  Aspirant
                </button>
              </div>

              {/* Join As Section */}
              <div>
                <h2 className="text-lg font-medium mb-3">Join as</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="px-4 py-3 h-12 bg-[#f6f7f9] hover:bg-[#f6f7f9]/80 rounded-lg border border-[#e5e7eb]">
                    Alumni
                  </button>
                  <button className="px-4 py-3 h-12 bg-[#f6f7f9] hover:bg-[#f6f7f9]/80 rounded-lg border border-[#e5e7eb]">
                    Faculty
                  </button>
                  <button className="px-4 py-3 h-12 col-span-2 bg-[#f6f7f9] hover:bg-[#f6f7f9]/80 rounded-lg border border-[#e5e7eb]">
                    Student
                  </button>
                </div>
              </div>

              {/* Select College Section */}
              <div>
                <h2 className="text-lg font-medium mb-3">Select College</h2>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-[#f6f7f9] rounded-lg border border-[#e5e7eb] appearance-none cursor-pointer">
                    <option value="" disabled selected>
                      Choose your college
                    </option>
                    <option value="college1">College 1</option>
                    <option value="college2">College 2</option>
                    <option value="college3">College 3</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Upload ID Section */}
              <div>
                <h2 className="text-lg font-medium mb-3">Upload ID</h2>
                <div className="flex items-center justify-between bg-[#f6f7f9] px-4 py-3 rounded-lg border border-[#e5e7eb]">
                  <span className="text-gray-600">Upload your ID card</span>
                  <button className="flex items-center px-3 py-1 text-sm hover:bg-gray-100 rounded">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </button>
                </div>
              </div>

              {/* Next Button */}
              <Link to="/verify-email">
                <button className="w-full h-12 bg-[#2c26b0] hover:bg-[#2c26b0]/90 text-white rounded-lg mt-4">
                  Next
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}