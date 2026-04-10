import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Line } from 'recharts';
import { dummyBookings, dummyCars } from '../../data';

const Reports: React.FC = () => {
  // Revenue over time (mock data)
  const revenueData = [
    { month: 'Jan', revenue: 1200, bookings: 8 },
    { month: 'Feb', revenue: 1900, bookings: 12 },
    { month: 'Mar', revenue: 2400, bookings: 15 },
    { month: 'Apr', revenue: 1800, bookings: 11 },
    { month: 'May', revenue: 2800, bookings: 18 },
    { month: 'Jun', revenue: 3200, bookings: 20 },
    { month: 'Jul', revenue: 2900, bookings: 17 },
    { month: 'Aug', revenue: 3500, bookings: 22 },
    { month: 'Sep', revenue: 3100, bookings: 19 },
    { month: 'Oct', revenue: 3800, bookings: 24 },
    { month: 'Nov', revenue: 4200, bookings: 26 },
    { month: 'Dec', revenue: 4500, bookings: 28 },
  ];

  // Car type popularity
  const carTypeData = [
    { type: 'SUV', count: dummyBookings.filter(b => {
      const car = dummyCars.find(c => c.id === b.carId);
      return car?.type === 'SUV';
    }).length },
    { type: 'Sedan', count: dummyBookings.filter(b => {
      const car = dummyCars.find(c => c.id === b.carId);
      return car?.type === 'Sedan';
    }).length },
    { type: 'Hatchback', count: dummyBookings.filter(b => {
      const car = dummyCars.find(c => c.id === b.carId);
      return car?.type === 'Hatchback';
    }).length },
    { type: 'Luxury', count: dummyBookings.filter(b => {
      const car = dummyCars.find(c => c.id === b.carId);
      return car?.type === 'Luxury';
    }).length },
  ];

  const totalRevenue = dummyBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const averageBookingValue = totalRevenue / dummyBookings.length;
  const totalBookings = dummyBookings.length;
  const completedBookings = dummyBookings.filter(b => b.status === 'Completed').length;
  const completionRate = (completedBookings / totalBookings) * 100;

  return (
    <div className="min-h-screen pb-12">
      <div className="px-4 sm:px-6 lg:px-8 pt-6">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange mb-2">Reports & Analytics</h1>
          <p className="text-text-secondary text-lg">Track your business performance and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-primary">${totalRevenue}</h3>
              <p className="text-muted mb-0">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-success">${averageBookingValue.toFixed(2)}</h3>
              <p className="text-muted mb-0">Avg Booking Value</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-info">{totalBookings}</h3>
              <p className="text-muted mb-0">Total Bookings</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-warning">{completionRate.toFixed(1)}%</h3>
              <p className="text-muted mb-0">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Revenue & Bookings Over Time</h5>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Revenue ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} name="Bookings" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Car Type Popularity */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Car Type Popularity</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={carTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Top Performing Cars</h5>
              <div className="list-group list-group-flush">
                {dummyCars.slice(0, 5).map((car) => (
                  <div key={car.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img src={car.image} alt={car.name} style={{width: '40px', height: '30px', objectFit: 'cover', marginRight: '10px'}} />
                      <div>
                        <strong>{car.name}</strong>
                        <br />
                        <small className="text-muted">{car.type}</small>
                      </div>
                    </div>
                    <span className="badge bg-primary rounded-pill">${car.pricePerDay}/day</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;