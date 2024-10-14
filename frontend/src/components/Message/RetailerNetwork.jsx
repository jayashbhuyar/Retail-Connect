import React, { useEffect, useState } from "react";
import RetailerNavbar from "../Navbar/RetailerNavbar";
const RetailerNetwork = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [error, setError] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem("userdata"))?.email; // Get user email from local storage

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      if (!userEmail) {
        setError("User email not found. Please log in.");
        return;
      }
      console.log("Fetching accepted requests for email:", userEmail); // Log the email being used
      try {
        const response = await fetch(
          `http://localhost:8000/api/network/accepted/retailer?email=${userEmail}` // Fetch accepted requests
        );
        const data = await response.json();
        if (response.ok) {
          setAcceptedRequests(data); // Correctly set the accepted requests
        } else {
          setError(data.error || "Failed to fetch accepted requests.");
        }
      } catch (error) {
        setError("An error occurred while fetching accepted requests.");
      }
    };

    fetchAcceptedRequests();
  }, [userEmail]);

  return (
    <>
   <RetailerNavbar/>
    <div className="p-6 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-100">My Network</h2>
      {error && <p className="text-red-400">{error}</p>}
      {acceptedRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acceptedRequests.map((request) => (
            <div
              key={request._id}
              className="bg-gradient-to-r from-teal-600 to-blue-600 shadow-lg rounded-lg p-5 flex flex-col relative transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-white">
                {request.distributorName}
              </h3>
              <p className="text-gray-300">Email: {request.distributorEmail}</p>
              <p className="text-gray-300">Status: {request.status}</p>
              <h3 className="text-lg font-semibold mt-4 text-white">
                Retailer Info
              </h3>
              <p className="text-gray-300">User Name: {request.userName}</p>
              <p className="text-gray-300">User Email: {request.userEmail}</p>
              <p className="text-gray-300">
                Created At: {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No accepted network requests found.</p>
      )}
    </div>
    </>
  );
};

export default RetailerNetwork;
