import { useState, useEffect } from "react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomePageNew from "../../pages/HomePageNew";
// import HomePageNew from "../../pages/HomePageNew";


const DistributorsNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileProductDropdownOpen, setIsMobileProductDropdownOpen] =
    useState(false);
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false); // State for orders dropdown
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("userdata");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProductDropdown = () =>
    setIsProductDropdownOpen(!isProductDropdownOpen);
  const toggleMobileProductDropdown = () =>
    setIsMobileProductDropdownOpen(!isMobileProductDropdownOpen);
  const toggleOrdersDropdown = () =>
    setIsOrdersDropdownOpen(!isOrdersDropdownOpen); // Toggle Orders Dropdown

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-25">
          <div className="flex-shrink-0">
            <Link to="/homepage">
              <img
                className="h-14 w-auto max-w-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1k4OmmdnQ9swvTRpaJML0CkWzJrg7XMO_JsqTl9xlCDzgftvgyiFeHPn56qZhxzzInA&usqp=CAU"
                alt="Your Company"
              />
            </Link>
          </div>
          <Link
            to="/mynetwork"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
          >
            Y're {userData && userData.role}
          </Link>
          {/* Desktop menu */}
          <div className="hidden sm:flex sm:space-x-6">
            <Link
              to="/retailerslist"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
            >
              Retailers
            </Link>

            {/* Product Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProductDropdown}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
              >
                Products <ChevronDownIcon className="w-5 h-5 ml-1" />
              </button>
              {isProductDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <Link
                    to="/addproduct"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/productlist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    All Products
                  </Link>
                </div>
              )}
            </div>

            {/* Orders Dropdown */}
            <div className="relative">
              <button
                onClick={toggleOrdersDropdown}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
              >
                Orders <ChevronDownIcon className="w-5 h-5 ml-1" />
              </button>
              {isOrdersDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <Link
                    to="/pendingorders_dist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Pending Orders
                  </Link>
                  <Link
                    to="/accepted_dist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Accepted Orders
                  </Link>
                  <Link
                    to="/rejected_dist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Rejected Orders
                  </Link>
                  <Link
                    to="/completed_dist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Completed Orders
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/requests"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
            >
              Requests
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="relative">
              <button
                type="button"
                className="bg-gray-800 flex items-center justify-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu-button"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                onClick={toggleUserMenu}
              >
                <span className="sr-only">Open user menu</span>
                {userData && userData.image ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={userData.image}
                    alt="User"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                    {userData && userData.firstName
                      ? userData.firstName.charAt(0).toUpperCase()
                      : "?"}
                  </div>
                )}
              </button>
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {userData
                      ? `${userData.name || "Guest"} ${userData.lastName || ""}`
                      : "Guest"}
                  </div>
                  <div className="px-4 py-2 text-xs text-gray-500">
                    {userData?.email || "No email"}
                  </div>
                  <div className="px-4 py-2 text-xs text-gray-500">
                    {userData?.companyName || userData?.shopName || ""}
                  </div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <button
                    onClick={() => {
                      localStorage.removeItem("userdata");
                      localStorage.removeItem("token");
                      window.location.href = "/auth/login"; // Redirect to login on logout
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>

            <div className="-mr-2 flex sm:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
          className="sm:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/retailerslist"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
            >
              Retailers
            </Link>

            {/* Mobile Product Dropdown */}
            <div className="relative">
              <button
                onClick={toggleMobileProductDropdown}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
              >
                Products
              </button>
              {isMobileProductDropdownOpen && (
                <div className="mt-1 space-y-1">
                  <Link
                    to="/addproduct"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/productlist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    All Products
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Orders Dropdown */}
            <div className="relative">
              <button
                onClick={toggleOrdersDropdown}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
              >
                Orders
              </button>
              {isOrdersDropdownOpen && (
                <div className="mt-1 space-y-1">
                  <Link
                    to="/pendingorders_dist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Pending Orders
                  </Link>
                  <Link
                    to="/acceptedorders_dist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Accepted Orders
                  </Link>
                  <Link
                    to="/rejected_dist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Rejected Orders
                  </Link>
                  <Link
                    to="/completedorders_dist"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Completed Orders
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/requests"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
            >
              Requests
            </Link>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
            >
              About
            </a>
          </div>
        </motion.div>
      )}
  {/* <HomePageNew/> */}
    </nav>
  );
};

export default DistributorsNavbar;
