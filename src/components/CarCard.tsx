import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Fuel, Users, Zap } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Badge from './ui/Badge';
import Button from './ui/Button';
import type { Car } from '../types';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const rating = 4.8;
  
  return (
    <GlassCard hover className="overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 bg-surface-dark overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="primary">{car.type}</Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-hyper-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-text-primary font-bold text-lg">{car.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(rating) ? 'fill-neon-orange text-neon-orange' : 'text-text-secondary'}
                />
              ))}
              <span className="text-text-secondary text-xs ml-1">({rating})</span>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-white/10">
          <div className="flex flex-col items-center gap-1">
            <Users size={16} className="text-neon-blue" />
            <span className="text-text-secondary text-xs">{car.seats} seats</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Fuel size={16} className="text-neon-orange" />
            <span className="text-text-secondary text-xs">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Zap size={16} className="text-neon-red" />
            <span className={`text-xs px-2 py-1 rounded ${car.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {car.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-text-secondary text-xs">Starting from</p>
            <p className="text-neon-orange font-bold text-xl">${car.pricePerDay}/day</p>
          </div>
          <Link to={`/car/${car.id}`} className="w-auto">
            <Button variant="primary" size="sm">
              Details
            </Button>
          </Link>
        </div>
      </div>
    </GlassCard>
  );
};

export default CarCard;