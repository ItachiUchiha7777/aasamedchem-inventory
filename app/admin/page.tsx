// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Package, ShoppingCart, Users, TrendingUp, DollarSign, 
  Clock, CheckCircle, AlertCircle, Menu, Bell, User,
  LogOut, Plus, Search, Filter, Edit, Trash2, Eye,
  Home, Layers, ClipboardList, Settings, HelpCircle,
  Star, Truck, BarChart3, Download, RefreshCw
} from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  dimensionType: string;
  baseUnit: string;
  availableQuantity: number;
  pricePerBaseUnit: number;
  status: boolean;
  createdAt: string;
}

interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adminName, setAdminName] = useState("");

  // Fetch data from API
  useEffect(() => {
    fetchData();
    const name = localStorage.getItem("name") || "Admin";
    setAdminName(name);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
        fetch("/api/users")
      ]);
      
      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();
      const usersData = await usersRes.json();
      
      if (productsData.success) setProducts(productsData.data);
      if (ordersData.success) setOrders(ordersData.data);
      if (usersData.success) setUsers(usersData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      alert("Error deleting product");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    pendingOrders: orders.filter(o => o.status === "PENDING").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    lowStockItems: products.filter(p => p.availableQuantity < 100).length,
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "DELIVERED": return "bg-green-100 text-green-800";
      case "PROCESSING": return "bg-blue-100 text-blue-800";
      case "SHIPPED": return "bg-purple-100 text-purple-800";
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? "w-72" : "w-20"} bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 shadow-2xl flex flex-col`}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${!isSidebarOpen && "justify-center w-full"}`}>
              <Package className="w-8 h-8 text-indigo-400" />
              {isSidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold">AasaMedChem</h1>
                  <p className="text-xs text-gray-400">Admin Portal</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 hover:bg-gray-700 rounded-lg transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 py-6">
          {[
            { id: "dashboard", label: "Dashboard", icon: Home },
            { id: "products", label: "Products", icon: Package },
            { id: "orders", label: "Orders", icon: ShoppingCart },
            { id: "users", label: "Users", icon: Users },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 transition-all ${
                activeTab === item.id
                  ? "bg-indigo-600 border-r-4 border-indigo-400"
                  : "hover:bg-gray-700"
              } ${!isSidebarOpen && "justify-center px-0"}`}
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 text-gray-400 hover:text-white transition ${
              !isSidebarOpen && "justify-center"
            }`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button onClick={fetchData} className="p-2 hover:bg-gray-100 rounded-full">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-700">{adminName}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === "dashboard" && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Products</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <Package className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Pending Orders</p>
                      <p className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-600">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm mb-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id.slice(0, 8)}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{order.user?.name || "N/A"}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.totalAmount.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "products" && (
            <ProductsManagement 
              products={products}
              onRefresh={fetchData}
              onDelete={handleDeleteProduct}
            />
          )}

          {activeTab === "orders" && (
            <OrdersManagement orders={orders} getStatusColor={getStatusColor} />
          )}

          {activeTab === "users" && (
            <UsersManagement users={users} onRefresh={fetchData} />
          )}

          {activeTab === "analytics" && (
            <AnalyticsDashboard orders={orders} products={products} users={users} />
          )}
        </div>
      </main>
    </div>
  );
}

// Products Management Component
function ProductsManagement({ products, onRefresh, onDelete }: any) {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product: any) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{product.sku}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.dimensionType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.baseUnit}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{Number(product.availableQuantity).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{Number(product.pricePerBaseUnit).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {product.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(product.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <ProductFormModal onClose={() => setShowForm(false)} onSuccess={onRefresh} />
      )}
    </div>
  );
}

// Orders Management Component
function OrdersManagement({ orders, getStatusColor }: any) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      alert("Failed to update order status");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order: any) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">#{order.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.user?.name || "N/A"}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Users Management Component
function UsersManagement({ users, onRefresh }: any) {
  const updateUserRole = async (userId: string, role: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await response.json();
      if (data.success) {
        onRefresh();
      }
    } catch (error) {
      alert("Failed to update user role");
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        onRefresh();
      }
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user: any) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="px-2 py-1 rounded-lg text-sm border border-gray-300"
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="SELLER">Seller</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-800 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Analytics Dashboard Component
function AnalyticsDashboard({ orders, products, users }: any) {
  const monthlyRevenue = orders.reduce((acc: any, order: any) => {
    const month = new Date(order.createdAt).toLocaleMonth();
    acc[month] = (acc[month] || 0) + order.totalAmount;
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Month</h3>
          <div className="space-y-3">
            {Object.entries(monthlyRevenue).map(([month, revenue]) => (
              <div key={month}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{month}</span>
                  <span>₹{(revenue as number).toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${(revenue as number) / Math.max(...Object.values(monthlyRevenue) as number[]) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Orders</span>
              <span className="font-bold text-xl">{orders.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Products</span>
              <span className="font-bold text-xl">{products.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Users</span>
              <span className="font-bold text-xl">{users.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Average Order Value</span>
              <span className="font-bold text-xl">₹{(orders.reduce((sum: number, o: any) => sum + o.totalAmount, 0) / orders.length || 0).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Form Modal
function ProductFormModal({ onClose, onSuccess, product }: any) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    dimensionType: "WEIGHT",
    baseUnit: "kg",
    availableQuantity: 0,
    pricePerBaseUnit: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        onSuccess();
        onClose();
      } else {
        alert("Failed to create product");
      }
    } catch (error) {
      alert("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dimension Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.dimensionType}
              onChange={(e) => setFormData({ ...formData, dimensionType: e.target.value })}
            >
              <option value="WEIGHT">Weight</option>
              <option value="VOLUME">Volume</option>
              <option value="COUNT">Count</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Base Unit</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.baseUnit}
              onChange={(e) => setFormData({ ...formData, baseUnit: e.target.value })}
            >
              <option value="g">Gram (g)</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="mL">Milliliter (mL)</option>
              <option value="L">Liter (L)</option>
              <option value="unit">Unit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Quantity</label>
            <input
              type="number"
              step="0.001"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.availableQuantity}
              onChange={(e) => setFormData({ ...formData, availableQuantity: parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Base Unit (₹)</label>
            <input
              type="number"
              step="0.01"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={formData.pricePerBaseUnit}
              onChange={(e) => setFormData({ ...formData, pricePerBaseUnit: parseFloat(e.target.value) })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}