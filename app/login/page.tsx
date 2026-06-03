// app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Invalid credentials");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("userId", data.userId);

      if (data.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/seller";
      }
    } catch (error) {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  }

  const fillDemoSeller = () => {
    setEmail("seller@aasamedchem.com");
    setPassword("Seller123!");
    setError("");
  };

  const fillDemoAdmin = () => {
    setEmail("admin@aasamedchem.com");
    setPassword("Admin123!");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full opacity-5"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white rounded-full opacity-10 animate-ping"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand Section */}
        <div className="text-center mb-8 transform transition-all hover:scale-105 duration-300">
          <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 shadow-xl">
            <Package className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">AasaMedChem</h1>
          <p className="text-indigo-100 text-lg">Inventory & Order Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:shadow-3xl">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600 mt-1">Please sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm animate-shake">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500 mb-3 flex items-center justify-center gap-2">
                <Shield className="w-3 h-3" />
                Demo Credentials for Testing
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={fillDemoAdmin}
                  className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-all hover:scale-105"
                >
                  🛡️ Admin Demo
                </button>
                <button
                  onClick={fillDemoSeller}
                  className="px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-all hover:scale-105"
                >
                  🛒 Seller Demo
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}