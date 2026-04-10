# MongoDB Setup Guide

## Two Options for MongoDB

You have two choices for running MongoDB:

1. **Local MongoDB** (on your computer)
2. **MongoDB Atlas** (cloud-based, recommended for beginners)

---

## Option 1: Local MongoDB Installation

### Windows
1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. MongoDB Server should install as a service

#### Start MongoDB on Windows
```bash
# If installed as service (automatic)
# MongoDB likely already running

# Or manually start:
mongod
```

### Mac (Using Homebrew)
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Stop MongoDB
brew services stop mongodb-community
```

### Linux (Ubuntu/Debian)
```bash
# Add MongoDB repository
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable auto-startup
sudo systemctl enable mongod
```

### Verify Local Installation
```bash
# Open terminal/command prompt and run:
mongosh

# You should see:
# test>

# Type: exit
# to close
```

### Connection String for Local MongoDB
```
MONGODB_URI=mongodb://localhost:27017/car-rental
```

---

## Option 2: MongoDB Atlas (Cloud) - RECOMMENDED FOR BEGINNERS

### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account with email

### Step 2: Create Cluster
1. Click "Create" button
2. Select "Free" tier (M0 - 512MB storage)
3. Choose your region (closest to you)
4. Click "Create Cluster"
5. Wait 2-3 minutes for cluster to be created

### Step 3: Create Database User
1. In left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Create username and password (remember these!)
4. Click "Add User"

Example:
```
Username: carrentaluser
Password: SecurePassword123!
```

### Step 4: Whitelist Your IP
1. In left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. In left sidebar, click "Databases"
2. Click "Connect" button on your cluster
3. Select "Drivers"
4. Copy the connection string
5. Replace: `<username>`, `<password>`, `<password>` with your actual credentials

Example:
```
mongodb+srv://carrentaluser:SecurePassword123!@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 6: Configure in Backend
1. Open `backend/.env`
2. Paste the connection string:
```
MONGODB_URI=mongodb+srv://carrentaluser:SecurePassword123!@cluster0.xxxxx.mongodb.net/car-rental?retryWrites=true&w=majority
```

Note: Make sure to:
- Replace username with your username
- Replace password with your password
- Keep the rest of the string as is
- Make sure IP is whitelisted

---

## Comparison: Local vs Cloud

| Feature | Local MongoDB | MongoDB Atlas |
|---------|---------------|---------------|
| Installation | Download & Install | Web signup |
| Setup Time | 10 minutes | 5 minutes |
| Performance | Faster locally | Slightly slower (network) |
| Storage | Limited by disk | 512MB free tier |
| Backup | Manual | Automatic |
| Maintenance | You manage | MongoDB manages |
| Best For | Development | Beginners/Cloud |

---

## Your `.env` File

After choosing an option, your `backend/.env` should look like:

### For Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/car-rental
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

### For MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://carrentaluser:YourPassword@cluster0.xxxxx.mongodb.net/car-rental?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

---

## Testing Your Connection

### Terminal Test
```bash
# For local MongoDB
mongosh

# For MongoDB Atlas (if mongosh installed)
mongosh "mongodb+srv://username:password@cluster.mongodb.net/car-rental"
```

### Via Backend
```bash
# Go to backend folder
cd backend

# Start server
npm run dev

# Check console output
# You should see: ✅ MongoDB connected
```

---

## Issues & Solutions

### Local MongoDB Error: "Command 'mongod' not found"
**Solution:** MongoDB not in PATH
- Windows: Reinstall and select "Install as Service"
- Mac: Use `brew install mongodb-community`
- Linux: Follow installation steps above

### Atlas Connection Error: "getaddrinfo ENOTFOUND"
**Solution:** IP not whitelisted
1. Go to MongoDB Atlas
2. Click "Network Access"
3. Make sure 0.0.0.0/0 is in the list

### Atlas Connection Error: "Invalid username or password"
**Solution:** Credentials wrong in connection string
1. Verify username in Database Access section
2. Verify you used correct password
3. Check no special characters causing issues

### "Too many connections"
**Solution:** Connection pool exhausted
- Increase `maxPoolSize` in connection string
- Close unused connections
- Restart backend

---

## Development Tips

### Use MongoDB Compass (GUI)
Download: https://www.mongodb.com/products/compass

1. Install Compass
2. Connect with your connection string
3. Browse databases and collections visually
4. View documents easily
5. Helpful for debugging

### Connect Local MongoDB to Compass
```
New Connection
Connection String: mongodb://localhost:27017
```

### Connect Atlas to Compass
```
Copy connection string from MongoDB Atlas
Paste into Compass "New Connection"
Compass auto-fills the rest
```

---

## Common Connection Strings

### Local MongoDB (Standard)
```
mongodb://localhost:27017/car-rental
```

### Local MongoDB (With Authentication)
```
mongodb://username:password@localhost:27017/car-rental
```

### MongoDB Atlas (Standard)
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/car-rental?retryWrites=true&w=majority
```

### Local MongoDB (Docker)
```
mongodb://mongo:27017/car-rental
```

---

## Recommended Setup for Beginners

1. Use **MongoDB Atlas** (cloud)
   - No installation needed
   - Free tier is plenty
   - Automatic backups
   - Easy to scale later

2. Use **MongoDB Compass**
   - Visual database browser
   - Easy to debug
   - See data in real-time

3. Connection string from Atlas
   - Copy directly from MongoDB
   - Paste into `.env`
   - Should work immediately

---

## Troubleshooting Checklist

- [ ] MongoDB is running (check service)
- [ ] Connection string is correct
- [ ] Database user credentials are correct
- [ ] .env file is in backend folder
- [ ] IP is whitelisted (if using Atlas)
- [ ] No typos in connection string
- [ ] Backend can connect (check console)
- [ ] Created test user successfully

---

## Free Resources

- MongoDB Tutorial: https://docs.mongodb.com/manual/
- MongoDB YouTube: https://www.youtube.com/c/MongoDB
- MongoDB University: https://learn.mongodb.com/ (free courses)

---

## Next Steps

1. Choose MongoDB option (local or Atlas)
2. Set up connection
3. Update `.env` file
4. Run `node seed.js` to populate database
5. Start backend: `npm run dev`

---

**MongoDB is now ready! Continue with SETUP_GUIDE.md** 🎉
