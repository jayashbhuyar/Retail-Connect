import React, { useEffect, useState } from "react";

const DistributorsList = () => {
  const [distributors, setDistributors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDistributors = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8000/api/users/distributors"
        );
        const data = await response.json();
        if (response.ok) {
          setDistributors(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("An error occurred while fetching distributors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  const handleAddToNetwork = async (distributor) => {
    setError(null); // Clear previous errors
    const userEmail = JSON.parse(localStorage.getItem("userdata"))?.email; // Get user email from local storage
  
    try {
      const response = await fetch(`http://localhost:8000/api/network/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ distributorEmail: distributor.email, userEmail }), // Send both emails
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(`You have added ${distributor.name} to your network!`); // Notify user of success
      } else {
        setError(data.error); // Handle error response
      }
    } catch (error) {
      setError("An error occurred while adding to the network.");
    }
  };

  return (
    <div className="bg-black min-h-screen"> {/* Set background to black */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">Distributors List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading && <p className="text-white text-center">Loading distributors...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {distributors.length === 0 && !loading && <p className="text-white text-center">No distributors found.</p>}
          {distributors.map((distributor) => (
            <div
              key={distributor._id}
              className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col transition-transform transform hover:scale-105"
            >
              <img
                src={distributor.image}
                alt={distributor.name}
                className="h-40 w-full object-cover rounded-md mb-4 border-2 border-gray-200 shadow-md"
              />
              <h3 className="text-lg font-bold text-teal-300">{distributor.name}</h3>
              <p className="text-gray-400">Company Name: {distributor.companyName}</p>
              <p className="text-gray-400">Email: {distributor.email}</p>
              <p className="text-gray-400">Phone: {distributor.phone}</p>
              <p className="text-gray-400">Created At: {new Date(distributor.createdAt).toLocaleDateString()}</p>
              <div className="mt-auto flex space-x-2">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
                  aria-label={`Message ${distributor.name}`}
                >
                  Message
                </button>
                <button
                  onClick={() => handleAddToNetwork(distributor)}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-200"
                  aria-label={`Add ${distributor.name} to network`}
                >
                  Add to Network
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistributorsList;