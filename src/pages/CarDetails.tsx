import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Fuel, Users, Zap, Shield, Clock, Star, AlertCircle } from 'lucide-react';
import { dummyCars, fetchCarById } from '../data';
import type { Car } from '../types';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const loadCar = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedCar = await fetchCarById(id);
          setCar(fetchedCar);
        }
      } catch (error) {
        console.error('Error loading car:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCar();
  }, [id]);

  const rating = 4.8;

  if (loading) {
    return (
      <div className="min-h-screen bg-hyper-dark flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-hyper-dark flex items-center justify-center pt-20">
        <GlassCard className="p-8 md:p-12 text-center max-w-md">
          <AlertCircle size={48} className="mx-auto text-neon-red mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-4">Car Not Found</h2>
          <p className="text-text-secondary mb-6">
            The vehicle you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => navigate('/cars')} className="w-full">
            Back to Fleet
          </Button>
        </GlassCard>
      </div>
    );
  }

  const images = Array(5).fill(car.image);
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setBookingLoading(true);
    setTimeout(() => {
      navigate(`/booking/${car.id}`);
      setBookingLoading(false);
    }, 500);
  };

  const specs = [
    { icon: Users, label: 'Seats', value: `${car.seats} Passengers` },
    { icon: Fuel, label: 'Fuel', value: car.fuelType },
    { icon: Zap, label: 'Transmission', value: car.transmission },
    { icon: Shield, label: 'Insurance', value: 'Included' },
  ];

  const features = [
    'Premium Leather Seats',
    'Advanced Safety Systems',
    'Built-in Navigation',
    'Bluetooth Connectivity',
    'Backup Camera',
    'Climate Control',
    'Cruise Control',
    'Premium Sound System',
  ];

  return (
    <div className="min-h-screen bg-hyper-dark pt-20">
      {/* Image Gallery Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <GlassCard className="overflow-hidden relative group">
                <div className="relative h-96 md:h-[32rem] bg-surface-dark overflow-hidden">
                  <img
                    src={images[currentImageIndex]}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hyper-dark/50 to-transparent"></div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-glass-dark/40 backdrop-blur-xl border border-white/10 p-2 rounded-full text-white hover:bg-neon-blue/20 transition-all duration-300"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-glass-dark/40 backdrop-blur-xl border border-white/10 p-2 rounded-full text-white hover:bg-neon-blue/20 transition-all duration-300"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-glass-dark/60 backdrop-blur-xl border border-white/10 px-3 py-1 rounded-full text-text-secondary text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'border-neon-blue shadow-neon-blue'
                          : 'border-white/10 hover:border-neon-blue/50'
                      }`}
                    >
                      <img src={img} alt={`${car.name} ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Quick Info Card */}
            <div className="lg:col-span-1">
              <GlassCard className="p-6 space-y-6 sticky top-24">
                {/* Title & Type */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold text-text-primary">{car.name}</h1>
                  </div>
                  <Badge variant="primary">{car.type}</Badge>
                  <div className="flex items-center gap-2 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(rating) ? 'fill-neon-orange text-neon-orange' : 'text-text-secondary'}
                      />
                    ))}
                    <span className="text-text-secondary text-sm">({rating}) 128 reviews</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-2 py-4 border-y border-white/10">
                  <p className="text-text-secondary text-sm">Daily Rate</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-neon-orange">${car.pricePerDay}</span>
                    <span className="text-text-secondary">/day</span>
                  </div>
                  <p className="text-text-secondary text-xs mt-2">
                    Weekly discounts available (20% off for 7+ days)
                  </p>
                </div>

                {/* Availability */}
                <div>
                  {car.available ? (
                    <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold">Available for Booking</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-neon-red bg-neon-red/10 border border-neon-red/30 rounded-lg p-3">
                      <AlertCircle size={16} />
                      <span className="text-sm font-semibold">Currently Unavailable</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBookNow}
                  disabled={!car.available || bookingLoading}
                  isLoading={bookingLoading}
                  className="w-full text-lg py-3 glow-pulse"
                >
                  Book Now
                </Button>

                {/* Additional Info */}
                <div className="space-y-2 text-sm text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-neon-blue" />
                    <span>Instant pickup & dropoff</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-neon-orange" />
                    <span>Multiple pickup locations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-green-400" />
                    <span>Full insurance included</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-12">Vehicle Specifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {specs.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <GlassCard key={idx} className="p-6 text-center hover">
                  <Icon size={32} className="mx-auto text-neon-blue mb-3" />
                  <p className="text-text-secondary text-sm mb-2">{spec.label}</p>
                  <p className="text-text-primary font-bold text-lg">{spec.value}</p>
                </GlassCard>
              );
            })}
          </div>

          {/* Full Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="p-8 lg:col-span-2">
              <h3 className="text-2xl font-bold text-text-primary mb-4">About This Vehicle</h3>
              <p className="text-text-secondary leading-relaxed mb-6">{car.description}</p>

              <h4 className="text-xl font-bold text-text-primary mb-4">Features & Amenities</h4>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Insurance Info */}
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <Shield size={20} className="text-green-400" />
                Insurance Coverage
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Basic Coverage', desc: 'Included in rental' },
                  { title: '24/7 Roadside Assist', desc: 'Always available' },
                  { title: 'Accident Coverage', desc: '$0 deductible' },
                  { title: 'Theft Protection', desc: 'Full coverage' },
                ].map((item, idx) => (
                  <div key={idx} className="py-3 border-b border-white/10 last:border-b-0">
                    <p className="font-semibold text-text-primary text-sm">{item.title}</p>
                    <p className="text-text-secondary text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Similar Cars Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            You May Also Like
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyCars.slice(0, 3).map((similarCar) => (
              <GlassCard
                key={similarCar.id}
                hover
                onClick={() => navigate(`/car/${similarCar.id}`)}
                className="overflow-hidden group cursor-pointer"
              >
                <div className="relative h-40 bg-surface-dark overflow-hidden">
                  <img
                    src={similarCar.image}
                    alt={similarCar.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-text-primary font-bold mb-2">{similarCar.name}</h4>
                  <p className="text-text-secondary text-sm mb-3">{similarCar.type}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-neon-orange font-bold">${similarCar.pricePerDay}/day</span>
                    <Badge variant="secondary" className="text-xs">
                      View
                    </Badge>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarDetails;