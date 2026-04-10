import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { dummyCars, fetchAllCars } from '../data';
import type { Car } from '../types';
import CarCard from '../components/CarCard';
import GlassCard from '../components/ui/GlassCard';
import Input from '../components/ui/Input';

const Cars: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [cars, setCars] = useState<Car[]>(dummyCars);
  const [loading, setLoading] = useState(true);

  const typeFilter = searchParams.get('type') || '';

  // Fetch cars from API on component mount
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const fetchedCars = await fetchAllCars();
        setCars(fetchedCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesType = !typeFilter || car.type === typeFilter;
      const matchesSearch = !searchTerm ||
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = car.pricePerDay <= priceRange;
      return matchesType && matchesSearch && matchesPrice;
    });
  }, [typeFilter, searchTerm, priceRange, cars]);

  const handleTypeFilter = (type: string) => {
    const params = new URLSearchParams(searchParams);
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    setSearchParams(params);
  };

  const carTypes = ['SUV', 'Sedan', 'Hatchback', 'Luxury'];

  return (
    <div className="min-h-screen bg-hyper-dark pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange mb-4">
              Our Fleet
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl">
              Explore our premium collection of handpicked vehicles. Find your perfect drive today.
            </p>
          </div>

          {/* Animated background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="absolute -bottom-20 left-0 w-96 h-96 bg-neon-orange/5 rounded-full blur-3xl -z-10"></div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Search */}
            <div className="lg:col-span-2">
              <Input
                type="text"
                placeholder="Search cars by name or type..."
                icon={<Search size={18} className="text-text-secondary" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Price Range */}
            <div className="lg:col-span-2">
              <label className="block text-text-primary text-sm font-semibold mb-3">
                Max Price: <span className="text-neon-orange">${priceRange}/day</span>
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-2 bg-glass-dark rounded-lg appearance-none cursor-pointer accent-neon-blue"
              />
              <div className="flex justify-between text-text-secondary text-xs mt-2">
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>
          </div>

          {/* Type Filters */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={18} className="text-neon-blue" />
              <h3 className="text-text-primary font-semibold">Vehicle Type</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleTypeFilter('')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  !typeFilter
                    ? 'bg-neon-blue text-white shadow-neon-blue'
                    : 'bg-glass-dark/40 border border-white/10 text-text-primary hover:border-neon-blue/50'
                }`}
              >
                All Vehicles
              </button>
              {carTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeFilter(type)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    typeFilter === type
                      ? 'bg-neon-blue text-white shadow-neon-blue'
                      : 'bg-glass-dark/40 border border-white/10 text-text-primary hover:border-neon-blue/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                Results <span className="text-neon-blue">({filteredCars.length})</span>
              </h2>
              <p className="text-text-secondary mt-1">
                {filteredCars.length === 0
                  ? 'No cars matching your criteria'
                  : `Showing ${filteredCars.length} ${filteredCars.length === 1 ? 'vehicle' : 'vehicles'}`}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <GlassCard className="p-12 md:p-16 text-center">
              <div className="py-12">
                <Filter size={48} className="mx-auto text-text-secondary/50 mb-4" />
                <h3 className="text-2xl font-bold text-text-primary mb-2">No Cars Found</h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your search criteria or price range to find the perfect vehicle.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setPriceRange(1000);
                    handleTypeFilter('');
                  }}
                  className="px-6 py-2 bg-neon-blue text-white rounded-lg font-semibold hover:shadow-neon-blue transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </GlassCard>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cars;