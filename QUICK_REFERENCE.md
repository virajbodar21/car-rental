# 🚀 QUICK REFERENCE - Car Rental Backend

## 🟢 STATUS: RUNNING
- Backend: http://localhost:5005 ✅
- Frontend: http://localhost:5173 ✅
- Database: MongoDB ✅

---

## 👤 TEST ACCOUNTS
```
ADMIN:
  Email:    admin@carrental.com
  Password: admin123456

USERS:
  Email:    john@example.com
  Password: john123456
  
  Email:    jane@example.com
  Password: jane123456
  
  Email:    test@example.com
  Password: test123456
```

---

## 📡 MAIN ENDPOINTS

### Authentication
```
POST   /api/auth/register          - Create new account
POST   /api/auth/login             - Login & get token
GET    /api/auth/me                - Get profile (requires token)
PUT    /api/auth/profile           - Update profile (requires token)
```

### Cars
```
GET    /api/cars                   - Get all cars
GET    /api/cars/:id               - Get single car
POST   /api/cars                   - Create car (admin)
PUT    /api/cars/:id               - Update car (admin)
DELETE /api/cars/:id               - Delete car (admin)
```

### Bookings
```
POST   /api/bookings               - Create booking (user)
GET    /api/bookings/my-bookings   - Get my bookings (user)
GET    /api/bookings               - Get all bookings (admin)
GET    /api/bookings/:id           - Get single booking
PUT    /api/bookings/:id/status    - Update status (admin)
PUT    /api/bookings/:id/cancel    - Cancel booking
```

### Users & Admin
```
GET    /api/users                  - Get all users (admin)
GET    /api/users/stats/dashboard  - Get stats (admin)
GET    /api/users/:id              - Get user (admin)
PUT    /api/users/:id/role         - Update role (admin)
DELETE /api/users/:id              - Delete user (admin)
```

### Health Check
```
GET    /api/health                 - Server & database status
```

---

## 🔑 HOW TO USE TOKEN

### 1. Login to get token
```bash
curl -X POST http://localhost:5005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@carrental.com",
    "password": "admin123456"
  }'
```

### 2. Use token in protected routes
```bash
curl -X GET http://localhost:5005/api/auth/me \
  -H "Authorization: Bearer <YOUR_TOKEN_HERE>"
```

### 3. In Frontend (automatic)
The frontend automatically:
- Stores token in localStorage
- Sends it with every API call
- Refreshes on login/register

---

## 🗄️ DATA MODELS

### User (in MongoDB)
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_by_bcrypt",
  phone: "+1-555-1234",
  role: "user"|"admin",
  createdAt: "2024-01-01T10:00:00Z",
  updatedAt: "2024-01-01T10:00:00Z"
}
```

### Car (in MongoDB)
```javascript
{
  name: "Toyota Camry",
  type: "Sedan",
  pricePerDay: 50,
  fuelType: "Petrol",
  seats: 5,
  transmission: "Automatic",
  image: "https://...",
  description: "Reliable sedan",
  features: ["AC", "Bluetooth"],
  available: true,
  rating: 4.5,
  reviews: 120
}
```

### Booking (in MongoDB)
```javascript
{
  userId: "ObjectId",
  carId: "ObjectId",
  pickupDate: "2024-01-15T10:00:00Z",
  returnDate: "2024-01-20T10:00:00Z",
  pickupLocation: "New York",
  returnLocation: "New York",
  numberOfDays: 5,
  totalPrice: 250,
  status: "Pending"|"Approved"|"Cancelled"|"Completed",
  notes: "Optional notes"
}
```

---

## 🔐 SECURITY

### Password
- ✅ Hashed with bcryptjs (not stored as plain text)
- ✅ Cannot be reversed
- ✅ Verified on login using bcrypt.compare()

### Token
- ✅ JWT format: `Header.Payload.Signature`
- ✅ Expires in 7 days
- ✅ Sent in Authorization header
- ✅ Verified by middleware on protected routes

### Access Control
- ✅ Public routes: Anyone can access (/api/cars, /api/health)
- ✅ User routes: Need valid token (/api/auth/me, /api/bookings)
- ✅ Admin routes: Need token + admin role (/api/cars POST/PUT/DELETE)

---

## 🎯 QUICK START

### 1. Install Dependencies (if needed)
```bash
cd backend && npm install
cd .. && npm install
```

### 2. Seed Database with Test Data
```bash
cd backend
node seed.js
```

### 3. Start Backend
```bash
cd backend
npm start
# Runs on http://localhost:5005
```

### 4. Start Frontend
```bash
npm run dev
# Runs on http://localhost:5173
```

### 5. Test Login
- Go to http://localhost:5173
- Email: admin@carrental.com
- Password: admin123456

---

## 🆘 COMMON ISSUES

| Issue | Solution |
|-------|----------|
| Can't login | Run `node seed.js` to create test users |
| Port 5005 in use | Kill: `taskkill /F /IM node.exe` |
| MongoDB not connected | Check MongoDB is running, verify .env URI |
| Invalid token | Token expired (7 days). Login again |
| CORS error | Check Origin in server.js |

---

**READY TO USE!** 🚀
All data is stored in MongoDB. Use test accounts to explore.

### Step 3: Setup Frontend (New Terminal)
```bash
npm install
npm run dev
```

### Access Application
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000/api
```

---

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+1-555-0000"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@carrental.com",
    "password": "password"
  }'
```

### Get All Cars
```bash
curl http://localhost:5000/api/cars
```

### Get Cars by Type
```bash
curl "http://localhost:5000/api/cars?type=SUV"
```

### Get Cars by Price Range
```bash
curl "http://localhost:5000/api/cars?minPrice=50&maxPrice=150"
```

---

## 💾 Database Commands

### Reseed Database
```bash
cd backend
node seed.js
```

### Clear Database
```bash
# Stop backend first, then:
# Open MongoDB Compass and delete collections, OR:
mongosh
> use car-rental
> db.users.deleteMany({})
> db.cars.deleteMany({})
> db.bookings.deleteMany({})
```

### Query Database
```bash
mongosh
> use car-rental
> db.users.find()              # All users
> db.cars.find()               # All cars
> db.bookings.find()           # All bookings
> db.cars.find({type: "SUV"})  # Filter by type
```

---

## 🛠️ Development Commands

### Backend
```bash
cd backend

npm run dev      # Start dev server with auto-reload
npm start        # Start production server
npm run build    # Build for production
```

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🔐 Default Test Accounts

After running `seed.js`:

| Email | Password | Role | Use |
|-------|----------|------|-----|
| admin@carrental.com | password | admin | Admin dashboard |
| john@example.com | password | user | Book cars |
| jane@example.com | password | user | Book cars |

Password for all test accounts: `password`

---

## 📋 Common Tasks

### Create New Admin User
```bash
cd backend
mongosh
> use car-rental
> db.users.insertOne({
    name: "New Admin",
    email: "newadmin@example.com",
    password: "hashed_password_here",
    phone: "+1-555-0000",
    role: "admin"
  })
```

### Add New Car (via API)
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "New Car",
    "type": "SUV",
    "pricePerDay": 100,
    "fuelType": "Petrol",
    "seats": 5,
    "transmission": "Automatic",
    "image": "https://example.com/car.jpg",
    "features": ["AC", "GPS"]
  }'
```

### Create Booking (as User)
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

---

## 🐛 Debugging & Troubleshooting

### Check Backend Logs
```bash
# Terminal where backend is running
# Look for errors or status messages
```

### Check Frontend Console
```bash
# Browser: F12 or Right Click → Inspect → Console
# Look for error messages and network requests
```

### Check MongoDB Connection
```bash
mongosh
> db.adminCommand("ping")
# Should return: { ok: 1 }
```

### View Network Requests
```bash
# Browser DevTools → Network tab
# Click requests to see headers and response
```

### Clear Browser Cache
```bash
# Browser: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
# Then clear cookies and cached data
```

---

## 🔑 Environment Variables

### Frontend (.env not needed - uses hardcoded API URL)
```
API_URL defaults to: http://localhost:5000/api
```

### Backend (.env file required)
```
MONGODB_URI=connection string
JWT_SECRET=secret key
JWT_EXPIRE=expiration time
PORT=5000
NODE_ENV=development
```

---

## 📦 Port Management

### Check Port 5000 (Backend)
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Check Port 5173 (Frontend)
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5173
kill -9 <PID>
```

---

## 📚 Useful Files

| File | Purpose | Open With |
|------|---------|-----------|
| `SETUP_GUIDE.md` | Full setup instructions | Text editor |
| `IMPLEMENTATION_SUMMARY.md` | What was created | Text editor |
| `PROJECT_STRUCTURE.md` | Folder structure | Text editor |
| `backend/README.md` | API documentation | Browser/Editor |
| `backend/.env.example` | Env template | Text editor |

---

## 🔗 Useful Links

- MongoDB: https://www.mongodb.com/
- Express: https://expressjs.com/
- React: https://react.dev/
- Vite: https://vitejs.dev/
- Tailwind: https://tailwindcss.com/

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] MongoDB database seeded
- [ ] Can login with admin@carrental.com / password
- [ ] Can see cars on Cars page
- [ ] Can register new user
- [ ] Can create booking

---

## 💡 Pro Tips

1. **Keep terminals separate**
   - One terminal for backend
   - Another terminal for frontend
   - Both running simultaneously

2. **Use browser DevTools**
   - Monitor network requests
   - Check token in localStorage
   - View API responses

3. **MongoDB Compass** (GUI tool)
   - Visual database browser
   - Easy data management
   - Great for debugging

4. **Postman** (API testing)
   - Test endpoints
   - Save requests
   - Check responses

5. **VS Code Extensions**
   - MongoDB for VS Code
   - REST Client
   - Thunder Client

---

## 🎯 Next Steps

1. ✅ Follow quick start guide
2. ✅ Test with default accounts
3. ✅ Create new user account
4. ✅ Create booking
5. ✅ Login as admin and check dashboard

---

**Happy coding! 🚀**
