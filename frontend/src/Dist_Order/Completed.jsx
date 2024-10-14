import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DistributorsNavbar from "../components/Navbar/DistributorsNavbar";

const Completed = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      const userData = JSON.parse(localStorage.getItem("userdata"));
      const distributorEmail = userData.email;

      if (!distributorEmail) {
        setError("Distributor email not found in local storage.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/orders/completed`, {
          params: {
            distributorEmail,
          },
        });
        setCompletedOrders(response.data);
      } catch (error) {
        console.error("Error fetching completed orders:", error);
        setError("Failed to fetch completed orders.");
      }
    };

    fetchCompletedOrders();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
    <DistributorsNavbar/>
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"> {/* Updated to allow 4 cards in a row */}
        {completedOrders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg transition-transform transform hover:scale-x-90"
          >
            <h2 className="text-lg font-bold text-white">{order.userName}</h2>
            <p className="text-gray-300 text-sm"><strong>Email:</strong> {order.userEmail}</p>
            <p className="text-gray-300 text-sm"><strong>Phone:</strong> {order.userPhone}</p>
            <p className="text-gray-300 text-sm"><strong>Shop Name:</strong> {order.shopName}</p>
            <p className="text-gray-300 text-sm"><strong>Quantity:</strong> {order.quantity}</p>
            <p className="text-gray-300 text-sm"><strong>Price:</strong> ${order.price}</p>
            <p className="text-gray-300 text-sm"><strong>Message:</strong> {order.msg}</p>
            <p className="text-gray-300 text-sm"><strong>Delivery Before:</strong> {order.deliveryBefore || 'N/A'}</p>
            <p className="text-gray-300 text-sm"><strong>Order Cancel Reason:</strong> {order.orderCancelReason || 'N/A'}</p>
            <p className="text-gray-300 text-sm"><strong>Retailer Address:</strong> {order.retailerAddress}</p>
            <img src={order.img} alt={order.productName} className="w-full h-auto rounded-md" /> {/* Ensure full width */}
            <p className="mt-2 text-gray-300 text-sm"><strong>Product Name:</strong> {order.productName}</p>
            <p className="text-gray-300 text-sm"><strong>Status:</strong> {order.status}</p>
            <p className="text-gray-300 text-sm"><strong>Completed On:</strong> {new Date(order.completedAt).toLocaleString()}</p> {/* Display completion time */}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Completed;
