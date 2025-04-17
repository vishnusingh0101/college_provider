import { Github, Twitter, Linkedin } from "lucide-react";
import { useAuth } from '../../context/AuthContext';

export default function Footer(){
  const { isLoggedIn } = useAuth();

    return (
      <>
      {isLoggedIn ? (
        <footer className="bg-gray-900 text-white mt-20">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="text-lg font-semibold underline">About Us</h3>
                <p className="mt-4 text-sm text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold underline">Quick Links</h3>
                <ul className="mt-4 space-y-2 text-sm text-white">
                  <li>
                    <a href="#" className="hover:text-gray-300">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-300">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold underline">Contact</h3>
                <ul className="mt-4 space-y-2 text-sm text-white">
                  <li>Email: info@example.com</li>
                  <li>Phone: (123) 456-7890</li>
                  <li>Address: 123 Street, City</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold underline">Follow Us</h3>
                <div className="mt-4 flex space-x-4">
                  <a href="#" className="text-white hover:text-gray-300">
                    <Github className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-gray-300">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-gray-300">
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-white pt-8 text-center text-sm text-white">
              <p>&copy; 2025 CollegeConnect. All rights reserved.</p>
            </div>
          </div>
        </footer>): null}
        </>
    )
}