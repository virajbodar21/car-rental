import express from 'express';
import Booking from '../models/Booking.js';
import Car from '../models/Car.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// CREATE booking (user)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { carId, pickupDate, returnDate, pickupLocation, returnLocation, notes } = req.body;

    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    if (pickup >= returnD) {
      return res.status(400).json({ error: 'Return date must be after pickup date' });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const numberOfDays = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
    const totalPrice = numberOfDays * car.pricePerDay;

    const booking = new Booking({
      userId: req.userId,
      carId,
      pickupDate: pickup,
      returnDate: returnD,
      pickupLocation: pickupLocation || 'New York',
      returnLocation: returnLocation || 'New York',
      numberOfDays,
      totalPrice,
      notes: notes || '',
      status: 'Pending'
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET my bookings (user)
router.get('/my-bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).populate('carId');
    res.json({ count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all bookings (admin)
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) filter.status = status;
    const bookings = await Booking.find(filter).populate('userId').populate('carId');
    res.json({ count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single booking
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('userId').populate('carId');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if (booking.userId._id.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE booking status (admin)
router.put('/:id/status', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Approved', 'Cancelled', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ message: 'Booking updated', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CANCEL booking
router.put('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if (booking.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    booking.status = 'Cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
