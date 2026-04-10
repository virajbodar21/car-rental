# Car Rental Backend API

Complete backend API for the Car Rental management system built with Node.js, Express, and MongoDB.

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (locally or MongoDB Atlas)
- npm or yarn

## 🚀 Installation

### 1. Clone the project
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the backend folder (copy from `.env.example`):
```env
MONGODB_URI=mongodb://localhost:27017/car-rental
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental
```

### 4. Seed the database (optional)
```bash
node seed.js
```

This will create:
- Admin user: `admin@carrental.com` / `password`
- 2 regular users
- 10 sample cars
- 2 sample bookings

## 🏃 Running the Server

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
```

---

## 🔐 Authentication Endpoints

### Register New User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1-555-0001"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0001",
    "role": "user"
  }
}
```

### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0001",
    "role": "user"
  }
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer jwt_token_here
```

### Update User Profile
```
PUT /auth/profile
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+1-555-9999"
}
```

---

## 🚗 Cars Endpoints

### Get All Cars (with filters)
```
GET /cars?type=SUV&fuelType=Petrol&minPrice=50&maxPrice=200&search=Toyota
```

**Query Parameters:**
- `type`: SUV, Sedan, Hatchback, Luxury
- `fuelType`: Petrol, Diesel, Electric
- `transmission`: Manual, Automatic
- `minPrice`: Minimum price per day
- `maxPrice`: Maximum price per day
- `search`: Search by car name
- `available`: true/false

**Response (200):**
```json
{
  "count": 5,
  "cars": [
    {
      "_id": "car_id",
      "name": "Toyota Camry",
      "type": "Sedan",
      "pricePerDay": 50,
      "fuelType": "Petrol",
      "seats": 5,
      "transmission": "Automatic",
      "image": "url",
      "available": true,
      "features": ["AC", "Bluetooth"],
      "rating": 4.5,
      "reviews": 120
    }
  ]
}
```

### Get Single Car
```
GET /cars/:id
```

### Create Car (Admin only)
```
POST /cars
Authorization: Bearer admin_jwt_token
Content-Type: application/json

{
  "name": "Honda CR-V",
  "type": "SUV",
  "pricePerDay": 75,
  "fuelType": "Petrol",
  "seats": 7,
  "transmission": "Automatic",
  "image": "https://...",
  "description": "Spacious SUV",
  "features": ["4WD", "Sunroof"]
}
```

### Update Car (Admin only)
```
PUT /cars/:id
Authorization: Bearer admin_jwt_token
Content-Type: application/json

{
  "pricePerDay": 80,
  "available": false
}
```

### Delete Car (Admin only)
```
DELETE /cars/:id
Authorization: Bearer admin_jwt_token
```

---

## 📅 Bookings Endpoints

### Create Booking
```
POST /bookings
Authorization: Bearer user_jwt_token
Content-Type: application/json

{
  "carId": "car_id",
  "pickupDate": "2024-04-20T10:00:00Z",
  "returnDate": "2024-04-27T10:00:00Z",
  "pickupLocation": "New York",
  "returnLocation": "New York",
  "notes": "Extra insurance needed"
}
```

**Response (201):**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "_id": "booking_id",
    "userId": "user_id",
    "carId": "car_id",
    "pickupDate": "2024-04-20T10:00:00Z",
    "returnDate": "2024-04-27T10:00:00Z",
    "numberOfDays": 7,
    "totalPrice": 350,
    "status": "Pending",
    "createdAt": "2024-04-06T..."
  }
}
```

### Get My Bookings
```
GET /bookings/my-bookings
Authorization: Bearer user_jwt_token
```

### Get All Bookings (Admin only)
```
GET /bookings?status=Pending
Authorization: Bearer admin_jwt_token
```

**Query Parameters:**
- `status`: Pending, Approved, Cancelled, Completed

### Get Single Booking
```
GET /bookings/:id
Authorization: Bearer jwt_token
```

### Update Booking Status (Admin only)
```
PUT /bookings/:id/status
Authorization: Bearer admin_jwt_token
Content-Type: application/json

{
  "status": "Approved"
}
```

**Valid statuses:** Pending, Approved, Cancelled, Completed

### Cancel Booking
```
PUT /bookings/:id/cancel
Authorization: Bearer user_jwt_token
```

---

## 👥 Users Endpoints (Admin only)

### Get All Users
```
GET /users
Authorization: Bearer admin_jwt_token
```

### Get User Statistics
```
GET /users/stats/dashboard
Authorization: Bearer admin_jwt_token
```

**Response (200):**
```json
{
  "users": {
    "total": 15,
    "admin": 2,
    "regular": 13
  },
  "bookings": {
    "total": 45,
    "pending": 12,
    "approved": 28,
    "cancelled": 5
  },
  "revenue": 12500
}
```

### Get Single User
```
GET /users/:id
Authorization: Bearer admin_jwt_token
```

### Update User Role
```
PUT /users/:id/role
Authorization: Bearer admin_jwt_token
Content-Type: application/json

{
  "role": "admin"
}
```

### Delete User
```
DELETE /users/:id
Authorization: Bearer admin_jwt_token
```

---

## 🔑 Authentication

Most endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer your_jwt_token_here
```

Tokens are obtained by:
1. **Register** - New user gets token on signup
2. **Login** - Existing user gets token on login

Tokens expire in 7 days by default.

---

## 📦 Project Structure

```
backend/
├── models/
│   ├── User.js          # User schema
│   ├── Car.js           # Car schema
│   └── Booking.js       # Booking schema
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── cars.js          # Car management endpoints
│   ├── bookings.js      # Booking endpoints
│   └── users.js         # User management endpoints
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── server.js            # Express server setup
├── seed.js              # Database seeding script
├── package.json
├── .env.example
└── README.md
```

---

## 🛡️ Security Features

- ✅ JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (RBAC)
- ✅ CORS protection
- ✅ Input validation with Mongoose schemas
- ✅ MongoDB connection security
- ✅ Error handling and logging

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or MongoDB Atlas URI is correct
- Check credentials in `.env` file
- Verify network access for MongoDB Atlas

### JWT Token Errors
- Token may have expired (7 days)
- Re-login to get a new token
- Ensure token is included in `Authorization` header

### CORS Errors
- Ensure frontend is running on `http://localhost:5173`
- Check `server.js` for correct CORS origin

---

## 📝 License

ISC

---

## 📞 Support

For API issues or questions, refer to the error messages returned by the API endpoints.
