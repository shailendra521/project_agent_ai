import React, { useState } from 'react';
import {
  Brain,
  Upload,
  X,
  ChevronLeft,
  FileText,
  Activity,
  BarChart3,
  Plus,
  Trash2,
  ArrowRight,
  Zap,
  Filter,
  PlayCircle,
  SplitSquareVertical,
  CheckCircle2,
  XCircle,
  Settings2,
  Mail,
  MessageSquare,
  Bell,
  Calendar,
  Database,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type FileWithPreview = {
  file: File;
  name: string;
  size: string;
};

type AgentType = 'content' | 'workflow' | 'analysis';

type NodeType = 'trigger' | 'condition' | 'action' | 'branch';

interface WorkflowNode {
  id: string;
  type: NodeType;
  nodeType: string;
  label: string;
  config: Record<string, any>;
  branches?: {
    true?: string[];
    false?: string[];
  };
}

export default function AddAgent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '' as AgentType,
    model: '',
    adminUser: ''
  });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Mock users data
  const availableUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
  ];

  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model, best for complex tasks' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most tasks' },
    { id: 'claude-2', name: 'Claude 2', description: 'Specialized in analysis and reasoning' },
    { id: 'llama-2', name: 'Llama 2', description: 'Open source model with broad capabilities' }
  ];

  // Node type definitions with more specific categories
  const nodeTypes = {
    trigger: [
      { type: 'email_received', label: 'Email Received', icon: Mail },
      { type: 'form_submitted', label: 'Form Submitted', icon: FileText },
      { type: 'schedule', label: 'Schedule', icon: Calendar },
      { type: 'webhook', label: 'Webhook', icon: Zap },
      { type: 'chat_message', label: 'Chat Message', icon: MessageSquare },
    ],
    condition: [
      { type: 'data_check', label: 'Check Data', icon: Filter },
      { type: 'time_check', label: 'Time Condition', icon: Calendar },
      { type: 'user_role', label: 'User Role', icon: Brain },
      { type: 'data_compare', label: 'Compare Values', icon: Database },
    ],
    action: [
      { type: 'send_email', label: 'Send Email', icon: Mail },
      { type: 'send_notification', label: 'Send Notification', icon: Bell },
      { type: 'update_data', label: 'Update Data', icon: Database },
      { type: 'api_call', label: 'API Call', icon: Send },
      { type: 'generate_content', label: 'Generate Content', icon: FileText },
    ],
    branch: [
      { type: 'if_else', label: 'If/Else', icon: SplitSquareVertical },
    ],
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).map(file => ({
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const addWorkflowNode = (nodeCategory: NodeType, nodeType: string, label: string) => {
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type: nodeCategory,
      nodeType,
      label,
      config: {},
      branches: nodeCategory === 'condition' ? { true: [], false: [] } : undefined,
    };
    setWorkflowNodes([...workflowNodes, newNode]);
  };

  const removeWorkflowNode = (id: string) => {
    setWorkflowNodes(workflowNodes.filter(node => node.id !== id));
    // Also remove any branch references to this node
    setWorkflowNodes(nodes => nodes.map(node => ({
      ...node,
      branches: node.branches ? {
        true: node.branches.true?.filter(branchId => branchId !== id) || [],
        false: node.branches.false?.filter(branchId => branchId !== id) || [],
      } : undefined,
    })));
  };

  const updateNodeConfig = (nodeId: string, config: Record<string, any>) => {
    setWorkflowNodes(nodes =>
      nodes.map(node =>
        node.id === nodeId ? { ...node, config: { ...node.config, ...config } } : node
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { formData, selectedUsers, files, workflowNodes });
    navigate('/chat');
  };

  const getNodeIcon = (node: WorkflowNode) => {
    switch (node.type) {
      case 'trigger':
        return <Zap className="h-6 w-6" />;
      case 'condition':
        return <Filter className="h-6 w-6" />;
      case 'action':
        return <PlayCircle className="h-6 w-6" />;
      case 'branch':
        return <SplitSquareVertical className="h-6 w-6" />;
      default:
        return <Settings2 className="h-6 w-6" />;
    }
  };

  const renderNodeConfig = (node: WorkflowNode) => {
    switch (node.nodeType) {
      case 'send_email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">To</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={node.config.to || ''}
                onChange={(e) => updateNodeConfig(node.id, { ...node.config, to: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={node.config.subject || ''}
                onChange={(e) => updateNodeConfig(node.id, { ...node.config, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Template</label>
              <textarea
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={3}
                value={node.config.template || ''}
                onChange={(e) => updateNodeConfig(node.id, { ...node.config, template: e.target.value })}
              />
            </div>
          </div>
        );
      case 'data_check':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Field</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={node.config.field || ''}
                onChange={(e) => updateNodeConfig(node.id, { ...node.config, field: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Condition</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={node.config.condition || 'equals'}
                onChange={(e) => updateNodeConfig(node.id, { ...node.config, condition: e.target.value })}
              >
                <option value="equals">Equals</option>
                <option value="contains">Contains</option>
                <option value="greater_than">Greater Than</option>
                <option value="less_than">Less Than</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Value</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={node.config.value || ''}
                onChange={(e) => updateNodeConfig(node.id, { ...node.config, value: e.target.value })}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/chat')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Create New AI Agent</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/chat')}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-hrone-600 text-white rounded-lg hover:bg-hrone-700"
              >
                Create Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
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
                  placeholder="e.g., HR Assistant"
                  required
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
                  placeholder="Describe what this agent does..."
                  required
                />
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
                  required
                >
                  <option value="">Select an admin user</option>
                  {availableUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  This user will have full control over the agent's configuration and access
                </p>
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
                  required
                >
                  <option value="">Select an AI model</option>
                  {aiModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} - {model.description}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Capability
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'content', label: 'Content Generation', icon: FileText, description: 'Create and manage content automatically' },
                    { id: 'workflow', label: 'Workflow Automation', icon: Activity, description: 'Automate business processes and workflows' },
                    { id: 'analysis', label: 'Data Analysis', icon: BarChart3, description: 'Analyze data and generate insights' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.id as AgentType })}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        formData.type === type.id
                          ? 'border-hrone-600 bg-hrone-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`${
                        formData.type === type.id ? 'text-hrone-600' : 'text-gray-400'
                      }`}>
                        <type.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-2 font-medium text-gray-900">{type.label}</h3>
                      <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Base - Show only for Content Generation and Data Analysis */}
          {(formData.type === 'content' || formData.type === 'analysis') && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Knowledge Base</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Brain className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-hrone-600 hover:text-hrone-500">
                          Upload documents
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      PDF, Word documents up to 50MB each
                    </p>
                  </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Uploaded Files</h3>
                    <ul className="divide-y divide-gray-200">
                      {files.map((file) => (
                        <li key={file.name} className="py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <Upload className="h-5 w-5 text-gray-400" />
                            <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                            <span className="ml-4 flex-shrink-0 text-sm text-gray-500">{file.size}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(file.name)}
                            className="ml-4 flex-shrink-0 text-sm text-red-500 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Workflow Builder - Show only for Workflow type */}
          {formData.type === 'workflow' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Workflow Builder</h2>
              <div className="space-y-6">
                {/* Node Type Categories */}
                <div className="space-y-4">
                  {Object.entries(nodeTypes).map(([category, nodes]) => (
                    <div key={category}>
                      <h3 className="text-sm font-medium text-gray-700 mb-2 capitalize">{category}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {nodes.map((nodeType) => (
                          <button
                            key={nodeType.type}
                            type="button"
                            onClick={() => addWorkflowNode(category as NodeType, nodeType.type, nodeType.label)}
                            className="p-4 border border-gray-200 rounded-lg hover:border-hrone-500 hover:bg-hrone-50 transition-all flex flex-col items-center"
                          >
                            <nodeType.icon className="h-6 w-6 text-hrone-600" />
                            <span className="mt-2 text-sm font-medium text-gray-700">{nodeType.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Workflow Nodes */}
                <div className="space-y-4">
                  {workflowNodes.map((node, index) => (
                    <div key={node.id} className="space-y-4">
                      <div
                        className={`relative flex items-center bg-white border rounded-lg p-4 ${
                          selectedNode === node.id ? 'border-hrone-600 ring-1 ring-hrone-600' : ''
                        }`}
                      >
                        {/* Connector Line */}
                        {index < workflowNodes.length - 1 && node.type !== 'condition' && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full h-8 w-px bg-gray-300 flex items-center justify-center">
                            <ArrowRight className="h-4 w-4 text-gray-400 absolute top-1/2 -translate-y-1/2" />
                          </div>
                        )}

                        {/* Node Content */}
                        <div className="flex-1 flex items-center">
                          {getNodeIcon(node)}
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">{node.label}</h4>
                            <p className="text-sm text-gray-500">Type: {node.type}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                            className="p-2 text-gray-400 hover:text-hrone-600 rounded-full hover:bg-gray-100"
                          >
                            <Settings2 className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeWorkflowNode(node.id)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Node Configuration Panel */}
                      {selectedNode === node.id && (
                        <div className="ml-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          {renderNodeConfig(node)}
                        </div>
                      )}

                      {/* Conditional Branches */}
                      {node.type === 'condition' && (
                        <div className="ml-8 grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-green-600">
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              True Path
                            </div>
                            {/* True branch nodes would go here */}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-red-600">
                              <XCircle className="h-4 w-4 mr-1" />
                              False Path
                            </div>
                            {/* False branch nodes would go here */}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {workflowNodes.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500">Add workflow nodes to build your automation</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Access Control */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Access Control</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Select users who can access this agent</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {availableUsers.map((user) => (
                  <label
                    key={user.id}
                    className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-hrone-600 focus:ring-hrone-500 border-gray-300 rounded"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id]);
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                        }
                      }}
                    />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-900">{user.name}</span>
                      <span className="block text-sm text-gray-500">{user.email}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}