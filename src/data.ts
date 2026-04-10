import type { Car, User, Booking } from './types';
import { carsAPI, bookingsAPI } from './api/index.js';

export const dummyCars: Car[] = [
  {
    id: '1',
    name: 'Toyota Camry',
    type: 'Sedan',
    pricePerDay: 45,
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'Automatic',
    image: 'https://tse2.mm.bing.net/th/id/OIP.c-eCQfLLRSmHk-QOZL6zdgHaF6?pid=Api&P=0&h=180',
    available: true,
    description: 'Comfortable and reliable sedan perfect for city driving.',
    features: ['Air Conditioning', 'Bluetooth', 'GPS', 'Cruise Control']
  },
  {
    id: '2',
    name: 'Honda CR-V',
    type: 'SUV',
    pricePerDay: 65,
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'Automatic',
    image: 'https://tse3.mm.bing.net/th/id/OIP.sCKPxQBy8zycmzDxBMpQYwHaE8?pid=Api&P=0&h=180',
    available: true,
    description: 'Spacious SUV with excellent fuel efficiency.',
    features: ['All-Wheel Drive', 'Sunroof', 'Leather Seats', 'Backup Camera']
  },
  {
    id: '3',
    name: 'Ford Mustang',
    type: 'Luxury',
    pricePerDay: 120,
    fuelType: 'Petrol',
    seats: 4,
    transmission: 'Manual',
    image: 'https://tse4.mm.bing.net/th/id/OIP.lP3uOMXlCwwNfvzNW8V4uwHaEy?pid=Api&P=0&h=180',
    available: true,
    description: 'Iconic American muscle car with roaring V8 power.',
    features: ['5.0L V8 Engine', 'Premium Sound System', 'Sport Suspension', 'LED Lights']
  },
  {
    id: '4',
    name: 'Volkswagen Golf',
    type: 'Hatchback',
    pricePerDay: 35,
    fuelType: 'Diesel',
    seats: 5,
    transmission: 'Manual',
    image: 'https://cdn.motor1.com/images/mgl/nA9Joj/s1/2024-volkswagen-golf-gti-380.jpg',
    available: true,
    description: 'Compact and efficient hatchback for everyday use.',
    features: ['Fuel Efficient', 'Compact Size', 'Modern Interior', 'USB Charging']
  },
  {
    id: '5',
    name: 'BMW X5',
    type: 'SUV',
    pricePerDay: 150,
    fuelType: 'Diesel',
    seats: 5,
    transmission: 'Automatic',
    image: 'https://www.carscoops.com/wp-content/uploads/2023/08/BMW-X5.jpg',
    available: false,
    description: 'Luxury SUV with premium features and performance.',
    features: ['Premium Leather', 'Navigation', 'Heated Seats', 'Panoramic Roof']
  },
  {
    id: '6',
    name: 'Tesla Model 3',
    type: 'Luxury',
    pricePerDay: 100,
    fuelType: 'Electric',
    seats: 5,
    transmission: 'Automatic',
    image: 'https://tse1.mm.bing.net/th/id/OIP.JzzL-ESveBC2EQdlcU9dIgHaEJ?pid=Api&P=0&h=180',
    available: true,
    description: 'Electric sedan with cutting-edge technology.',
    features: ['Autopilot', 'Supercharger Access', 'Glass Roof', 'Minimalist Interior']
  },
  {
    id: '7',
    name: 'Lamborghini Huracan',
    type: 'Luxury',
    pricePerDay: 500,
    fuelType: 'Petrol',
    seats: 2,
    transmission: 'Automatic',
    image: 'https://www.exoticcarhacks.com/wp-content/uploads/2024/02/D-8WJU7I-scaled.jpeg',
    available: true,
    description: 'Exotic supercar with breathtaking performance and Italian design.',
    features: ['5.2L V10 Engine', 'Carbon Fiber Body', 'Racing Seats', 'Ceramic Brakes']
  },
  {
    id: '8',
    name: 'Ferrari 488 Spider',
    type: 'Luxury',
    pricePerDay: 600,
    fuelType: 'Petrol',
    seats: 2,
    transmission: 'Automatic',
    image: 'https://tse1.mm.bing.net/th/id/OIP.3zv0mOCPCrp-OYCPLVmX4wHaEK?pid=Api&P=0&h=180',
    available: true,
    description: 'Open-top Ferrari with twin-turbo V8 and racing heritage.',
    features: ['3.9L Twin-Turbo V8', 'Retractable Hardtop', 'Carbon Ceramic Brakes', 'Sport Exhaust']
  },
  {
    id: '9',
    name: 'Porsche 911 Carrera',
    type: 'Luxury',
    pricePerDay: 250,
    fuelType: 'Petrol',
    seats: 4,
    transmission: 'Manual',
    image: 'https://cdn.motor1.com/images/mgl/y24Qjq/s1/2025-porsche-carrera-t-coupe.jpg',
    available: true,
    description: 'Legendary sports car with precision engineering and iconic design.',
    features: ['3.0L Twin-Turbo Flat-6', 'PDK Transmission', 'Sport Chrono Package', 'Adaptive Suspension']
  },
  {
    id: '10',
    name: 'McLaren 720S',
    type: 'Luxury',
    pricePerDay: 700,
    fuelType: 'Petrol',
    seats: 2,
    transmission: 'Automatic',
    image: 'https://tse1.mm.bing.net/th/id/OIP.g8uj-bazWdnen44jf_VJWgHaEK?pid=Api&P=0&h=180',
    available: false,
    description: 'Ultra-high performance supercar with carbon fiber monocoque.',
    features: ['4.0L Twin-Turbo V8', 'Carbon Fiber Monocoque', 'Air Brake System', 'Dihedral Doors']
  },
  {
    id: '11',
    name: 'Audi R8',
    type: 'Luxury',
    pricePerDay: 300,
    fuelType: 'Petrol',
    seats: 2,
    transmission: 'Automatic',
    image: 'https://wallpapercave.com/wp/wp12252447.jpg',
    available: true,
    description: 'German supercar with quattro all-wheel drive and V10 power.',
    features: ['5.2L V10 Engine', 'Quattro AWD', 'Magnetic Ride', 'Virtual Cockpit']
  },
  {
    id: '12',
    name: 'Nissan GT-R',
    type: 'Luxury',
    pricePerDay: 180,
    fuelType: 'Petrol',
    seats: 4,
    transmission: 'Automatic',
    image: 'https://tse1.mm.bing.net/th/id/OIP.XroW-KPsKi11uoiOSX9a7gHaER?pid=Api&P=0&h=180',
    available: true,
    description: 'Japanese supercar with legendary Godzilla power and handling.',
    features: ['3.8L Twin-Turbo V6', 'ATTESA E-TS AWD', 'Bilstein Dampers', 'Brembo Brakes']
  },
  {
    id: '13',
    name: 'Chevrolet Corvette',
    type: 'Luxury',
    pricePerDay: 200,
    fuelType: 'Petrol',
    seats: 2,
    transmission: 'Manual',
    image: 'https://static1.topspeedimages.com/wordpress/wp-content/uploads/2023/04/resize_screenshot-2023-04-26-at-03-38-47.jpg',
    available: true,
    description: 'American sports car icon with mid-engine layout and LT2 V8.',
    features: ['6.2L LT2 V8', 'Magnetic Selective Ride', 'Brembo Brakes', 'Carbon Fiber Hood']
  },
  {
    id: '14',
    name: 'Mercedes-Benz G-Wagon',
    type: 'SUV',
    pricePerDay: 220,
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'Automatic',
    image: 'https://static1.topspeedimages.com/wordpress/wp-content/uploads/2023/01/mercedes-g-wagen.jpg',
    available: true,
    description: 'Legendary off-road SUV with luxury appointments and iconic boxy design.',
    features: ['4.0L V8 Biturbo', '4MATIC AWD', 'Air Suspension', 'COMMAND Infotainment']
  },
  {
    id: '15',
    name: 'Range Rover Sport',
    type: 'SUV',
    pricePerDay: 180,
    fuelType: 'Diesel',
    seats: 5,
    transmission: 'Automatic',
    image: 'https://tse4.mm.bing.net/th/id/OIP.bs2eInai4YweL1PAg9lLqgHaDt?pid=Api&P=0&h=180',
    available: true,
    description: 'British luxury SUV combining off-road capability with refined comfort.',
    features: ['3.0L V6 Diesel', 'Terrain Response', 'Adaptive Dynamics', 'Meridian Sound System']
  },
  {
    id: '16',
    name: 'Jeep Wrangler',
    type: 'SUV',
    pricePerDay: 90,
    fuelType: 'Petrol',
    seats: 4,
    transmission: 'Manual',
    image: 'https://www.topgear.com/sites/default/files/2024/04/1-Jeep-Wrangler-review-2024.jpg',
    available: true,
    description: 'Ultimate off-road vehicle with removable doors and legendary capability.',
    features: ['3.6L V6 Pentastar', 'Command-Trac 4x4', 'Rock-Trac Option', 'Removable Doors']
  },
  {
    id: '17',
    name: 'Subaru WRX STI',
    type: 'Sedan',
    pricePerDay: 85,
    fuelType: 'Petrol',
    seats: 4,
    transmission: 'Manual',
    image: 'https://cdn.motor1.com/images/mgl/G3Al41/s1/subaru-wrx-sti-s210.jpg',
    available: true,
    description: 'High-performance rally-bred sedan with symmetrical all-wheel drive.',
    features: ['2.5L Turbo Boxer-4', 'Symmetrical AWD', 'STI Suspension', 'Brembo Brakes']
  },
  {
    id: '18',
    name: 'Mazda MX-5 Miata',
    type: 'Luxury',
    pricePerDay: 70,
    fuelType: 'Petrol',
    seats: 2,
    transmission: 'Manual',
    image: 'https://static1.topspeedimages.com/wordpress/wp-content/uploads/2024/02/24my-mx-5-8-1.jpg',
    available: true,
    description: 'Pure sports car experience with lightweight design and perfect weight balance.',
    features: ['2.0L SKYACTIV-G', '6-Speed Manual', 'Retractable Hardtop', 'Brembo Brakes']
  }
];

export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    role: 'user',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@carrental.com',
    phone: '+1234567891',
    role: 'admin',
    createdAt: new Date('2023-01-01')
  }
];

export const dummyBookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    carId: '1',
    pickupDate: new Date('2024-04-01'),
    returnDate: new Date('2024-04-05'),
    totalPrice: 180,
    status: 'Approved',
    createdAt: new Date('2024-03-25')
  },
  {
    id: '2',
    userId: '1',
    carId: '3',
    pickupDate: new Date('2024-04-10'),
    returnDate: new Date('2024-04-12'),
    totalPrice: 240,
    status: 'Pending',
    createdAt: new Date('2024-03-28')
  }
];

// Alias for consistency
export const cars = dummyCars;

// ============ API FUNCTIONS ============
// These functions fetch data from the backend API

export const fetchAllCars = async (filters?: any) => {
  try {
    const response = await carsAPI.getAll(filters);
    return response.cars || [];
  } catch (error) {
    console.warn('Failed to fetch cars from API, using dummy data:', error);
    return dummyCars;
  }
};

export const fetchCarById = async (id: string) => {
  try {
    return await carsAPI.getById(id);
  } catch (error) {
    console.warn('Failed to fetch car from API, using dummy data:', error);
    return dummyCars.find(c => c.id === id);
  }
};

export const fetchMyBookings = async () => {
  try {
    const response = await bookingsAPI.getMyBookings();
    return response.bookings || [];
  } catch (error) {
    console.warn('Failed to fetch bookings from API, using dummy data:', error);
    return dummyBookings;
  }
};

export const createBooking = async (bookingData: any) => {
  try {
    const response = await bookingsAPI.create(bookingData);
    return response.booking;
  } catch (error) {
    console.error('Failed to create booking:', error);
    throw error;
  }
};