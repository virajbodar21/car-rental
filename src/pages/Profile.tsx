import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  if (!user) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Please login to view your profile</h2>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // In real app, update user data
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setEditing(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Profile</h2>
                {!editing && (
                  <button className="btn btn-primary" onClick={() => setEditing(true)}>
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                ) : (
                  <p className="form-control-plaintext">{user.name}</p>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                {editing ? (
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                ) : (
                  <p className="form-control-plaintext">{user.email}</p>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                {editing ? (
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                ) : (
                  <p className="form-control-plaintext">{user.phone}</p>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <p className="form-control-plaintext text-capitalize">{user.role}</p>
              </div>

              <div className="mb-3">
                <label className="form-label">Member Since</label>
                <p className="form-control-plaintext">{user.createdAt.toLocaleDateString()}</p>
              </div>

              {editing && (
                <div className="d-flex gap-2">
                  <button className="btn btn-success" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;