import React from 'react';
import { dummyBookings, dummyCars } from '../data';
import { useAuth } from '../context/AuthContext';

const MyBookings: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Please login to view your bookings</h2>
        </div>
      </div>
    );
  }

  const userBookings = dummyBookings.filter(booking => booking.userId === user.id);

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
    <div className="container py-5">
      <h1 className="mb-4">My Bookings</h1>

      {userBookings.length === 0 ? (
        <div className="text-center py-5">
          <h3>No bookings found</h3>
          <p className="text-muted">You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="row">
          {userBookings.map((booking) => {
            const car = dummyCars.find(c => c.id === booking.carId);
            return (
              <div key={booking.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    {car && (
                      <div className="d-flex mb-3">
                        <img src={car.image} alt={car.name} className="me-3" style={{width: '80px', height: '60px', objectFit: 'cover'}} />
                        <div>
                          <h5 className="card-title mb-1">{car.name}</h5>
                          <p className="text-muted mb-0">{car.type}</p>
                        </div>
                      </div>
                    )}

                    <div className="row mb-2">
                      <div className="col-6">
                        <strong>Pickup:</strong><br />
                        {booking.pickupDate.toLocaleDateString()}
                      </div>
                      <div className="col-6">
                        <strong>Return:</strong><br />
                        {booking.returnDate.toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mb-2">
                      <strong>Total Price:</strong> ${booking.totalPrice}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className={getStatusBadge(booking.status)}>
                        {booking.status}
                      </span>
                      <small className="text-muted">
                        Booked on {booking.createdAt.toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;