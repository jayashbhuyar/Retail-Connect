import React, { useEffect, useState } from "react";
import axios from "axios";

const Accepted = () => {
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      const userData = JSON.parse(localStorage.getItem("userdata"));
      const distributorEmail = userData?.email; // Use optional chaining to avoid errors if userData is null

      if (!distributorEmail) {
        setError("Distributor email not found in local storage.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders/accepted`,
          {
            params: {
              distributorEmail,
            },
          }
        );
        setAcceptedOrders(response.data);
        if (response.data && response.data.length > 0) {
          // Remove this line if you don't have setRejectedOrders defined
          // setRejectedOrders(response.data); 
        } else {
          setError("No Accepted Orders found.");
        }
      } catch (error) {
        console.error("Error fetching accepted orders:", error);
        setError("Failed to fetch accepted orders.");
      }
    };

    fetchAcceptedOrders(); // Call the function here
  }, []); // Ensure the dependency array is cor

  const handleCompleteOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/orders/${orderId}/status`
      );
      const updatedOrder = response.data;

      // Update state to reflect the updated order
      setAcceptedOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update order status.");
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"> {/* Updated for smaller cards */}
        {acceptedOrders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg transition-transform transform hover:scale-100"
          >
            <h2 className="text-lg font-bold text-white">{order.userName}</h2>
            <p className="text-gray-300 text-sm">
              <strong>Email:</strong> {order.userEmail}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Phone:</strong> {order.userPhone}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Shop Name:</strong> {order.shopName}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Price:</strong> ${order.price}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Message:</strong> {order.msg}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Delivery Before:</strong> {order.deliveryBefore || "N/A"}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Order Cancel Reason:</strong>{" "}
              {order.orderCancelReason || "N/A"}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Retailer Address:</strong> {order.retailerAddress}
            </p>
            <img
              src={order.img}
              alt={order.productName}
              className="w-full h-32 object-cover mt-2 rounded-md" // Updated for fixed height and cover fit
            />
            <p className="mt-2 text-gray-300 text-sm">
              <strong>Product Name:</strong> {order.productName}
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Status:</strong> {order.status}
            </p>
            <button
              onClick={() => handleCompleteOrder(order._id)}
              className="mt-3 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-500 transition"
            >
              Mark as Completed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accepted;
