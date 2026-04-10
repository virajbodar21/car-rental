import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['SUV', 'Sedan', 'Hatchback', 'Luxury'],
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric'],
    required: true
  },
  seats: {
    type: Number,
    required: true,
    min: 2,
    max: 8
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    default: ''
  },
  features: [String],
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Car', carSchema);
