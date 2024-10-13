import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Pending = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const userData = JSON.parse(localStorage.getItem("userdata"));
      const distributorEmail = userData?.email;

      if (!distributorEmail) {
        setError("Distributor email is not set in local storage.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders/pending?distributorEmail=${distributorEmail}`
        );

        if (response.data && response.data.length > 0) {
          setOrders(response.data);
        } else {
          setError("No pending orders found.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);

        if (error.response && error.response.status === 404) {
          setError("No pending orders found.");
        } else {
          setError("Failed to fetch orders. Please try again later.");
        }
      }
    };

    fetchOrders();
  }, []);

  const handleAcceptClick = (order) => {
    setCurrentOrder(order);
    setShowDatePicker(true);
  };

  const acceptOrder = async () => {
    if (!deliveryDate) {
      setError("Please select a delivery date.");
      return;
    }

    try {
      await axios.patch(`http://localhost:8000/api/orders/status/${currentOrder._id}`, {
        status: "accepted",
        deliveryBefore: deliveryDate.toISOString(),
      });

      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== currentOrder._id));
      setShowDatePicker(false);
      setCurrentOrder(null);
      setDeliveryDate(null);
    } catch (error) {
      console.error("Error accepting order:", error);
      setError("Failed to accept the order. Please try again later.");
    }
  };

  const handleRejectClick = (order) => {
    setCurrentOrder(order);
    setShowRejectForm(true);
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    if (!rejectionReason) {
      setError("Please provide a reason for rejection.");
      return;
    }

    try {
      await axios.patch(`http://localhost:8000/api/orders/status/${currentOrder._id}`, {
        status: "rejected",
        orderCancelReason: rejectionReason,
      });

      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== currentOrder._id));
      setShowRejectForm(false);
      setCurrentOrder(null);
      setRejectionReason("");
    } catch (error) {
      console.error("Error rejecting order:", error);
      setError("Failed to reject the order. Please try again later.");
    }
  };

  return (
    <div className="bg-black min-h-screen"> {/* Changed background to black */}
      <div className="container mx-auto p-6 bg-gray-800">
        <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">Pending Orders</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-600 p-4 rounded-lg bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={order.img}
                alt={order.productName}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-teal-300">{order.productName}</h2>
              <p className="text-gray-400">Ordered by: {order.userName}</p>
              <p className="text-gray-400">Email: {order.userEmail}</p>
              <p className="text-gray-400">Phone: {order.userPhone}</p>
              <p className="text-gray-400">Shop Name: {order.shopName}</p>
              <p className="font-bold text-xl mt-2">Price: ${order.price}</p>
              <p className="text-gray-400">Quantity: {order.quantity}</p>
              <p className="text-gray-400">Address: {order.retailerAddress}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleAcceptClick(order)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-200"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectClick(order)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {showDatePicker && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-gray-800 p-6 rounded shadow-md w-80">
              <h2 className="text-lg font-semibold mb-4">Select Delivery Date</h2>
              <DatePicker
                selected={deliveryDate}
                onChange={(date) => setDeliveryDate(date)}
                minDate={new Date()}
                placeholderText="Select a delivery date"
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={acceptOrder}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-200"
                >
                  Submit
                </button>
                <button
                  className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200"
                  onClick={() => setShowDatePicker(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showRejectForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-gray-800 p-6 rounded shadow-md w-80">
              <h2 className="text-lg font-semibold mb-4">Reason for Rejection</h2>
              <form onSubmit={handleRejectSubmit}>
                <textarea
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                  placeholder="Enter rejection reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-200"
                  >
                    Submit
                  </button>
                  <button
                    className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200"
                    onClick={() => setShowRejectForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pending;