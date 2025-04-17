import { useState } from "react";
import { Phone, Video, MessageCircle, X, Search, CalendarIcon } from "lucide-react";
import { format } from "date-fns"

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
)

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const ShoppingBagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

function EditProfile() {

  const [date, setDate] = useState(new Date(2025, 7, 9)) // August 9, 2005
  const [calendarOpen, setCalendarOpen] = useState(false)

  const [accordionState, setAccordionState] = useState({
    "basic-info": false,
    "about-me": false,
    "my-expertise": false,
    "my-prices": false,
  })

  const toggleAccordion = (section) => {
    setAccordionState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }


  const Calendar = ({ selected, onSelect }) => {
    const [viewDate, setViewDate] = useState(selected || new Date())

    // Get days in month
    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate()
    }

    // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
    const getFirstDayOfMonth = (year, month) => {
      return new Date(year, month, 1).getDay()
    }

    const month = viewDate.getMonth()
    const year = viewDate.getFullYear()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    // Generate days for the calendar
    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    // Navigate to previous month
    const prevMonth = () => {
      setViewDate(new Date(year, month - 1, 1))
    }

    // Navigate to next month
    const nextMonth = () => {
      setViewDate(new Date(year, month + 1, 1))
    }

    // Check if a date is the same as the selected date
    const isSameDay = (date1, date2) => {
      return (
        date1 &&
        date2 &&
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      )
    }

    // Format month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    return (
      <div className="text-gray-600 p-4 rounded-md shadow-lg w-64">
        {/* Calendar header with navigation */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="text-gray-400 hover:bg-gray-700 p-1 rounded">
            &lt;
          </button>
          <div className="font-medium">
            {monthNames[month]} {year}
          </div>
          <button onClick={nextMonth} className="text-gray-400 hover:bg-gray-700 p-1 rounded">
            &gt;
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
            <div key={index} className="text-center text-xs text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div key={index} className="text-center">
              {date ? (
                <button
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    isSameDay(date, selected) ? "bg-teal-600 text-white" : "hover:bg-gray-700"
                  }`}
                  onClick={() => onSelect(date)}
                >
                  {date.getDate()}
                </button>
              ) : (
                <div className="w-8 h-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex gap-8">
        {/* Left Column - Profile */}
        {/* <div className="w-1/3">
          <div className="flex flex-col items-center mb-6">
            <div className="h-36 w-36 mb-4 border-2 border-gray-200 rounded-full overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-08%20at%2008.34.06_57cefe34.jpg-F4QD1U8ukVmQp9N2PNXhT1fMngo7xO.jpeg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="text-xl mb-4">UserName</div>

            <div className="flex gap-4">
              <button className="border border-gray-300 rounded-md px-3 py-1 bg-white hover:bg-gray-50">
                Edit image
              </button>
              <button className="border border-gray-300 rounded-md px-3 py-1 bg-white hover:bg-gray-50">
                Upload Video
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-medium">Your profile completion score</div>
                <div className="text-amber-600 text-sm">4 actions pending</div>
              </div>
              <div className="relative h-16 w-16">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full border-4 border-teal-500 border-r-transparent border-b-transparent rotate-45"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center font-bold">70%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-600">
                  ✓
                </div>
                <span className="text-sm">Full name</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-xs text-red-600">
                  !
                </div>
                <span className="text-sm">Profile picture</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-600">
                  ✓
                </div>
                <span className="text-sm">Organization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-xs text-red-600">
                  !
                </div>
                <span className="text-sm">Email</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-600">
                  ✓
                </div>
                <span className="text-sm">Bio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-xs text-red-600">
                  !
                </div>
                <span className="text-sm">Work experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-600">
                  ✓
                </div>
                <span className="text-sm">Designation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-xs text-red-600">
                  !
                </div>
                <span className="text-sm">Social profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-xs text-red-600">
                  !
                </div>
                <span className="text-sm">Profile video</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-600">
                  ✓
                </div>
                <span className="text-sm">My expertise</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-xs text-red-600">
                  !
                </div>
                <span className="text-sm">Phone number</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-xs text-red-600">
                  !
                </div>
                <span className="text-sm">Set availability</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Right Column - Form */}
        <div className="w-full">
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div
                className="px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion("basic-info")}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 p-1 rounded">
                    <EditIcon />
                  </div>
                  <span className="text-lg font-medium">Basic info</span>
                </div>
                <ChevronDownIcon
                  className={`transform transition-transform ${accordionState["basic-info"] ? "rotate-180" : ""}`}
                />
              </div>

              {accordionState["basic-info"] && (
                <div className=" grid px-4 pb-4">
                  <div>
                  <label className="block mb-2 text-sm">What should we call you?</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      className="border border-gray-700 rounded-md p-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="border border-gray-700 rounded-md p-2 w-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm">What is your current designation?</label>
                    <span className="text-xs text-gray-400">Max 110 chars</span>
                  </div>
                  <input
                    type="text"
                    className="border border-gray-700 rounded-md p-2 w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm">When is your birthday?</label>
                    <div className="relative">
                      {calendarOpen && (
                        <div className="z-10 mt-2 w-auto">
                          <Calendar selected={date} onSelect={(newDate) => setDate(newDate)} />
                        </div>
                      )}
                      <button
                        onClick={() => setCalendarOpen(!calendarOpen)}
                        className="w-full justify-start text-left font-normal border border-gray-700 rounded-md pl-10 h-10 flex items-center"
                      >
                        <CalendarIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        {date ? format(date, "MMM d, yyyy") : "Select date"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Phone number</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="border border-gray-700 rounded-md p-2 pl-16 w-full"
                      />
                      <div className="absolute left-3 top-2.5 flex items-center">
                        <div className="w-5 h-4 mr-1 flex items-center">
                          <div className="w-full h-4 bg-orange-500"></div>
                          <div className="w-full h-4 bg-white"></div>
                          <div className="w-full h-4 bg-green-500"></div>
                        </div>
                        <span className="text-gray-400">+91</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Email ID</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      className="border border-gray-700 rounded-md p-2 flex-1"
                    />
                    <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">Verify</button>
                  </div>
                </div>
                <button type="submit" className="bg-teal-600 hover:bg-teal-700 my-4 text-white px-4 py-2 rounded-md">Save Changes</button>
                </div>
              )}
            </div>

            {/* About Me */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div
                className="px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion("about-me")}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 p-1 rounded">
                    <UserIcon />
                  </div>
                  <span className="text-lg font-medium">About me</span>
                </div>
                <ChevronDownIcon
                  className={`transform transition-transform ${accordionState["about-me"] ? "rotate-180" : ""}`}
                />
              </div>

              {accordionState["about-me"] && (
                <div className="px-4 pb-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">What is your total work experience?</label>
                        <input
                          type="text"
                          defaultValue="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Where are you based?</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. New Delhi, Bangalore, Mumbai, Guwahati etc."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white pr-10"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <SearchIcon />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between">
                        <label className="block text-sm mb-2">What is your current organisation?</label>
                        <span className="text-xs text-gray-500">Max 110 chars</span>
                      </div>
                      <input
                        type="text"
                        defaultValue="Provider App"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between">
                        <label className="block text-sm mb-2">How would you describe yourself?</label>
                        <span className="text-xs text-gray-500">Max 280 chars</span>
                      </div>
                      <textarea
                        defaultValue="I can help with technology & operations"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white min-h-[100px]"
                      />
                    </div>
                  </div>
                  <button type="submit" className="bg-teal-600 hover:bg-teal-700 w-full my-4 text-white px-4 py-2 rounded-md">Save Changes</button>
                </div>
              )}
            </div>

            {/* My Expertise */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div
                className="px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion("my-expertise")}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 p-1 rounded">
                    <EditIcon />
                  </div>
                  <span className="text-lg font-medium">My expertise</span>
                </div>
                <ChevronDownIcon
                  className={`transform transition-transform ${accordionState["my-expertise"] ? "rotate-180" : ""}`}
                />
              </div>

              {accordionState["my-expertise"] && (
                <div className="px-4 pb-4">
                <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-400 mb-1">In what areas can you help others?</p>
                    <div className="relative">
                      <input
                        className="border border-gray-600 p-2 w-full rounded-md"
                        placeholder="Leadership/Coding/Marketing/Animation"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="text-white bg-teal-600 px-3 py-1 flex items-center gap-1 rounded border border-gray-600">
                      Technology Innovation
                      <X className="h-3 w-3 ml-1 cursor-pointer" />
                    </div>
                  </div>
                  <button type="submit" className="bg-teal-600 hover:bg-teal-700 w-full my-4 text-white px-4 py-2 rounded-md">Save Changes</button>
                  </div>
                </div>
              )}
            </div>

            {/* My Prices */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div
                className="px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion("my-prices")}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 p-1 rounded">
                    <LockIcon />
                  </div>
                  <span className="text-lg font-medium">My prices</span>
                </div>
                <ChevronDownIcon
                  className={`transform transition-transform ${accordionState["my-prices"] ? "rotate-180" : ""}`}
                />
              </div>

              {accordionState["my-prices"] && (
                <div className="px-4 pb-4">
                <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                      <div>
                      <Phone className="h-6 w-6 text-teal-700 px-1 inline" />
                      <label className="text-sm mb-2 font-bold text-teal-600">
                      Audio call
                      </label>
                      </div>
                      <span className="text-gray-500">/hr</span>
                      </div>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between">
                      <div>
                        <Video className="h-6 w-6 text-blue-700 inline px-1" />
                        <label className="text-sm mb-2 text-blue-600 font-bold">Video call</label>
                        </div>
                        <span className="text-gray-500">/hr</span>
                      </div>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between">
                      <div>
                        <MessageCircle className="h-6 w-6 text-orange-700 px-1 inline" />
                        <label className="text-sm mb-2 text-orange-600 font-bold">Chat</label>
                      </div>
                        <span className="text-gray-500">/hr</span>
                      </div>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                      />
                    </div>
                  </div>
                  <button type="submit" className="bg-teal-600 hover:bg-teal-700 w-full my-4 text-white px-4 py-2 rounded-md">Save Changes</button>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile;