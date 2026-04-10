import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Booking must belong to a car']
  },
  pickupDate: {
    type: Date,
    required: [true, 'Please provide pickup date']
  },
  returnDate: {
    type: Date,
    required: [true, 'Please provide return date']
  },
  pickupLocation: {
    type: String,
    required: [true, 'Please provide pickup location'],
    default: 'New York'
  },
  returnLocation: {
    type: String,
    required: [true, 'Please provide return location'],
    default: 'New York'
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please provide total price'],
    min: 0
  },
  numberOfDays: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Cancelled', 'Completed'],
    default: 'Pending'
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      // Convert ObjectId references to strings
      if (ret.userId && ret.userId._id) {
        ret.userId.id = ret.userId._id.toString();
        delete ret.userId._id;
      }
      if (ret.carId && ret.carId._id) {
        ret.carId.id = ret.carId._id.toString();
        delete ret.carId._id;
      }
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Middleware to populate references
bookingSchema.pre(/^find/, function(next) {
  this.populate('userId', 'name email phone role')
     .populate('carId', 'name type pricePerDay fuelType seats transmission image');
  next();
});

export default mongoose.model('Booking', bookingSchema);
