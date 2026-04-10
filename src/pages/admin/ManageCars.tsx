import React, { useState } from 'react';
import { dummyCars } from '../../data';
import type { Car } from '../../types';

const ManageCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>(dummyCars);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setShowAddForm(false);
  };

  const handleSave = (carData: Omit<Car, 'id'>) => {
    if (editingCar) {
      setCars(cars.map(car =>
        car.id === editingCar.id ? { ...carData, id: editingCar.id } : car
      ));
      setEditingCar(null);
    } else {
      const newCar: Car = {
        ...carData,
        id: Date.now().toString(),
      };
      setCars([...cars, newCar]);
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setEditingCar(null);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange mb-2">Manage Cars</h1>
            <p className="text-text-secondary text-lg">Add, edit, or remove vehicles from your fleet</p>
          </div>
          <button
            className="px-6 py-3 bg-neon-blue text-white rounded-lg font-semibold hover:bg-neon-blue/90 transition-all"
            onClick={() => setShowAddForm(true)}
          >
            + Add New Car
          </button>
        </div>

        {(showAddForm || editingCar) && (
          <CarForm
            car={editingCar}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        <div className="bg-glass-dark/30 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-text-primary">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price/Day</th>
                  <th>Fuel</th>
                  <th>Seats</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td>
                      <img src={car.image} alt={car.name} style={{width: '60px', height: '40px', objectFit: 'cover'}} />
                    </td>
                    <td>{car.name}</td>
                    <td>{car.type}</td>
                    <td>${car.pricePerDay}</td>
                    <td>{car.fuelType}</td>
                    <td>{car.seats}</td>
                    <td>
                      <span className={`badge ${car.available ? 'bg-success' : 'bg-danger'}`}>
                        {car.available ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(car)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(car.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CarFormProps {
  car: Car | null;
  onSave: (car: Omit<Car, 'id'>) => void;
  onCancel: () => void;
}

const CarForm: React.FC<CarFormProps> = ({ car, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: car?.name || '',
    type: car?.type || 'SUV',
    pricePerDay: car?.pricePerDay || 0,
    fuelType: car?.fuelType || 'Petrol',
    seats: car?.seats || 5,
    transmission: car?.transmission || 'Automatic',
    image: car?.image || '',
    available: car?.available ?? true,
    description: car?.description || '',
    features: car?.features || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5>{car ? 'Edit Car' : 'Add New Car'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-control"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as Car['type']})}
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Price per Day</label>
              <input
                type="number"
                className="form-control"
                value={formData.pricePerDay}
                onChange={(e) => setFormData({...formData, pricePerDay: Number(e.target.value)})}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Fuel Type</label>
              <select
                className="form-control"
                value={formData.fuelType}
                onChange={(e) => setFormData({...formData, fuelType: e.target.value as Car['fuelType']})}
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Seats</label>
              <input
                type="number"
                className="form-control"
                value={formData.seats}
                onChange={(e) => setFormData({...formData, seats: Number(e.target.value)})}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Transmission</label>
              <select
                className="form-control"
                value={formData.transmission}
                onChange={(e) => setFormData({...formData, transmission: e.target.value as Car['transmission']})}
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                className="form-control"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Available</label>
              <select
                className="form-control"
                value={formData.available.toString()}
                onChange={(e) => setFormData({...formData, available: e.target.value === 'true'})}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Features</label>
            {formData.features.map((feature, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Enter feature"
                />
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeFeature(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline-primary" onClick={addFeature}>
              Add Feature
            </button>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              {car ? 'Update Car' : 'Add Car'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageCars;