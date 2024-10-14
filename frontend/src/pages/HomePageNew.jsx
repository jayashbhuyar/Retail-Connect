// HomePage.jsx

import React from "react";
import { Link } from "react-router-dom";
import DistributorsNavbar from "../components/Navbar/DistributorsNavbar";
import RetailerNavbar from "../components/Navbar/RetailerNavbar";
import AdminNav from "../components/Navbar/AdminNav";

const HomePageNew = () => {

  const userData = JSON.parse(localStorage.getItem("userdata"));
  const userRole = userData?.role; // Fetch the user's role from local storage

  // Determine which navbar to render based on user role
  const renderNavbar = () => {
    switch (userRole) {
      // case "retailer":
      //   return <RetailerNavbar />;
      // case "distributor":
      //   return <DistributorsNavbar />;
      case "admin":
        return <AdminNav />;
      default:
        return null; // Return nothing if no role matches
    }
  };
  return (
    <>
   
    {renderNavbar()} {/* Render the appropriate navbar */}
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="bg-gray-800 p-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center">
          <img
            src="https://www.myretailconnect.com/assets/img/Retail-Connect-Logo.png"
            alt="Retail Connect Logo"
            className="h-16 w-auto mr-4"
          />
          <h1 className="text-5xl font-bold">RetailConnect</h1>
        </div>
        {/* <nav className="space-x-4">
          <Link
            to="/login"
            className="text-blue-300 hover:text-blue-400 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-blue-300 hover:text-blue-400 transition duration-200"
          >
            Sign Up
          </Link>
        </nav> */}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-semibold mb-6">
          Welcome to <span className="text-blue-400">RetailConnect!</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Connecting retailers and distributors seamlessly. Manage your orders,
          products, and analytics effortlessly!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
            <img
              src="https://www.pfscommerce.com/wp-content/uploads/2020/05/RetailConnect-Store-Edition-FULL.gif"
              alt="Efficient Order Management"
              className="h-40 w-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">
              Efficient Order Management
            </h3>
            <p className="text-center">
              Track and manage your orders seamlessly with our intuitive
              interface.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
            <img
              src="https://i.pinimg.com/originals/96/2f/f6/962ff6c2e535eebc9d762cf420b631c8.gif"
              alt="Dynamic Product Listings"
              className="h-40 w-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">
              Dynamic Product Listings
            </h3>
            <p className="text-center">
              Showcase your products with visually appealing listings and
              detailed descriptions.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
            <img
              src="https://cdn.dribbble.com/users/980520/screenshots/2859415/monitoring.gif"
              className="h-40 w-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">
              Analytics & Insights
            </h3>
            <p className="text-center">
              Get detailed insights to boost your sales and make informed
              decisions.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 p-6 text-center shadow-lg">
        <p className="text-sm">© 2024 RetailConnect. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
};

export default HomePageNew;
