export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Car {
  id: string;
  name: string;
  type: 'SUV' | 'Sedan' | 'Hatchback' | 'Luxury';
  pricePerDay: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric';
  seats: number;
  transmission: 'Manual' | 'Automatic';
  image: string;
  available: boolean;
  description: string;
  features: string[];
}

export interface Booking {
  id: string;
  userId: string;
  carId: string;
  pickupDate: Date;
  returnDate: Date;
  totalPrice: number;
  status: 'Pending' | 'Approved' | 'Cancelled' | 'Completed';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}