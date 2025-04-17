import { Fragment, useState, useRef, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  BookmarkAltIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CursorClickIcon,
  DesktopComputerIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  MenuIcon,
  NewspaperIcon,
  OfficeBuildingIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Phone, MessageCircle, ArrowUp } from "lucide-react"
import { useAuth } from '../../context/AuthContext';

const Menu = [
  {
    name: 'Home',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '/',
    icon: ChartBarIcon,
  },
  { name: 'College', description: "Your customers' data will be safe and secure.", href: '/colleges', icon: ShieldCheckIcon },
  {
    name: 'College Predictor',
    description: "Connect with third-party tools that you're already using.",
    href: '/college-predictor',
    icon: ViewGridIcon,
  },
  {
    name: 'About',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '/about-us',
    icon: CursorClickIcon,
  },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const FloatingActions = () => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  
    return (
      <div className="fixed z-10 bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => window.open("https://wa.me/+917303831326", "_blank")}
          className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
        <button
          onClick={() => window.open("tel:+917303831326")}
          className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
        >
          <Phone className="h-5 w-5" />
        </button>
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    )
  }
  // const navigate = useNavigate();
  const dropdownRef = useRef(null)
  const { isLoggedIn, userProfile, handleLogout, isDropdownOpen, setIsDropdownOpen } = useAuth();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])


  return (
    <>
    {isLoggedIn ? (
    <Popover className="fixed top-0 bg-white z-30 w-full">
      <div className="absolute inset-0  pointer-events-none" aria-hidden="true" />
      <div className="relative z-20">
        <div className="mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-16">
          <div className="flex items-center text-xl font-bold">
            {/* <img 
              src="/assets/images/logo.png" 
              alt="CollegeConnect Logo" 
              className="w-10 h-10" 
            /> */}
            <span className='text-black'>College</span>
            <span className='text-indigo-600'>Provider</span>
          </div>
          <div className="lg:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

            <div className="hidden lg:flex-1 lg:flex lg:justify-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames(
                    'transition duration-300 hover:-translate-y-0.5 px-5',
                    isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'
                  )
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/colleges"
                className={({ isActive }) =>
                  classNames(
                    'transition duration-300 hover:-translate-y-0.5 px-5',
                    isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'
                  )
                }
              >
                College
              </NavLink>
              <NavLink
                to="/college-predictor"
                className={({ isActive }) =>
                  classNames(
                    'transition duration-300 hover:-translate-y-0.5 px-5',
                    isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'
                  )
                }
              >
                College Predictor
              </NavLink>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  classNames(
                    'transition duration-300 hover:-translate-y-0.5 px-5',
                    isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600'
                  )
                }
              >
                About Us
              </NavLink>
            </div>
          

          
            <div className="relative" ref={dropdownRef}>
                <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-full py-1 px-2"
                >
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <img
                    src="/placeholder.svg"
                    alt="User avatar"
                    className="h-8 w-8 rounded-full"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = userProfile.name.charAt(0).toUpperCase();
                    }}
                  />
                </div>
                <span className="text-sm font-medium">{userProfile.name}</span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                <div className="absolute right-0 mt-6 w-48 bg-white rounded-md py-1 z-10 border border-gray-300">
                  <Link to="/profile" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600">
                    Profile
                  </Link>
                  <Link to="/meetings" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600">
                    Upcoming meetings
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-md shadow-sm cursor-pointer text-base font-medium text-indigo-500 hover:text-indigo-800">
                    Log out
                  </button>
                </div>
                )}
              </div>
        
            {/* <div className="lg:flex items-center md:ml-12 hidden">
            <Link to="/login" className="text-base font-medium text-gray-500 hover:text-indigo-600 transition duration-300 hover:-translate-y-0.5">
              Log in
            </Link>
            <Link
              to="/register"
              className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition duration-300 hover:-translate-y-0.5 bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div> */}
        
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 sm:pb-8">
              <div className="flex items-center justify-between">
                <div className="py-6 px-5">

                  <div className="relative" ref={dropdownRef}>
                    <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-gray-100 rounded-full py-1 px-2"
                    >
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <img
                        src="/placeholder.svg"
                        alt="User avatar"
                        className="h-8 w-8 rounded-full"
                        onError={(e) => {
                          e.target.style.display = "none"
                          const firstLetter = userProfile.name.charAt(0).toUpperCase(); // Get the first letter of the user's name
                          const initialsElement = document.createElement("span"); // Create a new span element
                          initialsElement.textContent = firstLetter; // Set the text to the first letter
                          initialsElement.className = "h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-white"; // Add classes for styling
                          e.target.parentElement.appendChild(initialsElement);
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">{userProfile.name}</span>
                    </button>
                      
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
                      <Link to="/profile" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600">
                        Profile
                      </Link>
                      <Link to="/meetings" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600">
                        Upcoming meetings
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-md shadow-sm cursor-pointer text-base font-medium text-indigo-500 hover:text-indigo-800">
                        Log out
                      </button>
                    </div>
                    )}
                  </div>
                </div>

                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 cursor-pointer">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
                <div className="mt-6 sm:mt-8">
                  <nav>
                    <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                      {Menu.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
      <FloatingActions />
    </Popover>
    ) : null 
    }
    </>
  )
}
