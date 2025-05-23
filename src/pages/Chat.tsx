import React, { useState, useRef, useEffect } from 'react';
import {
  Brain, Plus, MessageSquare, Settings, LogOut, ChevronRight,
  Users, User, LineChart
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LineChartComponent from "../pages/charts/LineChartComponent";
import BarChartComponent from "../pages/charts/BarChartComponent";
import ComposedChartComponent from "../pages/charts/ComposedChartComponent";
import RadarChartComponent from "../pages/charts/RadarChartComponent";
import AreaChartComponent from "../pages/charts/AreaChartComponent";
import PieChartComponent from './charts/PieChartComponent';

type ChatMessage = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type Agent = {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
};

const chartData = [
  { month: 'Jan', sales: 5000, revenue: 2400, profit: 1600 },
  { month: 'Feb', sales: 10000, revenue: 1398, profit: 1602 },
  { month: 'Mar', sales: 2000, revenue: 9800, profit: -7800 },
  { month: 'Apr', sales: 2780, revenue: 3908, profit: -1128 },
  { month: 'May', sales: 1890, revenue: 4800, profit: -2910 },
  { month: 'Jun', sales: 2390, revenue: 3800, profit: -1410 },
];

export default function Chat() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie' | 'composed' | 'radar' | 'area' | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  // Updated chat history data
  const chatHistory = [
    { id: 1, title: 'Analytics Discussion', date: '2024-03-20', preview: 'Last discussion about monthly metrics' },
    { id: 2, title: 'HR Policy Questions', date: '2024-03-19', preview: 'Leave policy clarifications' },
    { id: 3, title: 'Performance Review', date: '2024-03-18', preview: 'Q1 performance metrics' },
    { id: 4, title: 'Team Updates', date: '2024-03-17', preview: 'Weekly team sync discussion' },
    { id: 5, title: 'Project Planning', date: '2024-03-16', preview: 'Sprint planning conversation' },
    { id: 6, title: 'Training Session', date: '2024-03-15', preview: 'New tool training discussion' },
  ];

  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Analytics Agent',
      description: 'Provides insights and answers related to analytics, metrics, and data trends',
      icon: <LineChart className="h-6 w-6" />,
    },
    {
      id: '2',
      name: 'General Knowledge Agent',
      description: 'Answers general questions about company policies and procedures',
      icon: <Brain className="h-6 w-6" />,
    },
    {
      id: '3',
      name: 'HR Assistant',
      description: 'Handles HR-related queries and documentation',
      icon: <Users className="h-6 w-6" />,
    },
  ]);

  const [selectedAgent, setSelectedAgent] = useState<string>(agents[0].id);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    // Check for chart commands
    const lower = inputMessage.toLowerCase();
    if (lower.includes("plot line chart")) setChartType("line");
    else if (lower.includes("plot bar chart")) setChartType("bar");
    else if (lower.includes("plot pie chart")) setChartType("pie");
     else if (lower.includes("plot composed chart")) setChartType("composed");
      else if (lower.includes("plot radar chart")) setChartType("radar");
      else if (lower.includes("plot area chart")) setChartType("area");
    else setChartType(null); // No chart keyword found

    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm processing your request. How can I help you further?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-[320px] bg-white border-r flex flex-col">
        {/* Top section with logo */}
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-7 w-7 text-hrone-600" />
            <span className="font-semibold text-gray-900">AssistOne</span>
          </div>
          <button 
            onClick={() => navigate('/add-agent')}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors" 
            title="Add new agent"
          >
            <Plus className="h-5 w-5 text-hrone-600" />
          </button>
        </div>

        {/* Agents Section - Compact Layout */}
        <div className="px-3 py-2 border-b">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1 mb-2">AI Agents</h2>
          <div className="space-y-1">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`w-full text-left p-2 rounded-md flex items-center space-x-2.5 transition-all duration-200 ${
                  selectedAgent === agent.id 
                    ? 'bg-hrone-50 text-hrone-600 shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className={`${selectedAgent === agent.id ? 'text-hrone-600' : 'text-gray-400'}`}>
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{agent.name}</div>
                  <div className="text-xs text-gray-500 truncate leading-tight">{agent.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Chat History Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 bg-gray-50 px-3 py-2 border-b z-10">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">Chat History</h2>
          </div>
          <div className="p-2 pb-1">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left p-2.5 rounded-md flex items-start space-x-3 hover:bg-gray-50 transition-colors duration-200 mb-1 group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800 truncate">{chat.title}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{chat.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5 leading-relaxed">{chat.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header with Profile */}
        <div className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-xl bg-hrone-50">
              {agents.find(a => a.id === selectedAgent)?.icon}
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {agents.find(a => a.id === selectedAgent)?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {agents.find(a => a.id === selectedAgent)?.description}
                </p>
              </div>
            </div>

            {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <User className="h-5 w-5 text-gray-600" />
            </button>

              {/* Profile Dropdown */}
            {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">Shailendra Malviya</div>
                        <div className="text-xs text-gray-500 truncate">shailendramalviya159@gmail.com</div>
                      </div>
                    </div>
                  </div>

                <div className="py-1">
                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>

                    <button
                      onClick={() => navigate('/login')}
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full"
                    >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg rounded-lg p-4 ${msg.sender === 'user' ? 'bg-hrone-600 text-white' : 'bg-white text-gray-900'}`}>
                {msg.content}
              </div>
            </div>
          ))}

          {selectedAgent === '1' && chartType === 'line' && (
            <div className="bg-white p-6 rounded-xl shadow-md border max-w-3xl mx-auto w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Line Chart - Monthly Data</h3>
              <LineChartComponent data={chartData} />
            </div>
          )}
          {selectedAgent === '1' && chartType === 'bar' && (
            <div className="bg-white p-6 rounded-xl shadow-md border max-w-3xl mx-auto w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Bar Chart - Monthly Data</h3>
              <BarChartComponent data={chartData} />
            </div>
          )}
          {selectedAgent === '1' && chartType === 'pie' && (
            <div className="bg-white p-6 rounded-xl shadow-md border max-w-3xl mx-auto w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pie Chart - Monthly Data</h3>
              <ComposedChartComponent data={chartData} />
            </div>
          )}
          {selectedAgent === '1' && chartType === 'composed' && (
            <div className="bg-white p-6 rounded-xl shadow-md border max-w-3xl mx-auto w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Composed Chart - Monthly Data</h3>
              <PieChartComponent data={chartData} />
            </div>
          )}
          {selectedAgent === '1' && chartType === 'radar' && (
            <div className="bg-white p-6 rounded-xl shadow-md border max-w-3xl mx-auto w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Radar Chart - Monthly Data</h3>
              <LineChartComponent data={chartData} />
            </div>
          )}
            {selectedAgent === '1' && chartType === 'area' && (
            <div className="bg-white p-6 rounded-xl shadow-md border max-w-3xl mx-auto w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Area Chart - Monthly Data</h3>
              <AreaChartComponent data={chartData} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hrone-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-hrone-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-hrone-700"
            >
              <span>Send</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}