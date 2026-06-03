// app/dashboard/page.tsx
import { Package, ShoppingCart, TrendingUp, Users, AlertCircle, CheckCircle, Clock, DollarSign, UserCircle } from 'lucide-react';

export default function Dashboard() {
  // Mock data for the dashboard - in a real app, this would come from your API/database
  const stats = {
    totalProducts: 184,
    totalOrders: 47,
    pendingOrders: 12,
    lowStockItems: 5,
    monthlyRevenue: 284500,
    activeUsers: 8,
    conversionRate: 94,
    averageOrderValue: 6053,
  };

  const recentOrders = [
    { id: 'ORD-001', customer: 'Rajesh Kumar', amount: 12500, status: 'delivered', date: '2024-03-15', items: 3 },
    { id: 'ORD-002', customer: 'Priya Sharma', amount: 8750, status: 'processing', date: '2024-03-14', items: 2 },
    { id: 'ORD-003', customer: 'Amit Patel', amount: 23400, status: 'pending', date: '2024-03-14', items: 5 },
    { id: 'ORD-004', customer: 'Neha Gupta', amount: 5620, status: 'shipped', date: '2024-03-13', items: 1 },
    { id: 'ORD-005', customer: 'Vikram Singh', amount: 18900, status: 'processing', date: '2024-03-13', items: 4 },
  ];

  const lowStockProducts = [
    { name: 'Organic Turmeric Powder', current: 250, unit: 'g', threshold: 500 },
    { name: 'Cold Pressed Coconut Oil', current: 2, unit: 'L', threshold: 5 },
    { name: 'Premium Basmati Rice', current: 15, unit: 'kg', threshold: 25 },
    { name: 'Raw Honey', current: 3, unit: 'L', threshold: 8 },
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'shipped': return <Package className="w-4 h-4 text-purple-500" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Package className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Inventory Dashboard</h1>
                <p className="mt-2 text-indigo-100">Welcome back, Admin! Here's what's happening with your store today.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ring-2 ring-white">
                <UserCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-indigo-200">admin@aasamedchem.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
                <p className="text-xs text-green-600 mt-2">↑ 12% this month</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl">
                <Package className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
                <p className="text-xs text-green-600 mt-2">↑ 8% this week</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingOrders}</p>
                <p className="text-xs text-red-600 mt-2">⚠️ Needs attention</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-3xl font-bold text-green-600 mt-2">₹{stats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-2">↑ 23% from last month</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Revenue Trend</h3>
              <select className="text-sm border rounded-lg px-3 py-1 bg-gray-50">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <div className="h-64 bg-gradient-to-b from-indigo-50 to-white rounded-xl p-4 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                <p className="text-gray-500">Interactive chart would render here</p>
                <p className="text-xs text-gray-400">Peak revenue: ₹45,200 on Mar 12, 2024</p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Top Selling Products</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">View All →</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Organic Turmeric Powder', sales: 234, revenue: 46800, growth: '+15%' },
                { name: 'Cold Pressed Coconut Oil', sales: 189, revenue: 47250, growth: '+22%' },
                { name: 'Premium Basmati Rice', sales: 156, revenue: 31200, growth: '+8%' },
                { name: 'Raw Honey (Organic)', sales: 142, revenue: 35500, growth: '+18%' },
              ].map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">₹{product.revenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders and Low Stock Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800">View All Orders →</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{order.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Low Stock Alert</h3>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-4">
              {lowStockProducts.map((product, idx) => {
                const percentage = (product.current / product.threshold) * 100;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{product.name}</span>
                      <span className="text-red-600 font-semibold">{product.current}{product.unit} left</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">Threshold: {product.threshold}{product.unit}</p>
                  </div>
                );
              })}
            </div>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition font-medium">
              Restock Now
            </button>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition text-center border border-gray-100 group">
            <div className="p-2 bg-indigo-50 rounded-lg inline-block mb-2 group-hover:bg-indigo-100 transition">
              <Package className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Add Product</p>
          </button>
          <button className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition text-center border border-gray-100 group">
            <div className="p-2 bg-green-50 rounded-lg inline-block mb-2 group-hover:bg-green-100 transition">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">New Order</p>
          </button>
          <button className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition text-center border border-gray-100 group">
            <div className="p-2 bg-purple-50 rounded-lg inline-block mb-2 group-hover:bg-purple-100 transition">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Manage Users</p>
          </button>
          <button className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition text-center border border-gray-100 group">
            <div className="p-2 bg-orange-50 rounded-lg inline-block mb-2 group-hover:bg-orange-100 transition">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
}