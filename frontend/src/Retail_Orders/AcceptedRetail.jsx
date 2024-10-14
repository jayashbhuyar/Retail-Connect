import React, { useEffect, useState } from "react";
import axios from "axios";
import RetailerNavbar from "../components/Navbar/RetailerNavbar";
const AcceptedRetail = () => {
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("userdata")
    ? JSON.parse(localStorage.getItem("userdata")).email
    : null;

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders/accepted-by-email?userEmail=${userEmail}`
        );
        setAcceptedOrders(response.data);
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError("Failed to fetch accepted orders.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (userEmail) {
      fetchAcceptedOrders();
    }
  }, [userEmail]);

  const handleCancelOrder = (orderId) => {
    console.log(`Cancel order with ID: ${orderId}`);
    // Implement API call to cancel the order
  };

  const handleUpdateMessage = (orderId) => {
    console.log(`Update message for order with ID: ${orderId}`);
    // Implement API call to update the message
  };

  if (loading) {
    return <p className="text-gray-300">Loading accepted orders...</p>;
  }

  return (
    <>
    <RetailerNavbar/>
  
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">Accepted Orders</h1>
      {error && <p className="text-red-400">{error}</p>}
      {acceptedOrders.length === 0 ? (
        <p className="text-yellow-300">No accepted orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acceptedOrders.map((order) => (
            <div key={order._id} className="border border-gray-600 p-4 rounded-lg bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={order.img}
                alt={order.productName}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-semibold text-teal-300">{order.productName}</h2>
              <p className="text-gray-400">
                <strong>Distributor Name:</strong> {order.distributorName}
              </p>
              <p className="text-gray-400">
                <strong>Distributor Email:</strong> {order.distributorEmail}
              </p>
              <p className="text-gray-400">
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p className="text-gray-400">
                <strong>Price:</strong> ${order.price}
              </p>
              <p className="text-gray-400">
                <strong>Status:</strong> {order.status}
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => handleUpdateMessage(order._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200"
                >
                  Update Message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default AcceptedRetail;
