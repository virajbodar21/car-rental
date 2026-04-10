import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Calendar, MapPin, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import { dummyCars } from '../data';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import GlassCard from '../components/ui/GlassCard';

const schema = yup.object({
  pickupDate: yup.date().min(new Date(), 'Pickup date must be in the future').required('Pickup date is required'),
  returnDate: yup.date().min(yup.ref('pickupDate'), 'Return date must be after pickup date').required('Return date is required'),
  pickupLocation: yup.string().required('Pickup location is required'),
  returnLocation: yup.string().required('Return location is required'),
});

interface BookingForm {
  pickupDate: Date;
  returnDate: Date;
  pickupLocation: string;
  returnLocation: string;
}

const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const car = dummyCars.find(c => c.id === id);

  const { handleSubmit, setValue, watch, formState: { errors } } = useForm<BookingForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      pickupLocation: 'Downtown Office',
      returnLocation: 'Downtown Office',
    }
  });

  const pickupDate = watch('pickupDate');
  const returnDate = watch('returnDate');
  const pickupLocation = watch('pickupLocation');

  if (!car) {
    return (
      <div className="min-h-screen bg-hyper-dark flex items-center justify-center pt-20">
        <GlassCard className="p-8 md:p-12 text-center max-w-md">
          <AlertCircle size={48} className="mx-auto text-neon-red mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-4">Car Not Found</h2>
          <Button variant="primary" onClick={() => navigate('/cars')} className="w-full">
            Back to Fleet
          </Button>
        </GlassCard>
      </div>
    );
  }

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    return Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();
  const subtotal = days * car.pricePerDay;
  const insurance = subtotal * 0.1;
  const tax = (subtotal + insurance) * 0.08;
  const total = subtotal + insurance + tax;

  const onSubmit = async (_data: BookingForm) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/my-bookings');
    setLoading(false);
  };

  const locations = ['Downtown Office', 'Airport Terminal', 'City Center', 'Harbor District'];

  return (
    <div className="min-h-screen bg-hyper-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange mb-2">
            Complete Your Booking
          </h1>
          <p className="text-text-secondary text-lg">
            Confirm your rental details and proceed to payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
            {/* Car Summary */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">Selected Vehicle</h3>
              <div className="flex gap-4">
                <img src={car.image} alt={car.name} className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="text-text-primary font-bold text-lg">{car.name}</h4>
                  <p className="text-text-secondary text-sm mb-2">{car.type}</p>
                  <p className="text-neon-orange font-bold">${car.pricePerDay}/day</p>
                </div>
              </div>
            </GlassCard>

            {/* Date Selection */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-neon-blue" />
                Rental Dates
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-primary text-sm font-semibold mb-2">
                    Pickup Date
                  </label>
                  <div className="bg-glass-dark/50 border border-white/10 rounded-lg overflow-hidden">
                    <DatePicker
                      selected={pickupDate}
                      onChange={(date: Date | null) => setValue('pickupDate', date!)}
                      minDate={new Date()}
                      dateFormat="MMM dd, yyyy"
                      className="w-full bg-transparent text-text-primary p-3 focus:outline-none"
                      placeholderText="Select pickup date"
                    />
                  </div>
                  {errors.pickupDate && (
                    <p className="text-neon-red text-sm mt-1">{errors.pickupDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-text-primary text-sm font-semibold mb-2">
                    Return Date
                  </label>
                  <div className="bg-glass-dark/50 border border-white/10 rounded-lg overflow-hidden">
                    <DatePicker
                      selected={returnDate}
                      onChange={(date: Date | null) => setValue('returnDate', date!)}
                      minDate={pickupDate || new Date()}
                      dateFormat="MMM dd, yyyy"
                      className="w-full bg-transparent text-text-primary p-3 focus:outline-none"
                      placeholderText="Select return date"
                    />
                  </div>
                  {errors.returnDate && (
                    <p className="text-neon-red text-sm mt-1">{errors.returnDate.message}</p>
                  )}
                </div>
              </div>
            </GlassCard>

            {/* Location Selection */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-neon-orange" />
                Pickup & Return Location
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-primary text-sm font-semibold mb-2">
                    Pickup Location
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setValue('pickupLocation', e.target.value)}
                    className="w-full bg-glass-dark/50 border border-white/10 rounded-lg text-text-primary p-3 focus:outline-none focus:border-neon-blue/50 transition-colors"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-text-primary text-sm font-semibold mb-2">
                    Return Location
                  </label>
                  <select
                    value={watch('returnLocation')}
                    onChange={(e) => setValue('returnLocation', e.target.value)}
                    className="w-full bg-glass-dark/50 border border-white/10 rounded-lg text-text-primary p-3 focus:outline-none focus:border-neon-blue/50 transition-colors"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </GlassCard>

            {/* Additional Details */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <Users size={20} className="text-neon-red" />
                Driver Information
              </h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  label="Full Name"
                  value={user?.name || ''}
                  disabled
                  className="opacity-70 cursor-not-allowed"
                />
                <Input
                  type="email"
                  label="Email Address"
                  value={user?.email || ''}
                  disabled
                  className="opacity-70 cursor-not-allowed"
                />
              </div>
            </GlassCard>

            {/* Terms */}
            <GlassCard className="p-4 bg-green-500/5 border border-green-500/20">
              <div className="flex gap-3">
                <CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-primary font-semibold text-sm">Full insurance included</p>
                  <p className="text-text-secondary text-xs">Comprehensive coverage with $0 deductible</p>
                </div>
              </div>
            </GlassCard>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading || !pickupDate || !returnDate}
              isLoading={loading}
              className="w-full text-lg py-3"
            >
              Proceed to Payment
            </Button>
          </form>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-24 space-y-6">
              <h3 className="text-xl font-bold text-text-primary">Price Breakdown</h3>

              {days > 0 ? (
                <div className="space-y-4">
                  {/* Daily Rate */}
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {days} day{days !== 1 ? 's' : ''} × ${car.pricePerDay}/day
                    </span>
                    <span className="text-text-primary font-bold">${subtotal}</span>
                  </div>

                  {/* Insurance */}
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Insurance (10%)</span>
                    <span className="text-text-primary font-bold">${insurance.toFixed(0)}</span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Tax (8%)</span>
                    <span className="text-text-primary font-bold">${tax.toFixed(0)}</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10"></div>

                  {/* Total */}
                  <div className="flex justify-between items-baseline">
                    <span className="text-text-secondary font-semibold">Total</span>
                    <span className="text-3xl font-black text-neon-orange">${total.toFixed(0)}</span>
                  </div>

                  {/* Discount Info */}
                  {days >= 7 && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <p className="text-green-400 text-xs font-semibold">
                        ✓ Weekly Discount Applied (20% off)
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-text-secondary text-sm text-center py-8">
                  Select dates to see pricing
                </p>
              )}

              {/* Features List */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                {[
                  '24/7 Roadside Support',
                  'GPS Navigation Included',
                  'Free Cancellation',
                  'Flexible Pickup & Return',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-text-secondary text-sm">
                    <div className="w-1.5 h-1.5 bg-neon-blue rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;