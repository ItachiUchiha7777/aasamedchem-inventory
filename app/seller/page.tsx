// app/seller/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Package, ShoppingCart, TrendingUp, Clock, CheckCircle, XCircle, 
  Search, Filter, Plus, Eye, Download, Bell, User, LogOut,
  Menu, ChevronRight, DollarSign, Percent, Truck, Star, 
  Settings, HelpCircle, Home, List, Layers, CreditCard
} from "lucide-react";
import Link from "next/link";

export default function SellerDashboard() {
  const [userName, setUserName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for seller
  const stats = {
    totalOrders: 47,
    pendingOrders: 8,
    completedOrders: 35,
    totalSpent: 284500,
    activeQuotations: 4,
    savedAmount: 12500,
  };

  const recentOrders = [
    { id: "ORD-001", date: "2024-03-15", items: 3, total: 12500, status: "delivered" },
    { id: "ORD-002", date: "2024-03-14", items: 2, total: 8750, status: "processing" },
    { id: "ORD-003", date: "2024-03-14", items: 5, total: 23400, status: "pending" },
    { id: "ORD-004", date: "2024-03-13", items: 1, total: 5620, status: "shipped" },
  ];

  const activeQuotations = [
    { id: "QT-001", date: "2024-03-10", items: 4, total: 18750, validUntil: "2024-03-25" },
    { id: "QT-002", date: "2024-03-12", items: 2, total: 9300, validUntil: "2024-03-27" },
  ];

  const recommendedProducts = [
    { name: "Organic Turmeric Powder", price: 450, unit: "kg", rating: 4.8, orders: 234 },
    { name: "Cold Pressed Coconut Oil", price: 1250, unit: "L", rating: 4.9, orders: 189 },
    { name: "Premium Basmati Rice", price: 180, unit: "kg", rating: 4.7, orders: 156 },
  ];

  useEffect(() => {
    const name = localStorage.getItem("name") || "Seller";
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      case "processing": return <Clock className="w-4 h-4" />;
      case "shipped": return <Truck className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? "w-72" : "w-20"} bg-gradient-to-b from-indigo-800 to-purple-800 text-white transition-all duration-300 shadow-2xl flex flex-col`}>
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${!isSidebarOpen && "justify-center w-full"}`}>
              <Package className="w-8 h-8" />
              {isSidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold">AasaMedChem</h1>
                  <p className="text-xs text-indigo-200">Seller Portal</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 hover:bg-white/20 rounded-lg transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 py-6">
          {[
            { id: "dashboard", label: "Dashboard", icon: Home },
            { id: "orders", label: "My Orders", icon: ShoppingCart },
            { id: "quotations", label: "Quotations", icon: FileText },
            { id: "products", label: "Browse Products", icon: Package },
            { id: "tracking", label: "Order Tracking", icon: Truck },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 transition-all ${
                activeTab === item.id
                  ? "bg-white/20 border-r-4 border-white"
                  : "hover:bg-white/10"
              } ${!isSidebarOpen && "justify-center px-0"}`}
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/20">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 text-white/80 hover:text-white transition ${
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
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, orders..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-700">{userName}</p>
                  <p className="text-xs text-gray-500">Seller Account</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold text-purple-600">₹{stats.totalSpent.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Quotes</p>
                  <p className="text-2xl font-bold text-indigo-600">{stats.activeQuotations}</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  View All →
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.items} items</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.total.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-indigo-600 hover:text-indigo-800 text-sm">Track</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Quotations */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Active Quotations</h2>
              </div>
              <div className="p-6 space-y-4">
                {activeQuotations.map((quote) => (
                  <div key={quote.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-800">{quote.id}</p>
                        <p className="text-xs text-gray-500">Created: {quote.date}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Valid</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">{quote.items} items</p>
                        <p className="text-xs text-gray-500">Valid until: {quote.validUntil}</p>
                      </div>
                      <p className="text-lg font-bold text-indigo-600">₹{quote.total.toLocaleString()}</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 transition">
                        Convert to Order
                      </button>
                      <button className="flex-1 border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-50 transition">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-indigo-600 hover:border-indigo-400 transition">
                  + Request New Quotation
                </button>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Recommended for You</h2>
              </div>
              <div className="p-6 space-y-4">
                {recommendedProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:shadow-md transition">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{product.orders} orders</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo-600">₹{product.price}</p>
                      <p className="text-xs text-gray-500">per {product.unit}</p>
                    </div>
                    <button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
                      Order
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Add missing FileText icon import
function FileText(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}