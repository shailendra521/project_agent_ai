import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Brain, ChevronLeft, Save } from 'lucide-react';

type Agent = {
  id: string;
  name: string;
  description: string;
  model: string;
  adminUser: string;
  status: 'active' | 'disabled';
};

export default function EditAgent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Agent>({
    id: '',
    name: '',
    description: '',
    model: '',
    adminUser: '',
    status: 'active'
  });

  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model, best for complex tasks' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most tasks' },
    { id: 'claude-2', name: 'Claude 2', description: 'Specialized in analysis and reasoning' },
    { id: 'llama-2', name: 'Llama 2', description: 'Open source model with broad capabilities' }
  ];

  const availableUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
  ];

  useEffect(() => {
    // Simulated API call to fetch agent data
    const mockAgent = {
      id: id,
      name: 'HR Assistant',
      description: 'Handles HR-related queries and documentation',
      model: 'gpt-4',
      adminUser: '1',
      status: 'active' as const
    };
    setFormData(mockAgent);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated agent:', formData);
    navigate('/settings/agents');
  };

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
              <h2 className="text-lg font-medium text-gray-900">Edit Agent</h2>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Agent Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-hrone-500 focus:ring-hrone-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-hrone-500 focus:ring-hrone-500"
            />
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              AI Model
            </label>
            <select
              id="model"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-hrone-500 focus:ring-hrone-500"
            >
              {aiModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} - {model.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="adminUser" className="block text-sm font-medium text-gray-700">
              Admin User
            </label>
            <select
              id="adminUser"
              value={formData.adminUser}
              onChange={(e) => setFormData({ ...formData, adminUser: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-hrone-500 focus:ring-hrone-500"
            >
              {availableUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'disabled' })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-hrone-500 focus:ring-hrone-500"
            >
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/settings/agents')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-hrone-600 text-white rounded-lg hover:bg-hrone-700 flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}