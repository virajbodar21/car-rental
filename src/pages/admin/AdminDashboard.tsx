import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, DollarSign, Car, Calendar, AlertCircle } from 'lucide-react';
import { dummyBookings, dummyCars, dummyUsers } from '../../data';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';

const AdminDashboard: React.FC = () => {
  const totalBookings = dummyBookings.length;
  const totalRevenue = dummyBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalUsers = dummyUsers.filter(u => u.role === 'user').length;
  const availableCars = dummyCars.filter(c => c.available).length;

  // Monthly revenue data (mock)
  const monthlyData = [
    { month: 'Jan', revenue: 1200, bookings: 8 },
    { month: 'Feb', revenue: 1900, bookings: 12 },
    { month: 'Mar', revenue: 2400, bookings: 15 },
    { month: 'Apr', revenue: 1800, bookings: 11 },
    { month: 'May', revenue: 2800, bookings: 18 },
    { month: 'Jun', revenue: 3200, bookings: 21 },
  ];

  // Booking status distribution
  const statusData = [
    { name: 'Pending', value: dummyBookings.filter(b => b.status === 'Pending').length, color: '#F97316' },
    { name: 'Approved', value: dummyBookings.filter(b => b.status === 'Approved').length, color: '#10b981' },
    { name: 'Cancelled', value: dummyBookings.filter(b => b.status === 'Cancelled').length, color: '#EF4444' },
    { name: 'Completed', value: dummyBookings.filter(b => b.status === 'Completed').length, color: '#3B82F6' },
  ];

  interface StatCard {
    icon: React.ElementType;
    label: string;
    value: string | number;
    change: string;
    color: string;
  }

  const stats: StatCard[] = [
    {
      icon: Calendar,
      label: 'Total Bookings',
      value: totalBookings,
      change: '+12% this month',
      color: 'neon-blue',
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+8% from last month',
      color: 'neon-orange',
    },
    {
      icon: Users,
      label: 'Active Users',
      value: totalUsers,
      change: '+5 new users',
      color: 'green-400',
    },
    {
      icon: Car,
      label: 'Available Cars',
      value: `${availableCars}/${dummyCars.length}`,
      change: '3 under maintenance',
      color: 'neon-red',
    },
  ];

  return (
    <div className="min-h-screen pb-12">
      <div className="px-4 sm:px-6 lg:px-8 pt-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange mb-2">
            Admin Dashboard
          </h1>
          <p className="text-text-secondary text-lg">
            Manage your fleet and monitor business performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <GlassCard key={idx} className="p-6 relative overflow-hidden group hover">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}/20`}>
                      <Icon size={24} className={`text-${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-text-primary mb-2">{stat.value}</h3>
                  <p className="text-text-secondary text-xs">{stat.change}</p>
                </div>

                {/* Background glow */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-${stat.color}/10 rounded-full blur-2xl -z-10`}></div>
              </GlassCard>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <GlassCard className="p-6 lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-text-primary">Revenue Trend</h2>
              <p className="text-text-secondary text-sm mt-1">Last 6 months performance</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11, 15, 26, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                  }}
                  labelStyle={{ color: '#FFFFFF' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#F97316', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Status Distribution */}
          <GlassCard className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-text-primary">Booking Status</h2>
              <p className="text-text-secondary text-sm mt-1">Distribution overview</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11, 15, 26, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#FFFFFF' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {statusData.map((status, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color }}></div>
                    <span className="text-text-secondary">{status.name}</span>
                  </div>
                  <span className="text-text-primary font-bold">{status.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Booking Volume Chart */}
        <GlassCard className="p-6 mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Booking Volume</h2>
              <p className="text-text-secondary text-sm mt-1">Monthly bookings trend</p>
            </div>
            <TrendingUp size={24} className="text-neon-blue" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(11, 15, 26, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Bar dataKey="bookings" fill="#F97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Recent Bookings Table */}
        <GlassCard className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Recent Bookings</h2>
            <p className="text-text-secondary text-sm mt-1">Latest 10 bookings</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-text-secondary font-semibold text-sm">Vehicle</th>
                  <th className="text-left py-4 px-4 text-text-secondary font-semibold text-sm">Customer</th>
                  <th className="text-left py-4 px-4 text-text-secondary font-semibold text-sm">Dates</th>
                  <th className="text-left py-4 px-4 text-text-secondary font-semibold text-sm">Status</th>
                  <th className="text-right py-4 px-4 text-text-secondary font-semibold text-sm">Amount</th>
                </tr>
              </thead>
              <tbody>
                {dummyBookings.slice(0, 10).map((booking) => {
                  const car = dummyCars.find(c => c.id === booking.carId);
                  const user = dummyUsers.find(u => u.id === booking.userId);
                  const statusColor =
                    booking.status === 'Pending'
                      ? 'warning'
                      : booking.status === 'Approved'
                      ? 'primary'
                      : booking.status === 'Cancelled'
                      ? 'danger'
                      : 'success';

                  return (
                    <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-300">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={car?.image}
                            alt={car?.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <span className="text-text-primary font-medium text-sm">{car?.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-text-secondary text-sm">{user?.name}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-text-secondary text-sm">
                          {booking.pickupDate.toLocaleDateString()} - {booking.returnDate.toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          variant={
                            statusColor === 'warning'
                              ? 'warning'
                              : statusColor === 'primary'
                              ? 'primary'
                              : statusColor === 'danger'
                              ? 'danger'
                              : 'success'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-text-primary font-bold text-sm">${booking.totalPrice}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State Message */}
          {dummyBookings.length === 0 && (
            <div className="py-12 text-center">
              <AlertCircle size={48} className="mx-auto text-text-secondary/50 mb-3" />
              <p className="text-text-secondary">No bookings yet</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDashboard;