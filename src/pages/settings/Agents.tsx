import React, { useState } from 'react';
import { Brain, MoreVertical, Search, Plus, Activity, FileText, BarChart3, Pencil, Trash2, BarChart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type Agent = {
  id: string;
  name: string;
  description: string;
  type: 'content' | 'workflow' | 'analysis';
  model: string;
  adminUser: {
    name: string;
    email: string;
  };
  status: 'active' | 'disabled';
  lastActive: string;
};

export default function Agents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);

  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'HR Assistant',
      description: 'Handles HR-related queries and documentation',
      type: 'content',
      model: 'GPT-4',
      adminUser: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      status: 'active',
      lastActive: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Workflow Automator',
      description: 'Automates business processes and workflows',
      type: 'workflow',
      model: 'GPT-3.5 Turbo',
      adminUser: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      },
      status: 'active',
      lastActive: '2024-03-14T15:45:00Z'
    },
    {
      id: '3',
      name: 'Data Analyzer',
      description: 'Analyzes company data and generates insights',
      type: 'analysis',
      model: 'Claude 2',
      adminUser: {
        name: 'Mike Johnson',
        email: 'mike@example.com'
      },
      status: 'disabled',
      lastActive: '2024-03-10T09:20:00Z'
    }
  ]);

  const handleDelete = (agentId: string) => {
    console.log('Delete agent:', agentId);
    setShowDeleteConfirm(null);
  };

  const getAgentTypeIcon = (type: Agent['type']) => {
    switch (type) {
      case 'content':
        return <FileText className="h-5 w-5" />;
      case 'workflow':
        return <Activity className="h-5 w-5" />;
      case 'analysis':
        return <BarChart3 className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">AI Agents</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your AI agents and their configurations
            </p>
          </div>
          <Link
            to="/add-agent"
            className="px-4 py-2 bg-hrone-600 text-white rounded-lg hover:bg-hrone-700 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Agent
          </Link>
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-hrone-500 focus:ring-1 focus:ring-hrone-500"
            />
          </div>
        </div>

        {/* Agents List */}
        <div className="mt-6">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAgents.map((agent) => (
                  <tr key={agent.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-hrone-50 flex items-center justify-center">
                          <Brain className="h-6 w-6 text-hrone-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                          <div className="text-sm text-gray-500">{agent.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-hrone-600 mr-2">
                          {getAgentTypeIcon(agent.type)}
                        </div>
                        <span className="text-sm text-gray-900 capitalize">{agent.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agent.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{agent.adminUser.name}</div>
                        <div className="text-gray-500">{agent.adminUser.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        agent.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(agent.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button
                          onClick={() => setShowActions(showActions === agent.id ? null : agent.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>

                        {/* Actions Dropdown */}
                        {showActions === agent.id && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => navigate(`/settings/agents/${agent.id}/edit`)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <Pencil className="h-4 w-4 mr-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => navigate(`/settings/agents/${agent.id}/usage`)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <BarChart className="h-4 w-4 mr-3" />
                                Usage
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(agent.id)}
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                              >
                                <Trash2 className="h-4 w-4 mr-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Delete Confirmation Modal */}
                        {showDeleteConfirm === agent.id && (
                          <div className="fixed inset-0 z-50 overflow-y-auto">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                              </div>
                              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                  <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                      <Trash2 className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Delete Agent
                                      </h3>
                                      <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                          Are you sure you want to delete this agent? This action cannot be undone.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(agent.id)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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