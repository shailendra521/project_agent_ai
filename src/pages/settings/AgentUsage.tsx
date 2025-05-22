import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Brain, ChevronLeft, MessageSquare, Clock, Zap, BarChart3 } from 'lucide-react';

type UsageData = {
  date: string;
  conversations: number;
  tokens: number;
  responseTime: number;
};

export default function AgentUsage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agentName, setAgentName] = useState('HR Assistant');
  const [timeRange, setTimeRange] = useState('7d');

  const [usageStats] = useState({
    totalConversations: 1234,
    totalTokens: 45678,
    avgResponseTime: 1.5,
    successRate: 98.5
  });

  const [usageData] = useState<UsageData[]>([
    { date: '2024-03-15', conversations: 180, tokens: 6500, responseTime: 1.4 },
    { date: '2024-03-14', conversations: 165, tokens: 6200, responseTime: 1.6 },
    { date: '2024-03-13', conversations: 190, tokens: 7000, responseTime: 1.3 },
    { date: '2024-03-12', conversations: 175, tokens: 6300, responseTime: 1.5 },
    { date: '2024-03-11', conversations: 185, tokens: 6800, responseTime: 1.4 },
    { date: '2024-03-10', conversations: 160, tokens: 5900, responseTime: 1.7 },
    { date: '2024-03-09', conversations: 179, tokens: 6400, responseTime: 1.5 }
  ]);

  useEffect(() => {
    // Simulated API call to fetch agent name
    setAgentName('HR Assistant');
  }, [id]);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/settings/agents')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <Brain className="h-6 w-6 text-hrone-600" />
              <div>
                <h2 className="text-lg font-medium text-gray-900">Usage Statistics</h2>
                <p className="text-sm text-gray-500">{agentName}</p>
              </div>
            </div>
          </div>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-hrone-500 focus:border-hrone-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-hrone-600 mr-2" />
                <span className="text-sm font-medium text-gray-500">Total Conversations</span>
              </div>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{usageStats.totalConversations}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-hrone-600 mr-2" />
                <span className="text-sm font-medium text-gray-500">Total Tokens</span>
              </div>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{usageStats.totalTokens}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-hrone-600 mr-2" />
                <span className="text-sm font-medium text-gray-500">Avg Response Time</span>
              </div>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{usageStats.avgResponseTime}s</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-hrone-600 mr-2" />
                <span className="text-sm font-medium text-gray-500">Success Rate</span>
              </div>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{usageStats.successRate}%</p>
          </div>
        </div>

        {/* Usage History Table */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Usage History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversations
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tokens Used
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Response Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usageData.map((day) => (
                  <tr key={day.date}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(day.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {day.conversations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {day.tokens}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {day.responseTime}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}