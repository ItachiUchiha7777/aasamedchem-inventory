// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Package, ShoppingCart, TrendingUp, Users, Truck, Shield, 
  ArrowRight, CheckCircle, Star, Clock, BarChart3, 
  Warehouse, Calculator, Zap, Globe, Phone, Mail, 
  MapPin, ChevronRight, Play, Quote, Award, Heart
} from "lucide-react";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Warehouse,
      title: "Smart Inventory Management",
      description: "Track products in grams, kg, liters, mL, or units with automatic unit conversion",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Calculator,
      title: "Real-time Pricing",
      description: "Automatic price calculations with support for decimal precision and large values",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Instant Quotations",
      description: "Generate quotes instantly with multi-unit support and bulk ordering",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Track orders, revenue trends, and inventory levels with beautiful charts",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { label: "Active Products", value: "500+", icon: Package },
    { label: "Happy Customers", value: "2,000+", icon: Users },
    { label: "Orders Completed", value: "10,000+", icon: ShoppingCart },
    { label: "Units Available", value: "50+", icon: Truck }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Pharmacy Owner",
      content: "AasaMedChem has transformed our inventory management. The unit conversion feature is a game-changer!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Priya Sharma",
      role: "Hospital Procurement",
      content: "Excellent platform for managing medical supplies. The quotation system saves us hours every week.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Dr. Amit Patel",
      role: "Clinic Director",
      content: "Reliable, fast, and incredibly user-friendly. Best inventory system we've ever used.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ];

  const steps = [
    { number: "01", title: "Create Account", description: "Sign up as a seller or admin in minutes" },
    { number: "02", title: "Browse Products", description: "Search and filter from hundreds of products" },
    { number: "03", title: "Place Order", description: "Select quantity in any unit and get instant pricing" },
    { number: "04", title: "Track Delivery", description: "Monitor your orders in real-time" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AasaMedChem
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 transition">Testimonials</a>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/login">
                <button className="px-5 py-2 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-lg transition">
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition transform hover:scale-105">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600">Smart Inventory Solution</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Modern Inventory
                </span>
                <br />
                Management System
              </h1>
              
              <p className="text-xl text-gray-600">
                Streamline your medical and chemical inventory with our intelligent platform. 
                Support for multiple units, real-time pricing, and seamless order management.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Secure Platform</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Fast Delivery</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur-2xl opacity-30"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Dashboard Preview</h3>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Total Orders</span>
                      <span className="font-bold">1,247</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="w-3/4 bg-white rounded-full h-2"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Revenue</span>
                      <span className="font-bold">₹2.84L</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="w-2/3 bg-white rounded-full h-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-flex p-4 bg-indigo-50 rounded-2xl mb-4 group-hover:bg-indigo-100 transition">
                  <stat.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Powerful Features for
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Modern Business</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your inventory efficiently with precision and ease
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How <span className="text-indigo-600">AasaMedChem</span> Works
            </h2>
            <p className="text-xl text-gray-600">Get started in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-gray-300">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Conversion Showcase */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Smart Unit Conversion</h2>
              <p className="text-xl text-indigo-100 mb-6">
                Seamlessly work with multiple units - grams, kilograms, liters, milliliters, or pieces.
                Our system automatically converts and calculates pricing in real-time.
              </p>
              <div className="space-y-3">
                {["g ↔ kg", "mL ↔ L", "pieces to bulk"].map((conversion, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>{conversion}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>Order: 2 kg of Turmeric Powder</span>
                  <span className="font-bold">₹900</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>Order: 500 g of Turmeric Powder</span>
                  <span className="font-bold">₹225</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Base Price: ₹450/kg</span>
                  <span className="text-green-300">Automatic conversion ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Our <span className="text-indigo-600">Customers Say</span>
            </h2>
            <p className="text-xl text-gray-600">Trusted by businesses across India</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Inventory Management?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses that trust AasaMedChem for their inventory needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl transition transform hover:scale-105">
                Get Started Free
              </button>
            </Link>
            <Link href="/login">
              <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-8 h-8 text-indigo-400" />
                <span className="text-xl font-bold">AasaMedChem</span>
              </div>
              <p className="text-gray-400">
                Modern inventory and order management system for medical and chemical supplies.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
                <li><Link href="/login" className="hover:text-white transition">Login</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 12345 67890</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@aasamedchem.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, India</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
                />
                <button className="px-4 py-2 bg-indigo-600 rounded-r-lg hover:bg-indigo-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AasaMedChem. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}