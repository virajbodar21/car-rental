import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Headphones } from 'lucide-react';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import CarCard from '../components/CarCard';
import { dummyCars, fetchAllCars } from '../data';
import type { Car } from '../types';

const Home: React.FC = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>(dummyCars.slice(0, 3));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadFeaturedCars = async () => {
      try {
        const allCars = await fetchAllCars();
        setFeaturedCars(allCars.slice(0, 3));
      } catch (error) {
        console.error('Error loading featured cars:', error);
      }
      setIsLoaded(true);
    };

    loadFeaturedCars();
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Booking',
      description: 'Book your premium car in seconds with our streamlined process',
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: '100% secure transactions with comprehensive insurance coverage',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for your peace of mind',
    },
  ];

  return (
    <div className="min-h-screen bg-hyper-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
                    backgroundImage: `url('https://images2.alphacoders.com/136/1368954.jpeg?w=1600&q=80')`,
              filter: 'brightness(0.3)',
            }}
          ></div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-hyper-dark/50 via-hyper-dark/70 to-hyper-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-orange/10 opacity-50"></div>
          
          {/* Animated circles */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-orange/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Content */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="space-y-8">
            {/* Badge with Background */}
            <div className="relative inline-flex items-center gap-2 animate-slide-up">
              {/* Background elements */}
              <div className="absolute inset-0 -z-10 rounded-full">
                <div
                  className="absolute inset-0 rounded-full bg-cover bg-center blur-sm"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80')`,
                    filter: 'brightness(0.4)',
                  }}
                ></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue/40 to-neon-orange/40"></div>
              </div>
              
              {/* Badge content */}
              <div className="inline-flex items-center gap-2 bg-glass-dark/80 backdrop-blur-xl border border-neon-blue/50 rounded-full px-6 py-3 hover:border-neon-blue transition-all hover:shadow-lg hover:shadow-neon-blue/30">
                <Zap size={18} className="text-neon-blue animate-pulse" />
                <span className="text-neon-blue text-sm font-bold tracking-wide">Next Generation Rentals</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className={`text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-orange to-neon-red animate-slide-up transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{animationDelay: '0.1s'}}>
              Drive the Future
            </h1>

            {/* Subheading */}
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
              Experience premium hypercars and supercars. Book instantly, drive elegantly. Your journey to automotive excellence starts here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <Link to="/cars">
                <Button variant="primary" size="lg" className="group">
                  Explore Our Fleet
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
              {[
                { number: '500+', label: 'Premium Vehicles' },
                { number: '50K+', label: 'Happy Customers' },
                { number: '24/7', label: 'Support' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-neon-blue">{stat.number}</p>
                  <p className="text-text-secondary text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-text-secondary animate-bounce">
            <span className="text-xs font-semibold">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80')`,
              filter: 'brightness(0.15)',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-hyper-dark/40 via-hyper-dark/60 to-hyper-dark/80"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Why Choose <span className="bg-gradient-to-r from-neon-blue to-neon-orange bg-clip-text text-transparent">HYPERDRIVE</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Discover the premium experience that sets us apart from the rest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <GlassCard key={idx} className="p-8 text-center hover">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-neon-blue/20 rounded-xl">
                      <Icon size={32} className="text-neon-blue" />
                    </div>
                  </div>
                  <h3 className="text-text-primary font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://i.pinimg.com/originals/3c/14/83/3c1483d3c6b979e55ba3716d2ae490f3.jpg)`,
              filter: 'brightness(0.12)',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-hyper-dark/50 via-hyper-dark/70 to-hyper-dark/90"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Featured <span className="bg-gradient-to-r from-neon-blue to-neon-orange bg-clip-text text-transparent">Collection</span>
            </h2>
            <p className="text-text-secondary text-lg">
              Handpicked hypercars for the true enthusiast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/cars">
              <Button variant="primary" size="lg">
                View All Cars
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://i.pinimg.com/originals/3c/14/83/3c1483d3c6b979e55ba3716d2ae490f3.jpg')`,
              filter: 'brightness(0.2)',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-hyper-dark/60 via-hyper-dark/50 to-hyper-dark/60"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 md:p-16 text-center relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-orange/10 rounded-full blur-3xl -z-10"></div>

            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Ready for Your Adventure?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of car enthusiasts who've chosen HYPERDRIVE for their premium driving experience.
            </p>
            <Link to="/cars">
              <Button variant="primary" size="lg" className="group">
                Book Your Dream Car Now
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Home;