import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Car from './models/Car.js';
import Booking from './models/Booking.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Car.deleteMany({});
    await Booking.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin and regular users with REAL ENCRYPTED passwords
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@carrental.com',
        password: 'admin123456',
        phone: '+1-555-0001',
        role: 'admin'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'john123456',
        phone: '+1-555-0002',
        role: 'user'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'jane123456',
        phone: '+1-555-0003',
        role: 'user'
      },
      {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123456',
        phone: '+1-555-0004',
        role: 'user'
      }
    ]);
    console.log('👥 Created 4 users');

    // Create cars
    const cars = await Car.create([
      {
        name: 'Toyota Camry',
        type: 'Sedan',
        pricePerDay: 50,
        fuelType: 'Petrol',
        seats: 5,
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
        description: 'Reliable sedan with excellent fuel efficiency',
        features: ['Air Conditioning', 'Bluetooth', 'Backup Camera'],
        available: true,
        rating: 4.5,
        reviews: 120
      },
      {
        name: 'Honda CR-V',
        type: 'SUV',
        pricePerDay: 75,
        fuelType: 'Petrol',
        seats: 7,
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1517654055899-a2c7ad9dae4e?w=500',
        description: 'Spacious SUV perfect for families',
        features: ['4WD', 'Sunroof', 'Navigation System', 'Leather Seats'],
        available: true,
        rating: 4.7,
        reviews: 205
      },
      {
        name: 'Ford Mustang',
        type: 'Luxury',
        pricePerDay: 150,
        fuelType: 'Petrol',
        seats: 4,
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500',
        description: 'Classic sports car with thrilling performance',
        features: ['Turbo Engine', 'Racing Suspension', 'Premium Audio'],
        available: true,
        rating: 4.8,
        reviews: 89
      },
      {
        name: 'Tesla Model 3',
        type: 'Sedan',
        pricePerDay: 100,
        fuelType: 'Electric',
        seats: 5,
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1560958089-b8a63fbf7ef7?w=500',
        description: 'Eco-friendly electric sedan with cutting-edge technology',
        features: ['Autopilot', 'Fast Charging', '15" Touchscreen'],
        available: true,
        rating: 4.9,
        reviews: 456
      },
      {
        name: 'Hyundai i20',
        type: 'Hatchback',
        pricePerDay: 35,
        fuelType: 'Petrol',
        seats: 5,
        transmission: 'Manual',
        image: 'https://images.unsplash.com/photo-1552762690-d0ca3d55d1b0?w=500',
        description: 'Budget-friendly compact car',
        features: ['Power Steering', 'AC', 'Abs'],
        available: true,
        rating: 4.2,
        reviews: 78
      },
      {
        name: 'BMW 7 Series',
        type: 'Luxury',
        pricePerDay: 200,
        fuelType: 'Diesel',
        seats: 5,
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=500',
        description: 'Premium luxury sedan with advanced features',
        features: ['Panoramic Sunroof', 'Massage Seats', 'Premium Audio System'],
        available: true,
        rating: 4.9,
        reviews: 234
      },
      {
        name: 'Jeep Wrangler',
        type: 'SUV',
        pricePerDay: 85,
        fuelType: 'Petrol',
        seats: 5,
        transmission: 'Manual',
        image: 'https://images.unsplash.com/photo-1552519507-da3effff991c?w=500',
        description: 'Off-road capable SUV for adventure seekers',
        features: ['4WD', 'All-Terrain Tires', 'Roll Bar'],
        available: true,
        rating: 4.6,
        reviews: 145
      },
      {
        name: 'Maruti Swift',
        type: 'Hatchback',
        pricePerDay: 40,
        fuelType: 'Petrol',
        seats: 5,
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1552519507-da3effff991c?w=500',
        description: 'Popular city car with great mileage',
        features: ['Power Windows', 'AC', 'ABS'],
        available: true,
        rating: 4.3,
        reviews: 98
      },
      {
        name: 'Audi A8',
        type: 'Luxury',
        pricePerDay: 250,
        fuelType: 'Diesel',
        seats: 5,
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=500',
        description: 'Ultra-premium executive sedan',
        features: ['Quad Zone Climate', 'Head-up Display', 'Adaptive Suspension'],
        available: true,
        rating: 4.9,
        reviews: 156
      },
      {
        name: 'Volkswagen Golf',
        type: 'Hatchback',
        pricePerDay: 55,
        fuelType: 'Petrol',
        seats: 5,
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1552519507-da3effff991c?w=500',
        description: 'European hatchback with great handling',
        features: ['Multi-function Steering', 'Cruise Control', 'Fog Lights'],
        available: true,
        rating: 4.4,
        reviews: 167
      }
    ]);
    console.log('🚗 Created 10 cars');

    // Create sample bookings
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const twoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

    const bookings = await Booking.create([
      {
        userId: users[1]._id,
        carId: cars[0]._id,
        pickupDate: today,
        returnDate: nextWeek,
        pickupLocation: 'New York',
        returnLocation: 'New York',
        numberOfDays: 7,
        totalPrice: 50 * 7,
        status: 'Approved'
      },
      {
        userId: users[2]._id,
        carId: cars[1]._id,
        pickupDate: nextWeek,
        returnDate: twoWeeks,
        pickupLocation: 'Los Angeles',
        returnLocation: 'Los Angeles',
        numberOfDays: 7,
        totalPrice: 75 * 7,
        status: 'Pending'
      }
    ]);
    console.log('📅 Created 2 sample bookings');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   Admin: admin@carrental.com / admin123456');
    console.log('   User:  john@example.com / john123456');
    console.log('   User:  jane@example.com / jane123456');
    console.log('   User:  test@example.com / test123456');

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

(async () => {
  await connectDB();
  await seedDatabase();
})();
