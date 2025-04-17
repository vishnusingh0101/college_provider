import { useState } from "react"

const Staff = () => {
  const [activeTab, setActiveTab] = useState("Upcoming")

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Section */}
        <section className="space-y-6">
          <h1 className="text-2xl font-semibold">Profile</h1>

          <div className="space-y-4">
            {/* Profile Header */}
            <div className="flex items-start gap-4">
              <img src="/placeholder.svg?height=96&width=96" alt="Large Profile" className="w-24 h-24 rounded-full" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold">Aditya Dev</h2>
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <svg
                      className="h-4 w-4 text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600">Aspirant</p>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Achievements</h3>
              <p className="text-gray-600 max-w-3xl">
                Alumni are former students of a college or university who have graduated and moved on to their
                professional or personal pursuits. They play a vital role in supporting current students by sharing
                experiences, offering mentorship, and providing networking opportunities. Alumni often act as
                ambassadors for their institution, contributing to its growth and reputation.
              </p>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mt-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              {["Upcoming", "Saved", "Saved Colleges"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 text-gray-600 border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-[#5751e1] text-[#5751e1] font-medium"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Meeting Card */}
          <div className="mt-6">
            <div className="max-w-md border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <img src="/placeholder.svg?height=40&width=40" alt="Deva" className="w-10 h-10 rounded-full" />
                <span className="text-lg font-medium">Deva</span>
              </div>

              <div className="space-y-1">
                <div className="flex gap-2">
                  <span className="text-gray-600">Date :</span>
                  <span>15 Jan 2025</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Time :</span>
                  <span>10:00 PM</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-[#5751e1] hover:bg-[#2c26b0] text-white py-2 px-4 rounded-md transition-colors">
                  Start Meeting
                </button>
                <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                  <svg
                    className="h-4 w-4 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Staff;