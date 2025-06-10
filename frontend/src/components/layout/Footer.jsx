import { Github, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
// import { useAuth } from '../../context/AuthContext';

export default function Footer(){
  // const { isLoggedIn } = useAuth();

    return (
      <>
      {/* {isLoggedIn ? ( */}
        <footer className="bg-gradient-to-b from-indigo-700 via-indigo-800 to-indigo-900 text-white mt-20">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="text-lg font-semibold underline">About Us</h3>
                <h1 className="text-lg font-bold mt-4">College Provider</h1>
                <p className=" text-sm text-white">Platform to connects colleges, alumni and students.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold underline">Quick Links</h3>
                <ul className="mt-4 space-y-2 text-sm text-white">
                  <li>
                    <Link to="/" className="hover:text-gray-300">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/colleges" className="hover:text-gray-300">
                      College
                    </Link>
                  </li>
                  <li>
                    <Link to="/college-predictor" className="hover:text-gray-300">
                      College Predictor
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us" className="hover:text-gray-300">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold underline">Contact</h3>
                <ul className="mt-4 space-y-2 text-sm text-white">
                 <li>Email: <a href="mailto:providerteam.in@gmail.com" className="hover:text-indigo-600 transition-colors">providerteam.in@gmail.com</a></li>
<li>Phone: <a href="tel:+917303831326" className="hover:text-indigo-600 transition-colors">+91 73038 31326</a></li>
                  <li>Knowledge Park 3, Greater Noida</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold underline">Follow Us</h3>
                <div className="mt-4 flex space-x-4">
                  {/* <a href="#" className="text-white hover:text-gray-300">
                    <Github className="h-6 w-6" />
                  </a> */}
                  {/* <a href="#" className="text-white hover:text-gray-300">
                    <Twitter className="h-6 w-6" />
                  </a> */}
                  <a href="https://www.linkedin.com/company/providerapp/" className="text-white hover:text-gray-300">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="https://www.instagram.com/providerapp.in?igsh=N3d3bjV4NnQ4cDZ1" className="text-white hover:text-gray-300">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="https://www.youtube.com/@providerapp" className="text-white hover:text-gray-300">
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
                <div>
                <Link to="/about-us#join-us" className="text-white hover:text-gray-300">
                <h3 className="text-lg font-semibold mt-4">Join Our Platform</h3>
                </Link>
              </div>
              </div>
            </div>
            <div className="mt-8 border-t border-white pt-8 text-center text-sm text-white">
              <p>&copy; 2025 CollegeProvider. All rights reserved.</p>
            </div>
          </div>
        </footer>
        {/* ): null} */}
        </>
    )
}