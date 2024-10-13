import React, { useEffect, useState } from "react";
import axios from "axios";

const CompletedRetail = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("userdata")
    ? JSON.parse(localStorage.getItem("userdata")).email
    : null;

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders/completed-by-email?userEmail=${userEmail}`
        );
        setCompletedOrders(response.data);
      } catch (err) {
        setError("Failed to fetch completed orders.");
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchCompletedOrders();
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
    return <p className="text-gray-300">Loading completed orders...</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">Completed Orders</h1>
      {error && <p className="text-red-400">{error}</p>}
      {completedOrders.length === 0 ? (
        <p className="text-yellow-300">No completed orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedOrders.map((order) => (
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
                  Remove
                </button>
                <button
                  onClick={() => handleUpdateMessage(order._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200"
                >
                  Re-Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedRetail;
