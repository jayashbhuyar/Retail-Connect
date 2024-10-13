import React, { useEffect, useState } from "react";
import axios from "axios";

const RejectedRetail = () => {
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("userdata")
    ? JSON.parse(localStorage.getItem("userdata")).email
    : null;

  useEffect(() => {
    const fetchRejectedOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders/rejected-by-email?userEmail=${userEmail}`
        );
        setRejectedOrders(response.data);
      } catch (err) {
        setError("Failed to fetch rejected orders.");
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchRejectedOrders();
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
    return <p className="text-gray-300">Loading rejected orders...</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">Rejected Orders</h1>
      {error && <p className="text-red-400">{error}</p>}
      {rejectedOrders.length === 0 ? (
        <p className="text-yellow-300">No rejected orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rejectedOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-700 bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              <img
                src={order.img}
                alt={order.productName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-200">{order.productName}</h2>
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
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => handleUpdateMessage(order._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                >
                  Update Message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedRetail;
