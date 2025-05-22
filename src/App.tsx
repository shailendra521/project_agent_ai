import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import AddAgent from './pages/AddAgent';
import Settings from './pages/Settings';
import UserProfile from './pages/settings/UserProfile';
import Users from './pages/settings/Users';
import Billing from './pages/settings/Billing';
import Agents from './pages/settings/Agents';
import EditAgent from './pages/settings/EditAgent.tsx';
import AgentUsage from './pages/settings/AgentUsage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/settings" element={<Settings />}>
          <Route index element={<UserProfile />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="agents" element={<Agents />} />
          <Route path="agents/:id/edit" element={<EditAgent />} />
          <Route path="agents/:id/usage" element={<AgentUsage />} />
          <Route path="users" element={<Users />} />
          <Route path="billing" element={<Billing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;