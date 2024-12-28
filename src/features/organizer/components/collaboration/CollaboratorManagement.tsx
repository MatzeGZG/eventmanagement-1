import React, { useState } from 'react';
import { Users, UserPlus, Mail, Shield } from 'lucide-react';

interface Collaborator {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending';
}

export const CollaboratorManagement: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'editor' | 'viewer'>('editor');

  const handleInvite = () => {
    if (!inviteEmail) return;

    const newCollaborator: Collaborator = {
      id: crypto.randomUUID(),
      email: inviteEmail,
      role: selectedRole,
      status: 'pending'
    };

    setCollaborators([...collaborators, newCollaborator]);
    setInviteEmail('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
        </div>
        <button
          onClick={() => {}}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          View Activity Log
        </button>
      </div>

      {/* Invite Form */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <input
            type="email"
            placeholder="Enter email address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        <button
          onClick={handleInvite}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Invite
        </button>
      </div>

      {/* Collaborators List */}
      <div className="space-y-4">
        {collaborators.map((collaborator) => (
          <div
            key={collaborator.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{collaborator.email}</div>
                <div className="flex items-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-1" />
                  {collaborator.role.charAt(0).toUpperCase() + collaborator.role.slice(1)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                collaborator.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {collaborator.status.charAt(0).toUpperCase() + collaborator.status.slice(1)}
              </span>
              <button
                onClick={() => {}}
                className="text-gray-400 hover:text-gray-500"
              >
                •••
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};