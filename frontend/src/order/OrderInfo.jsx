import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RetailerNavbar from "../components/Navbar/RetailerNavbar";

const OrderInfo = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [distributorInfo, setDistributorInfo] = useState(null); // State for distributor information
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://localhost:8000/api/products/${productId}`
      );
      const data = await response.json();
      setProduct(data);
    };

    const fetchDistributorInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/${productId}/distributor`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch distributor info");
        }

        const data = await response.json();
        setDistributorInfo(data); // Set distributor information in state
      } catch (error) {
        console.error("Error fetching distributor info:", error);
      }
    };

    fetchProduct();
    fetchDistributorInfo(); // Fetch distributor info on component mount
  }, [productId]);

  const handleOrder = async () => {
    const userData = JSON.parse(localStorage.getItem("userdata")); // Retrieve all user data from local storage
    const retailerId = userData?.id; // Get retailer ID
    const distributorId = product?.distributorId; // Assuming you have this field in your product
    const missingFields = [];

    // Detailed validation checks
    if (!retailerId) {
      missingFields.push("Retailer ID");
    }
    if (!productId) {
      missingFields.push("Product ID");
    }
    if (quantity <= 0) {
      missingFields.push("Quantity (must be greater than 0)");
    }
    if (!message) {
      missingFields.push("Message");
    }

    // Alert if there are missing fields
    if (missingFields.length > 0) {
      alert(`The following fields are required: ${missingFields.join(", ")}`);
      return; // Stop execution if validation fails
    }

    const orderData = {
      distributorName: distributorInfo.name,
      distributorEmail: distributorInfo.email,
      userId: userData.id,
      img: distributorInfo.img,
      productName: distributorInfo.productName,
      userName: userData?.name, // Add retailer's name
      userEmail: userData?.email, // Add retailer's email
      userPhone: userData?.phone, // Add retailer's phone
      shopName: userData?.shopName, // Add retailer's shop name
      quantity,
      price: product.price,
      msg: message,
      deliveryBefore: null,
      orderCancelReason: null,
      retailerAddress: userData?.address, // Add retailer's address
    };

    const response = await fetch("http://localhost:8000/api/orders/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      const orderResponse = await response.json();
      alert("Order placed successfully!"); // Alert for successful order placement
      navigate("/productlistall"); // Redirect after successful order placement
    } else {
      const errorResponse = await response.json();
      alert(errorResponse.error); // Alert for any errors
    }
  };

  return (
    <>
      <RetailerNavbar />
      <div className="container mx-auto p-6 bg-gray-900 min-h-screen">
        {product ? (
          <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">
              {product.productName}
            </h1>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 md:ml-8">
                <p className="text-gray-300 text-lg mb-4">
                  {product.description}
                </p>
                <p className="text-2xl font-semibold text-gray-200 mb-4">
                  Price: ${product.price.toFixed(2)}
                </p>

                <div className="flex items-center mb-4">
                  <label
                    htmlFor="quantity"
                    className="mr-3 text-lg font-medium text-gray-300"
                  >
                    Quantity:
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    className="border border-gray-600 rounded-md p-2 w-20 text-lg bg-gray-700 text-white"
                  />
                </div>

                <div className="mb-4">
                  <textarea
                    placeholder="Leave a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-gray-600 rounded-md p-3 w-full h-32 resize-none text-lg bg-gray-700 text-white shadow-sm"
                  />
                </div>

                <button
                  onClick={handleOrder}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-lg text-gray-300">
            Loading product information...
          </div>
        )}
      </div>
    </>
  );
};

export default OrderInfo;
