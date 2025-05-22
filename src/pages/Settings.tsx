import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Brain, User, Users, ChevronLeft, CreditCard, Bot } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/chat')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-hrone-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Settings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <nav className="w-64 bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-1">
              <NavLink
                to="/settings/profile"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-hrone-50 text-hrone-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </NavLink>
              <NavLink
                to="/settings/agents"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-hrone-50 text-hrone-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Bot className="mr-3 h-5 w-5" />
                AI Agents
              </NavLink>
              <NavLink
                to="/settings/users"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-hrone-50 text-hrone-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Users className="mr-3 h-5 w-5" />
                Users
              </NavLink>
              <NavLink
                to="/settings/billing"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-hrone-50 text-hrone-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <CreditCard className="mr-3 h-5 w-5" />
                Billing & Subscription
              </NavLink>
            </div>
          </nav>

          {/* Main Content Area */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}