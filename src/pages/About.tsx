import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-hyper-dark">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-glass-dark/30 to-hyper-dark border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange mb-4">About CarRental</h1>
          <p className="text-text-secondary text-lg">Your trusted partner for premium vehicle rentals</p>
        </div>
      </div>

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Our Story Section */}
          <section>
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                CarRental was founded in 2020 with a simple mission: to make car rental easy,
                affordable, and accessible to everyone. We believe that getting around shouldn't
                be complicated or expensive. Today, we serve thousands of customers with pride and
                commitment to excellence.
              </p>
            </GlassCard>
          </section>

          {/* Features Grid */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-neon-blue/20 rounded-xl">
                    <i className="bi bi-car-front text-2xl text-neon-blue"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quality Vehicles</h3>
                <p className="text-text-secondary">Our fleet consists of well-maintained, latest model vehicles from top manufacturers.</p>
              </GlassCard>

              <GlassCard className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-neon-orange/20 rounded-xl">
                    <i className="bi bi-shield-check text-2xl text-neon-orange"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Safe & Reliable</h3>
                <p className="text-text-secondary">All our cars undergo regular maintenance and safety checks to ensure your peace of mind.</p>
              </GlassCard>

              <GlassCard className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-neon-red/20 rounded-xl">
                    <i className="bi bi-headset text-2xl text-neon-red"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
                <p className="text-text-secondary">Our customer service team is available around the clock to assist you with any needs.</p>
              </GlassCard>
            </div>
          </section>

          {/* Benefits List */}
          <section>
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Our Advantages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-neon-blue text-xl mt-1">✓</div>
                  <div>
                    <p className="text-white font-semibold">Competitive pricing</p>
                    <p className="text-text-secondary text-sm">No hidden fees, transparent pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-neon-blue text-xl mt-1">✓</div>
                  <div>
                    <p className="text-white font-semibold">Flexible booking</p>
                    <p className="text-text-secondary text-sm">Easy cancellations and modifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-neon-blue text-xl mt-1">✓</div>
                  <div>
                    <p className="text-white font-semibold">Wide range of vehicles</p>
                    <p className="text-text-secondary text-sm">From economy to luxury supercars</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-neon-blue text-xl mt-1">✓</div>
                  <div>
                    <p className="text-white font-semibold">Convenient locations</p>
                    <p className="text-text-secondary text-sm">Easy pickup and drop-off options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-neon-blue text-xl mt-1">✓</div>
                  <div>
                    <p className="text-white font-semibold">GPS & Assistance</p>
                    <p className="text-text-secondary text-sm">Navigation and roadside support included</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-neon-blue text-xl mt-1">✓</div>
                  <div>
                    <p className="text-white font-semibold">Premium service</p>
                    <p className="text-text-secondary text-sm">Exceptional customer experience</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <GlassCard className="p-12 bg-gradient-to-r from-neon-blue/10 to-neon-orange/10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-text-secondary text-lg mb-6">Browse our available cars and book your perfect ride today.</p>
              <a href="/cars">
                <Button variant="primary" size="lg">
                  Browse Cars
                </Button>
              </a>
            </GlassCard>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;