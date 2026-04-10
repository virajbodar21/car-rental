import React, { useState } from 'react';
import { dummyUsers } from '../../data';
import type { User } from '../../types';

const ManageUsers: React.FC = () => {
  const [users] = useState<User[]>(dummyUsers);

  return (
    <div className="min-h-screen pb-12">
      <div className="px-4 sm:px-6 lg:px-8 pt-6">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange mb-2">Manage Users</h1>
          <p className="text-text-secondary text-lg">View and manage all registered users</p>
        </div>

        <div className="bg-glass-dark/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-text-primary">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Member Since</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.createdAt.toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        Delete
                      </button>
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
};

export default ManageUsers;