import React, { useState } from 'react';
import { Brain, MessageSquare, Shield, Building2, Zap, ChevronRight, Users, Database, Lock, Check, Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header/Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center flex-col text-left">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-hrone-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">AssistOne</span>
              </div>
              <span className="text-xs text-gray-500">By HROne</span>
            </div>

            {/* Navigation Links - Now with flex-1 and justify-end */}
            <div className="flex-1 flex justify-end items-center">
              <div className="hidden md:flex space-x-8 mr-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/login" className="px-4 py-2 text-hrone-600 hover:text-hrone-700 transition-colors">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-hrone-600 text-white rounded-lg hover:bg-hrone-700 transition-all transform hover:scale-105">
                  Try for Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                Empower Your Workforce with
                <span className="block text-hrone-600 mt-2">AI-Powered Knowledge & Support</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                One platform to centralize your company knowledge, create AI agents, and enable seamless employee interactions.
              </p>
              <div className="mt-6 flex items-center space-x-4 text-lg text-gray-600">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Free Plan Available
                </span>
                <span className="flex items-center">
                  <span className="text-2xl mx-2">•</span>
                  <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                  Get Started in Minutes
                </span>
              </div>
              <div className="mt-8">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-hrone-600 hover:bg-hrone-700"
                >
                  Try for Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-hrone-100 rounded-full flex items-center justify-center">
                      <Brain className="h-6 w-6 text-hrone-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">HR Assistant</h3>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-gray-800">How do I apply for leave?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-hrone-600 text-white rounded-lg p-3 max-w-xs">
                        <p>You can apply for leave through the HR portal. Let me guide you through the process...</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-gray-800">What's my leave balance?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-hrone-100 rounded-full z-0"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-hrone-50 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Key Features</h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-hrone-600 mb-4">
                <Database className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Centralized Knowledge Base</h3>
              <p className="text-gray-600">
                Store and organize all your company policies, FAQs, SOPs, and HR documents in one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-hrone-600 mb-4">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Agents</h3>
              <p className="text-gray-600">
                Create intelligent agents to answer employee queries, automate tasks, and assist HR in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-hrone-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Employee Directory & Access Control</h3>
              <p className="text-gray-600">
                Manage all employees in one platform and define agent access levels as per their role.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-hrone-600 mb-4">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Employee Chat</h3>
              <p className="text-gray-600">
                Employees can chat with AI agents for HR, IT, Admin, Finance, or any department-specific queries.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-hrone-600 mb-4">
                <Lock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrations & API Support</h3>
              <p className="text-gray-600">
                Seamlessly integrate with your existing HRMS, CRM, and productivity tools.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-hrone-600 mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Insights</h3>
              <p className="text-gray-600">
                Track agent performance, identify common employee queries, and optimize responses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Who is this for */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Who is this for?</h2>
            <p className="mt-4 text-xl text-gray-600">Tailored solutions for various teams and organizations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-hrone-50 rounded-lg">
                  <Users className="h-6 w-6 text-hrone-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">HR Teams & Admins</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Automate routine HR tasks</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Quick policy lookups</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Employee onboarding</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-hrone-50 rounded-lg">
                  <Shield className="h-6 w-6 text-hrone-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">IT Support Teams</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>24/7 tech support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>System troubleshooting</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Access management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-hrone-50 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-hrone-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Customer Service</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Quick query resolution</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Knowledge sharing</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Customer satisfaction</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-hrone-50 rounded-lg">
                  <Building2 className="h-6 w-6 text-hrone-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Growing Companies</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Scale operations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Reduce overhead</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Improve efficiency</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Simple, Transparent Pricing</h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Free Plan</h3>
                <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">Get Started</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Access to Knowledge Base</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Create 1 AI Agent</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>100K Credits per Year</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Up to 10 Employees</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/signup"
                  className="block w-full text-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-hrone-600 hover:bg-hrone-700"
                >
                  Get Started for Free
                </Link>
              </div>
            </div>

            {/* Paid Plan */}
            <div className="bg-white rounded-lg border-2 border-hrone-600 p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Paid Plan</h3>
                <span className="px-3 py-1 text-sm text-hrone-700 bg-hrone-100 rounded-full">Most Popular</span>
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">$50</span>
                <span className="text-gray-500">/year</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>1M AI Credits per Year</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Unlimited Agents</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Unlimited Employees</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>API Access & Advanced Features</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/signup"
                  className="block w-full text-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-hrone-600 hover:bg-hrone-700"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="relative bg-gradient-to-br from-hrone-600 to-hrone-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-hrone-200 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Workplace?</h2>
            <p className="text-xl text-hrone-100">Get in touch with our team and start your AI journey today</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-transform">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Email Us</h3>
                    <a href="mailto:support@hrone.com" className="text-hrone-100 hover:text-white transition-colors">
                      support@hrone.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-transform">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Call Us</h3>
                    <a href="tel:+91XXXXXXXXXX" className="text-hrone-100 hover:text-white transition-colors">
                      +91 XXXXXXXXXX
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-transform">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Visit Us</h3>
                    <p className="text-hrone-100">
                      123 Tech Park, Bangalore
                      <br />
                      Karnataka, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-hrone-500 focus:border-transparent transition-shadow"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Work Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-hrone-500 focus:border-transparent transition-shadow"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-hrone-500 focus:border-transparent transition-shadow"
                      placeholder="Tell us about your needs..."
                    ></textarea>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-hrone-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-hrone-700 transform hover:scale-105 transition-all flex items-center justify-center group"
                    >
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <Link
                      to="/signup"
                      className="flex-1 border-2 border-hrone-600 text-hrone-600 px-8 py-4 rounded-xl font-medium hover:bg-hrone-50 transform hover:scale-105 transition-all flex items-center justify-center"
                    >
                      Try for Free
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}