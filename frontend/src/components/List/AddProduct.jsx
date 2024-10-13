import React, { useState } from "react";

const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userdata")) || {};
  const distributorName = userData.name || "";
  const distributorEmail = userData.email || "";

  const productTypes = [
    "Beauty",
    "Electronics",
    "Fashion",
    "Home Goods",
    "Health and Wellness",
    "Food and Beverage",
    "Sports and Outdoor Equipment",
    "Automotive",
    "Toys and Games",
    "Furniture",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const productData = {
      imageUrl,
      productType,
      productName,
      description,
      distributorName,
      distributorEmail,
      quantity,
      price,
    };

    try {
      const response = await fetch("http://localhost:8000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setImageUrl("");
        setProductType("");
        setProductName("");
        setDescription("");
        setQuantity(0);
        setPrice(0);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while adding the product.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/61/1b/a3/611ba37913b7908524eceda306c65d68.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-80 dark:bg-gray-900 p-5 rounded-lg shadow-lg w-full max-w-lg transition duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Add Your Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Image URL:
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              placeholder="Enter image URL"
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:outline-none transition duration-200 shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Product Type:
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:outline-none transition duration-200 shadow-sm hover:shadow-md"
            >
              <option value="">Select product type</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Product Name:
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              placeholder="Enter product name"
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:outline-none transition duration-200 shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter product description"
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:outline-none transition duration-200 shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Distributor Name:
            </label>
            <input
              type="text"
              value={distributorName}
              readOnly
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Distributor Email:
            </label>
            <input
              type="email"
              value={distributorEmail}
              readOnly
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Quantity:
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              min="0"
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:outline-none transition duration-200 shadow-sm hover:shadow-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Price:
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:outline-none transition duration-200 shadow-sm hover:shadow-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 rounded-lg shadow-lg hover:from-green-700 hover:to-green-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600"
          >
            Add Product
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-500 font-semibold">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-center text-green-500 font-semibold">
            {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
