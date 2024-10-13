import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const distributorEmail =
    JSON.parse(localStorage.getItem("userdata"))?.email || ""; // Get distributor email from local storage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products?distributorEmail=${distributorEmail}`
        );
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
  }, [distributorEmail]);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId)); // Remove deleted product from state
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while deleting the product.");
    }
  };

  const handleEdit = (productId) => {
    // Redirect to edit product page (you can implement this based on your routing setup)
    console.log(`Edit product with ID: ${productId}`);
  };

  return (
    <div className="bg-gray-900 h-screen p-4">
      <h2 className="text-3xl font-bold mb-4 text-indigo-400">Product List</h2>
      {error && <p className="text-red-400">{error}</p>}
      <div className="container mx-auto p-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 shadow-lg rounded-lg p-4 hover:scale-105 transition-transform transform"
            >
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="h-48 w-full object-cover rounded-t-lg mb-4"
                style={{ objectFit: 'cover' }} // Ensure the image fully covers the area
              />
              <div className="px-4">
                <h3 className="text-lg font-bold text-teal-400">
                  {product.productName}
                </h3>
                <p className="text-gray-300">Type: {product.productType}</p>
                <p className="text-gray-300">
                  Description: {product.description}
                </p>
                <p className="text-gray-300">Quantity: {product.quantity}</p>
                <p className="text-gray-300">
                  Price: ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="mt-auto flex space-x-2 p-4">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
