import express from 'express';
import Car from '../models/Car.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET all cars (public)
router.get('/', async (req, res) => {
  try {
    const { type, fuelType, transmission, minPrice, maxPrice, search } = req.query;
    
    let filter = {};
    if (type) filter.type = type;
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;
    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const cars = await Car.find(filter);
    res.json({ count: cars.length, cars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single car (public)
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE car (admin only)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { name, type, pricePerDay, fuelType, seats, transmission, image, description, features } = req.body;

    const car = new Car({
      name,
      type,
      pricePerDay,
      fuelType,
      seats,
      transmission,
      image,
      description: description || '',
      features: features || []
    });

    await car.save();
    res.status(201).json({ message: 'Car created', car });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE car (admin only)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car updated', car });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE car (admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted', car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
