# Car Rental Management System

A complete frontend application for car rental management built with React, TypeScript, and Vite.

## Features

### User Features
- **Browse Cars**: View available cars with filtering by type and search
- **Car Details**: Detailed view of cars with specifications and booking option
- **Booking System**: Date picker for pickup/return dates with validation
- **User Authentication**: Login/Register with form validation
- **Profile Management**: View and edit user profile
- **Booking History**: View past and current bookings
- **Contact Form**: Send messages with validation

### Admin Features
- **Dashboard**: Overview with key metrics and charts
- **Manage Cars**: Add, edit, delete cars
- **Manage Bookings**: Approve/reject bookings, view all bookings
- **Manage Users**: View all registered users
- **Reports & Analytics**: Revenue charts, booking statistics, car popularity

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router DOM** for routing
- **Bootstrap** for styling
- **React Hook Form** with Yup for form validation
- **Recharts** for admin analytics
- **React DatePicker** for booking dates
- **Swiper** (available for carousels)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── CarCard.tsx     # Car display card
│   └── AdminLayout.tsx # Admin sidebar layout
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # User login
│   ├── Register.tsx    # User registration
│   ├── Cars.tsx        # Car listing with filters
│   ├── CarDetails.tsx  # Individual car details
│   ├── Booking.tsx     # Booking form
│   ├── MyBookings.tsx  # User booking history
│   ├── Profile.tsx     # User profile
│   ├── Contact.tsx     # Contact form
│   ├── About.tsx       # About page
│   └── admin/          # Admin pages
│       ├── AdminDashboard.tsx
│       ├── ManageCars.tsx
│       ├── ManageBookings.tsx
│       ├── ManageUsers.tsx
│       └── Reports.tsx
├── context/            # React context
│   └── AuthContext.tsx # Authentication state
├── styles/             # Stylesheets
│   └── main.css       # Main styles with Bootstrap
├── types.ts           # TypeScript type definitions
├── data.ts            # Dummy data
└── App.tsx            # Main app component
```

## Demo Credentials

### Admin Login
- Email: `admin@carrental.com`
- Password: `password`

### User Login
- Email: `john@example.com`
- Password: `password`

## Key Features Implemented

- ✅ Responsive design (mobile + desktop)
- ✅ Form validation with error messages
- ✅ Role-based routing (Admin/User)
- ✅ Protected routes
- ✅ Loading states and error handling
- ✅ Modern UI with Bootstrap
- ✅ TypeScript for type safety
- ✅ Date picker for bookings
- ✅ Admin analytics with charts
- ✅ Car filtering and search
- ✅ Password show/hide toggle
- ✅ Status badges for bookings

## Notes

- This is a frontend-only application with mock data
- Authentication is simulated (no real backend)
- All data is stored in memory and resets on page refresh
- For production use, integrate with a backend API
