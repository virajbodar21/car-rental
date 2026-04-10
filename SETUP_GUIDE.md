# 🚗 Car Rental System - Complete Setup Guide

## Overview

Your car rental application has been fully integrated with MongoDB backend. This guide will help you set up and run the entire system.

---

## 📋 What's New

✅ **Backend Created:**
- Node.js + Express server
- MongoDB database integration
- JWT authentication
- Complete REST API
- Mock data seeding script

✅ **Frontend Updated:**
- Connected to backend API
- Real authentication from database
- Real car data from database
- Real booking system
- Automatic token management

---

## 🚀 Installation & Setup

### Part 1: Backend Setup

#### Step 1: Install MongoDB

**Option A: Local MongoDB**
```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: Follow https://docs.mongodb.com/manual/installation/
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string

#### Step 2: Setup Backend Environment

```bash
cd backend
npm install
```

#### Step 3: Configure Environment Variables

Create `.env` file in backend folder:

```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/car-rental

# OR MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

#### Step 4: Seed Database with Sample Data

```bash
node seed.js
```

You should see:
```
✅ Database seeded successfully!

📝 Test Credentials:
   Admin: admin@carrental.com / password
   User:  john@example.com / password
   User:  jane@example.com / password
```

#### Step 5: Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
📡 API available at http://localhost:5000/api
✅ MongoDB connected
```

---

### Part 2: Frontend Setup

#### Step 1: Install Frontend Dependencies

```bash
npm install
```

#### Step 2: Start Frontend Development Server

```bash
npm run dev
```

You should see:
```
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## 🧪 Testing the Application

### 1. Health Check
Open browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "Backend is running",
  "database": "Connected"
}
```

### 2. Test Authentication

#### Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123",
    "phone": "+1-555-0000"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@carrental.com",
    "password": "password"
  }'
```

### 3. Get All Cars
```bash
curl http://localhost:5000/api/cars
```

### 4. Frontend Testing

1. Go to http://localhost:5173
2. **Try browsing cars** - Should load from database
3. **Try registering** - New user will be saved to database
4. **Try logging in** - Uses database credentials:
   - Email: `admin@carrental.com`
   - Password: `password`

---

## 📁 Backend Folder Structure

```
backend/
├── models/
│   ├── User.js          # User schema with password hashing
│   ├── Car.js           # Car schema with all features
│   └── Booking.js       # Booking schema with references
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── cars.js          # Car CRUD endpoints
│   ├── bookings.js      # Booking endpoints
│   └── users.js         # Admin user management
├── middleware/
│   └── auth.js          # JWT authentication & authorization
├── server.js            # Express server setup
├── seed.js              # Database seeding script
├── package.json         # Dependencies
├── .env.example         # Environment template
└── README.md            # API documentation
```

---

## 🔑 Test Accounts

After running seed script, you have:

| Email | Password | Role |
|-------|----------|------|
| admin@carrental.com | password | Admin |
| john@example.com | password | User |
| jane@example.com | password | User |

---

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
GET    /api/auth/me              - Get current user (requires token)
PUT    /api/auth/profile         - Update profile (requires token)
```

### Cars
```
GET    /api/cars                 - Get all cars (with filters)
GET    /api/cars/:id             - Get single car
POST   /api/cars                 - Create car (admin only)
PUT    /api/cars/:id             - Update car (admin only)
DELETE /api/cars/:id             - Delete car (admin only)
```

### Bookings
```
POST   /api/bookings             - Create booking (requires login)
GET    /api/bookings/my-bookings - Get user's bookings
GET    /api/bookings             - Get all bookings (admin only)
GET    /api/bookings/:id         - Get single booking
PUT    /api/bookings/:id/status  - Update status (admin only)
PUT    /api/bookings/:id/cancel  - Cancel booking
```

### Users (Admin)
```
GET    /api/users                - Get all users
GET    /api/users/stats/dashboard - Get statistics
GET    /api/users/:id            - Get single user
PUT    /api/users/:id/role       - Update user role
DELETE /api/users/:id            - Delete user
```

---

## 🔄 How Data Flows

```
1. Frontend (React) 
   ↓
2. API Client (src/api/index.js)
   ↓
3. Backend Server (Express)
   ↓
4. Route Handler (routes/auth.js, cars.js, etc)
   ↓
5. MongoDB Database
```

---

## 🛠️ Common Tasks

### Add New Car Manually

```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "New Car",
    "type": "SUV",
    "pricePerDay": 100,
    "fuelType": "Petrol",
    "seats": 5,
    "transmission": "Automatic",
    "image": "https://...",
    "features": ["AC", "GPS"]
  }'
```

### Create Booking

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN" \
  -d '{
    "carId": "car_id",
    "pickupDate": "2024-04-20T10:00:00Z",
    "returnDate": "2024-04-27T10:00:00Z",
    "pickupLocation": "New York",
    "returnLocation": "New York"
  }'
```

### Reset Database

```bash
# Delete all data and reseed
node seed.js
```

---

## ⚠️ Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Try restarting MongoDB service

### Issue: "Backend returns 401 Unauthorized"
**Solution:**
- Token may be expired
- Re-login to get new token
- Check token in localStorage

### Issue: "CORS errors"
**Solution:**
- Frontend should be on port 5173
- Backend on port 5000
- Both running for proxy to work

### Issue: "Car not showing after creation"
**Solution:**
- Refresh page
- Check browser console for errors
- Verify token is being sent

---

## 🔐 Security Notes

1. **Change JWT_SECRET** in production
2. **Never commit `.env`** to git
3. **Use HTTPS** in production
4. **Validate all inputs** on backend
5. **Use environment-specific configs**

---

## 📊 Database Schema

### User
- `_id`: MongoDB ID
- `name`: User name
- `email`: Unique email
- `password`: Hashed password
- `phone`: Phone number
- `role`: 'user' | 'admin'
- `createdAt`, `updatedAt`: Timestamps

### Car
- `_id`: MongoDB ID
- `name`: Car name
- `type`: 'SUV' | 'Sedan' | 'Hatchback' | 'Luxury'
- `pricePerDay`: Number
- `fuelType`: 'Petrol' | 'Diesel' | 'Electric'
- `seats`: Number
- `transmission`: 'Manual' | 'Automatic'
- `image`: URL
- `available`: Boolean
- `features`: Array of strings
- `rating`: Number
- `createdAt`, `updatedAt`: Timestamps

### Booking
- `_id`: MongoDB ID
- `userId`: Reference to User
- `carId`: Reference to Car
- `pickupDate`, `returnDate`: Dates
- `pickupLocation`, `returnLocation`: Strings
- `numberOfDays`: Number
- `totalPrice`: Number
- `status`: 'Pending' | 'Approved' | 'Cancelled' | 'Completed'
- `createdAt`, `updatedAt`: Timestamps

---

## 🎯 Next Steps

1. ✅ Backend running on port 5000
2. ✅ Frontend running on port 5173
3. ✅ Database seeded with sample data
4. ✅ Authentication working with real database
5. ✅ Cars loading from database
6. 🔄 **Frontend pages partially updated** - Manual refresh needed on:
   - Admin pages (ManageCars, ManageBookings, etc.)
   - Some form submissions

### Manual Frontend Updates Needed

The following pages may need manual refreshes after API calls:
- Admin Dashboard (stats)
- Manage Cars (add/edit/delete)
- Manage Bookings (status updates)
- Manage Users (user management)

**To refresh after API call:**
```javascript
// Reload component data
window.location.reload(); // Full page reload
// OR
// Refetch data in useEffect
```

---

## 💡 Tips

- **Test in incognito mode** to clear local storage
- **Use browser DevTools Network tab** to debug API calls
- **Check backend console** for server-side errors
- **Verify tokens** in browser DevTools → Application → Local Storage

---

## 📞 Support

For questions about API endpoints, see: `backend/README.md`
For questions about frontend setup, see: `package.json` scripts

---

**Your car rental system is now ready with real database integration! 🚀**
