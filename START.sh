#!/bin/bash

# Car Rental System - Quick Start Script for Mac/Linux

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║   🚗 Car Rental System - Quick Start                  ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check if MongoDB is running
echo "[1/4] Checking MongoDB connection..."
mongosh --eval "db.version()" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "⚠️  MongoDB is not running!"
    echo "Please start MongoDB:"
    echo "  - Run: brew services start mongodb-community"
    echo "  - Or use MongoDB Atlas cloud connection"
    echo ""
    read -p "Press Enter to continue..."
    exit 1
fi
echo "✅ MongoDB is connected"
echo ""

# Setup Backend
echo "[2/4] Setting up backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env created - verify your MongoDB URI"
fi

# Seed database
echo ""
echo "[3/4] Seeding database..."
node seed.js
echo "✅ Database seeded"

# Start backend
echo ""
echo "[4/4] Starting backend server..."
npm run dev &
BACKEND_PID=$!

cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo ""
echo "Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║   ✅ System is running!                               ║"
echo "║                                                        ║"
echo "║   🌐 Frontend: http://localhost:5173                 ║"
echo "║   🔧 Backend:  http://localhost:5000/api             ║"
echo "║                                                        ║"
echo "║   📝 Login with:                                      ║"
echo "║      Email: admin@carrental.com                       ║"
echo "║      Pass:  password                                  ║"
echo "║                                                        ║"
echo "║   Press Ctrl+C to stop                                ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Wait for processes
wait
