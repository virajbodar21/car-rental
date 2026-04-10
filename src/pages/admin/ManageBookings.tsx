import React, { useState } from 'react';
import { dummyBookings, dummyCars, dummyUsers } from '../../data';
import type { Booking } from '../../types';

const ManageBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings);

  const handleStatusChange = (id: string, newStatus: Booking['status']) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  const getStatusBadge = (status: string) => {
    const classes = {
      Pending: 'status-pending',
      Approved: 'status-approved',
      Cancelled: 'status-cancelled',
      Completed: 'status-completed'
    };
    return `badge ${classes[status as keyof typeof classes] || 'bg-secondary'}`;
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="px-4 sm:px-6 lg:px-8 pt-6">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange mb-2">Manage Bookings</h1>
        <p className="text-text-secondary text-lg mb-8">Review and manage all customer bookings</p>

        <div className="bg-glass-dark/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-text-primary">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Car</th>
                  <th>User</th>
                  <th>Pickup Date</th>
                  <th>Return Date</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const car = dummyCars.find(c => c.id === booking.carId);
                  const user = dummyUsers.find(u => u.id === booking.userId);
                  return (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={car?.image}
                            alt={car?.name}
                            style={{width: '40px', height: '30px', objectFit: 'cover', marginRight: '10px'}}
                          />
                          {car?.name}
                        </div>
                      </td>
                      <td>{user?.name}</td>
                      <td>{booking.pickupDate.toLocaleDateString()}</td>
                      <td>{booking.returnDate.toLocaleDateString()}</td>
                      <td>${booking.totalPrice}</td>
                      <td>
                        <span className={getStatusBadge(booking.status)}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        {booking.status === 'Pending' && (
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleStatusChange(booking.id, 'Approved')}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleStatusChange(booking.id, 'Cancelled')}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {booking.status === 'Approved' && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleStatusChange(booking.id, 'Completed')}
                          >
                            Mark Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;