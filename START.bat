@echo off
REM Car Rental System - Quick Start Script for Windows

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   🚗 Car Rental System - Quick Start                  ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if MongoDB is running
echo [1/4] Checking MongoDB connection...
mongosh --eval "db.version()" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  MongoDB is not running!
    echo Please start MongoDB:
    echo   - Windows: Open MongoDB Compass or run 'mongod' in a terminal
    echo   - Or use MongoDB Atlas cloud connection
    echo.
    pause
    exit /b
)
echo ✅ MongoDB is connected

REM Setup Backend
echo.
echo [2/4] Setting up backend...
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

REM Check if .env exists
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo ✅ .env created - verify your MongoDB URI
)

REM Seed database
echo.
echo [3/4] Seeding database...
call node seed.js
echo ✅ Database seeded

REM Start backend in new terminal
echo.
echo [4/4] Starting backend server...
start cmd /k "npm run dev"
cd ..

REM Start frontend
echo.
echo Starting frontend server...
call npm run dev

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   ✅ System is running!                               ║
echo ║                                                        ║
echo ║   🌐 Frontend: http://localhost:5173                 ║
echo ║   🔧 Backend:  http://localhost:5000/api             ║
echo ║                                                        ║
echo ║   📝 Login with:                                      ║
echo ║      Email: admin@carrental.com                       ║
echo ║      Pass:  password                                  ║
echo ╚════════════════════════════════════════════════════════╝
echo.
