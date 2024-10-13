import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RetailerNavbar from "../Navbar/RetailerNavbar";

const ProductListAll = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product for more info

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products/all"); // Adjust the endpoint as necessary
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("An error occurred while fetching products.");
      }
    };

    fetchProducts();
  }, []);

  const handleMoreInfo = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/products/${productId}`
      );
      const data = await response.json();
      if (response.ok) {
        setSelectedProduct(data); // Set the selected product details
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while fetching product details.");
    }
  };

  const handleOrder = (productId) => {
    console.log(`Order product ID: ${productId}`);
  };

  const handleAddToCart = (productId) => {
    console.log(`Add to cart product ID: ${productId}`);
  };

  return (
    <>
      <RetailerNavbar />
      <div className="p-6 bg-gray-900 min-h-screen">
        <h2 className="text-4xl font-bold text-white mb-6 text-center">
          Product List
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 text-white shadow-md rounded-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2">
                  {product.productName}
                </h3>
                <p className="text-gray-400">Type: {product.productType}</p>
                <p className="text-gray-400">
                  Price: ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-400 mb-4">
                  Quantity: {product.quantity}
                </p>
                <div className="mt-auto flex space-x-2">
                  <button
                    onClick={() => handleMoreInfo(product._id)}
                    className="bg-blue-400 text-white px-4 py-2 h-11 rounded-lg hover:bg-blue-900 transition duration-200" // Changed color
                  >
                    More Info
                  </button>
                  <Link to={`/orderinfo/${product._id}`}>
                    <button className="bg-green-400 text-white px-4 h-11 py-2 rounded-lg hover:bg-green-500 transition duration-200">
                      Order
                    </button>
                  </Link>
                  {/* Add to Cart button with SVG */}
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-transparent p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6445/6445100.png"
                      alt="Add to Cart"
                      className="h-9 w-9"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">
                Product: {selectedProduct.productName}
              </h2>
              <p className="mb-2">
                <strong>Distributor Name:</strong>{" "}
                {selectedProduct.distributorName}
              </p>
              <p className="mb-2">
                <strong>Distributor Email:</strong>{" "}
                {selectedProduct.distributorEmail}
              </p>
              <p className="mb-2">
                <strong>Description:</strong> {selectedProduct.description}
              </p>
              <p className="mb-2">
                <strong>Quantity:</strong> {selectedProduct.quantity}
              </p>
              <p className="mb-2">
                <strong>Price:</strong> ${selectedProduct.price.toFixed(2)}
              </p>
              <p className="mb-4">
                <strong>Registered On:</strong>{" "}
                {new Date(selectedProduct.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListAll;
