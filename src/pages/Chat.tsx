import React, { useState } from 'react';
import { Brain, Plus, MessageSquare, Settings, LogOut, ChevronRight, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'General Knowledge Agent',
      description: 'Answers general questions about company policies and procedures',
      icon: <Brain className="h-6 w-6" />,
    },
    {
      id: '2',
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

    setMessages([...messages, newMessage]);
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
      <div className="w-80 bg-white border-r flex flex-col">
        {/* Top section with logo and add button */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-hrone-600" />
            <span className="font-semibold text-gray-900">AssistOne</span>
          </div>
          <button 
            onClick={() => navigate('/add-agent')}
            className="p-2 hover:bg-gray-100 rounded-full" 
            title="Add new agent"
          >
            <Plus className="h-5 w-5 text-hrone-600" />
          </button>
        </div>

        {/* Agents Section */}
        <div className="p-4 border-b">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">AI Agents</h2>
          <div className="space-y-2">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
                  selectedAgent === agent.id ? 'bg-hrone-50 text-hrone-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`${selectedAgent === agent.id ? 'text-hrone-600' : 'text-gray-400'}`}>
                  {agent.icon}
                </div>
                <div>
                  <div className="font-medium text-sm">{agent.name}</div>
                  <div className="text-xs text-gray-500">{agent.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Section */}
        <div className="p-4 flex-1 overflow-y-auto">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Chat History</h2>
          <div className="space-y-2">
            {['Previous Chat 1', 'Previous Chat 2', 'Previous Chat 3'].map((chat, index) => (
              <button
                key={index}
                className="w-full text-left p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-50"
              >
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{chat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="p-4 border-t">
          <nav className="space-y-2">
            <Link
              to="/settings"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign out</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center space-x-3">
            {agents.find(a => a.id === selectedAgent)?.icon}
            <div>
              <h2 className="font-medium text-gray-900">
                {agents.find(a => a.id === selectedAgent)?.name}
              </h2>
              <p className="text-sm text-gray-500">
                {agents.find(a => a.id === selectedAgent)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-hrone-600 text-white'
                    : 'bg-white text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
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