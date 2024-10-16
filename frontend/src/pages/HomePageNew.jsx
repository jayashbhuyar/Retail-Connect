import React from "react";
import { Link } from "react-router-dom";
import DistributorsNavbar from "../components/Navbar/DistributorsNavbar";
import RetailerNavbar from "../components/Navbar/RetailerNavbar";
import AdminNav from "../components/Navbar/AdminNav";

const HomePageNew = () => {
  const userData = JSON.parse(localStorage.getItem("userdata"));
  const userRole = userData?.role;

  const renderNavbar = () => {
    switch (userRole) {
      case "admin":
        return <AdminNav />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderNavbar()}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white min-h-screen flex flex-col">
        <header className="bg-black bg-opacity-30 p-6 flex justify-between items-center shadow-lg">
          <div className="flex items-center">
            <img
              src="https://www.myretailconnect.com/assets/img/Retail-Connect-Logo.png"
              alt="Retail Connect Logo"
              className="h-16 w-auto mr-4 rounded-full shadow-md"
            />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              RetailConnect
            </h1>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-semibold mb-6 animate-pulse">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              RetailConnect!
            </span>
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-2xl">
            Connecting retailers and distributors seamlessly. Manage your orders,
            products, and analytics effortlessly!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
            {[
              {
                title: "Efficient Order Management",
                description: "Track and manage your orders seamlessly with our intuitive interface.",
                image: "https://www.pfscommerce.com/wp-content/uploads/2020/05/RetailConnect-Store-Edition-FULL.gif",
              },
              {  
                title: "Shri Swami Samartha",
                description: "Ashakya te shakya kartil la swami",
                image: "https://wallpapers.com/images/hd/shri-swami-samarth-orange-outline-09lioe62nwrjool1.jpg",
              },
              // "Showcase your products with visually appealing listings and detailed descriptions."
              {
                title: "Analytics & Insights",
                description: "Get detailed insights to boost your sales and make informed decisions.",
                image: "https://cdn.dribbble.com/users/980520/screenshots/2859415/monitoring.gif",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-opacity-20 backdrop-filter backdrop-blur-sm flex flex-col items-center"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-40 w-auto mb-4 rounded-md"
                />
                <h3 className="text-2xl font-semibold mb-2 text-pink-300">
                  {feature.title}
                </h3>
                <p className="text-center text-purple-100">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </main>

        <footer className="bg-black bg-opacity-30 p-6 text-center shadow-lg">
          <p className="text-sm text-purple-200">
            © 2024 RetailConnect. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePageNew;