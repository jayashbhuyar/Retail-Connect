import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders.");
      }
    };

    fetchUsers();
    fetchOrders();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded">
            <a href="#users">Users</a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <a href="#orders">Orders</a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <a href="#settings">Settings</a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
        {error && <p className="text-red-500">{error}</p>}

        {/* Users Section */}
        <div id="users" className="mb-8 bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          {users.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Role</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">{user.role}</td>
                    <td className="py-2 px-4 border">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found.</p>
          )}
        </div>

        {/* Orders Section */}
        <div id="orders" className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Orders</h2>
          {orders.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Order ID</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Distributor Email</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{order._id}</td>
                    <td className="py-2 px-4 border">{order.status}</td>
                    <td className="py-2 px-4 border">{order.distributorEmail}</td>
                    <td className="py-2 px-4 border">
                      <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">View</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;