# 🚕 Taxi Bhai — Taxi Management System

A full-stack web application for managing taxi services with four distinct user roles: **Admin**, **Owner**, **Driver**, and **Passenger**. Built with React on the frontend and Node.js + Express + MongoDB on the backend, with Firebase handling authentication.

---

## Table of Contents

- [Features by Role](#features-by-role)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [All Routes](#all-routes)
- [API Endpoints](#api-endpoints)
- [First Time Usage Guide](#first-time-usage-guide)
- [Common Errors & Fixes](#common-errors--fixes)

---

## Features by Role

### 🔴 Admin
- View all taxi service requests submitted by owners → Accept or Reject
- View all driving applications submitted by drivers → Accept or Reject

### 🟢 Owner
- Submit a taxi service registration (business name, transport type, route, fare rate, BRTA licence, photo)
- View the approval status of submitted service requests
- Withdraw (delete) a pending service request
- Assign an approved driver to a vehicle
- View vehicle status reports submitted by drivers

### 🔵 Driver
- Apply to drive under a specific owner (submits NID, driving licence, owner email)
- Check the status of the driving application
- Accept or reject incoming ride requests from passengers
- Submit vehicle condition/status updates to the owner
- View payment records from completed rides

### 🟡 Passenger
- Browse all available rides (driver name, route, fare in BDT, BRTA number, vehicle photo)
- Book a ride from the available list
- Track booking status (pending / accepted / rejected by driver)
- Cancel a pending booking
- Make payment for an accepted ride (submits transaction ID)

---

## Tech Stack

### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI framework |
| react-dom | ^18.2.0 | DOM rendering |
| react-router-dom | ^6.22.1 | Client-side routing |
| @tanstack/react-query | ^5.22.2 | Server state and data fetching |
| axios | ^1.6.7 | HTTP requests to backend |
| firebase | ^10.8.0 | Authentication (email/password + Google) |
| formik | ^2.4.5 | Form handling and validation |
| sweetalert2 | ^11.10.5 | Alert popups |
| react-helmet-async | ^2.0.4 | Dynamic page titles |
| react-icons | ^5.0.1 | Icons |
| tailwindcss | ^3.4.1 | Utility-first CSS |
| daisyui | ^4.7.2 | Tailwind UI components |
| vite | ^5.1.0 | Build tool and dev server |

### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | REST API server |
| mongodb | ^6.3.0 | MongoDB driver for Atlas |
| cors | ^2.8.5 | Cross-origin request handling |
| nodemon | ^3.1.0 | Auto-restart on file changes |
| dotenv | — | Environment variable management (must install separately) |

---

## Project Structure

```
TaxiBhai_Frontend/
├── Authentication/
│   ├── Login.jsx               # Email/password + Google login
│   └── Registration.jsx        # Registration with role selection
├── Context/
│   └── TaxiContext.jsx         # Firebase auth context
├── Dashboard/
│   ├── Dashboard.jsx           # Sidebar layout, role-based nav
│   ├── Admin/
│   │   ├── AdminServiceRequest.jsx     # Accept/reject owner requests
│   │   └── AdminDrivingRequest.jsx     # Accept/reject driver applications
│   ├── Owner/
│   │   ├── OwnerServiceRequest.jsx     # Submit taxi service request
│   │   ├── AssignDrivers.jsx           # Assign driver to vehicle
│   │   ├── ServiceStatus.jsx           # View request approval status
│   │   └── VehicleStatusFromDriver.jsx # View driver's vehicle reports
│   ├── Driver/
│   │   ├── DrivingRequest.jsx          # Apply to an owner
│   │   ├── DrivingStatus.jsx           # Check application status
│   │   ├── UpdateVehicleStatus.jsx     # View rides and update vehicle
│   │   ├── UpdateVehicleForm.jsx       # Vehicle status update form
│   │   ├── DriverRide.jsx              # Accept/reject passenger bookings
│   │   └── DriverPayment.jsx           # View payment history
│   └── Passenger/
│       ├── PassengerRide.jsx           # View/cancel bookings
│       └── Payment.jsx                 # Submit payment transaction ID
├── Home/
│   ├── Home.jsx                # Landing page composition
│   ├── Bannar.jsx              # Hero banner/carousel
│   ├── BusinessPlan.jsx        # Business plan section
│   ├── About.jsx               # About section
│   └── EndPart.jsx             # Footer
├── Hooks/
│   ├── UseAdmin.jsx            # Check if current user is admin
│   ├── UseOwner.jsx            # Check if current user is owner
│   ├── UseDriver.jsx           # Check if current user is driver
│   ├── usePassenger.jsx        # Check if current user is passenger
│   └── usePublicUrl.jsx        # Axios instance (baseURL: localhost:5000)
├── NavBar/
│   └── NavBar.jsx
├── Ride/
│   └── Ride.jsx                # Public ride browsing + booking
├── Router/
│   ├── Router.jsx              # All app routes
│   └── PrivateRoutes.jsx       # Auth guard
├── Error/
│   └── Error.jsx               # 404 page
├── firebase.config.js          # Firebase project config
├── App.jsx / App.css
├── main.jsx                    # React entry point
├── index.html
├── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .gitignore

TaxiBhai_Backend/
├── index.js                    # Express server + all API routes
└── package.json
```

---

## Prerequisites

Make sure the following are installed:

| Tool | Version | Check command |
|------|---------|---------------|
| Node.js | v18+ | `node --version` |
| npm | v9+ | `npm --version` |

You also need:
- A **Firebase** project — [console.firebase.google.com](https://console.firebase.google.com)
- A **MongoDB Atlas** account — [mongodb.com/atlas](https://www.mongodb.com/atlas)

---

## Backend Setup

### Step 1 — Navigate to backend folder

```powershell
cd TaxiBhai_Backend
```

### Step 2 — Install dependencies

```powershell
npm i
```

Then install `dotenv` separately (it is not in `package.json` but is required):

```powershell
npm install dotenv
```

### Step 3 — Create a `.env` file

Create a new file named `.env` in the `TaxiBhai_Backend` folder:

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

**How to get your MongoDB URI:**
1. Log in to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Click your cluster → **Connect** → **Drivers**
3. Copy the connection string — it looks like:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
4. Replace `<username>` and `<password>` with your Atlas credentials
5. Paste it as the value of `MONGODB_URI`

### Step 4 — Update `index.js` to use the `.env` file

Open `index.js` and make these two changes:

**At the very top of the file, add:**
```js
require('dotenv').config();
```

**Replace the hardcoded URI line:**
```js
// REMOVE this line:
const uri = "mongodb+srv://mithilamun101:ngWkRMvZHiKBkuzb@cluster1...";

// REPLACE with:
const uri = process.env.MONGODB_URI;
```

### Step 5 — Add a `dev` script to `package.json`

Open `package.json` and update the `scripts` section:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### Step 6 — Also create a `.gitignore` in the backend folder

Create a file named `.gitignore` in `TaxiBhai_Backend`:

```
node_modules/
.env
```

### Step 7 — Start the backend

```powershell
nodemon index.js
```

You should see:
```
Taxi Management is running at 5000
Pinged your deployment. You successfully connected to MongoDB!
```

Backend is running at: **`http://localhost:5000`**

---

## Frontend Setup

### Step 1 — Navigate to frontend folder

```powershell
cd TaxiBhai_Frontend
```

### Step 2 — Fix the `src/` folder structure

> ⚠️ This step is required. `index.html` references `/src/main.jsx` and `tailwind.config.js` scans `./src/**/*`, but all source files are currently at the root level — not inside a `src/` folder. The app will not run without fixing this.

Run these commands in PowerShell from inside the `TaxiBhai_Frontend` folder:

```powershell
# Create src folder
mkdir src

# Move all source files into src/
Move-Item App.jsx, App.css, main.jsx, index.css, firebase.config.js, Authentication, Context, Dashboard, Error, Home, Hooks, NavBar, Ride, Router, assets -Destination src\
```

After this, your structure should look like:

```
TaxiBhai_Frontend/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── firebase.config.js
│   ├── Authentication/
│   ├── Context/
│   ├── Dashboard/
│   └── ...
├── index.html          ← already points to /src/main.jsx ✅
├── tailwind.config.js  ← already scans ./src/**/* ✅
├── package.json
└── vite.config.js
```

### Step 3 — Set up Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project → **Add web app** → Register
3. Copy your Firebase config object
4. Open `src/firebase.config.js` and replace the existing config values with yours:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

5. In Firebase Console → **Authentication** → **Sign-in method**, enable:
   - ✅ Email/Password
   - ✅ Google

### Step 4 — Install dependencies

```powershell
npm i
```

### Step 5 — Verify backend URL

Open `src/Hooks/usePublicUrl.jsx` and confirm:

```js
const instance = axios.create({
    baseURL: "http://localhost:5000"   // ✅ must match backend port
})
```

### Step 6 — Start the frontend

```powershell
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

Open **`http://localhost:5173`** in your browser.

---

## Running the Project

Open **two separate PowerShell windows** and run both simultaneously:

**PowerShell Window 1 — Backend:**
```powershell
cd TaxiBhai_Backend
nodemon index.js
```

**PowerShell Window 2 — Frontend:**
```powershell
cd TaxiBhai_Frontend
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |

---

## All Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Home (landing page) | Public |
| `/login` | Login | Public |
| `/reg` | Registration | Public |
| `/ride` | Browse available rides | Logged in |
| `/dashboard/owner/businessReq` | Submit service request | Owner |
| `/dashboard/owner/serviceStatus` | View service request status | Owner |
| `/dashboard/owner/assignDrivers` | Assign drivers to vehicles | Owner |
| `/dashboard/owner/vehicleStatus` | View vehicle status from drivers | Owner |
| `/dashboard/admin/serviceReq` | Manage owner service requests | Admin |
| `/dashboard/admin/driverReq` | Manage driver applications | Admin |
| `/dashboard/driver/drivingReq` | Apply to drive under an owner | Driver |
| `/dashboard/driver/drivingStatus` | Check application status | Driver |
| `/dashboard/driver/ride` | View & respond to ride requests | Driver |
| `/dashboard/driver/UpdateVehicleStatus` | Update vehicle status | Driver |
| `/dashboard/driver/payment` | View payment history | Driver |
| `/dashboard/passenger/ride` | View & cancel bookings | Passenger |
| `/dashboard/passenger/payment/:id/:amount/:driverEmail/:ownerEmail` | Make payment | Passenger |

---

## API Endpoints

### Users & Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/registerUser` | Register new user, save to MongoDB |
| GET | `/user/owner/:email` | Check if user has `owner` role |
| GET | `/user/admin/:email` | Check if user has `admin` role + security key |
| GET | `/user/driver/:email` | Check if user has `driver` role |
| GET | `/user/passenger/:email` | Check if user has `passenger` role |

### Owner
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/owner/serviceRequest` | Submit taxi service registration |
| GET | `/owner/serviceReqStatus/:email` | Get owner's own service requests |
| DELETE | `/owner/withdrowRequest/:id` | Withdraw (delete) a service request |
| POST | `/owner/assignDriver` | Assign a driver to a vehicle |
| GET | `/owner/vehicleStatus/:email` | Get vehicle status reports from drivers |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/serviceReq` | Get all owner service requests |
| GET | `/drivingReq` | Get all driver applications |
| PATCH | `/admin/acceptRequest/:id` | Accept a service request |
| PATCH | `/admin/rejectRequest/:id` | Reject a service request |
| PATCH | `/admin/acceptDrivingRequest/:id` | Accept a driving application |
| PATCH | `/admin/rejectDrivingRequest/:id` | Reject a driving application |

### Driver
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/driver/drivingReq` | Submit driving application |
| GET | `/driver/driveReqStatus/:email` | Get own driving application status |
| GET | `/driverRide/getInfo/:userEmail` | Get incoming ride requests |
| PATCH | `/driver/acceptRide/:dt` | Accept a passenger ride |
| PATCH | `/driver/cancelRide/:dt` | Reject a passenger ride |
| POST | `/driver/vehicleStatus` | Submit vehicle status update |
| GET | `/driverPayment/:email` | Get payment history (aggregated) |

### Passenger & Rides
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/showService` | Get all available rides (aggregated from 3 collections) |
| POST | `/ride` | Book a ride |
| GET | `/passengerRide/getInfo/:userEmail` | Get passenger's own bookings |
| PATCH | `/passenger/cancelRide/:brta` | Cancel a ride booking |
| POST | `/passenger/makePayment` | Submit payment transaction ID |

---

## First Time Usage Guide

### Step 1 — Register accounts

Go to `http://localhost:5173/reg` and register four accounts with these roles (type exactly in the role field):

| Role field value | Dashboard access |
|-----------------|-----------------|
| `owner` | Owner dashboard |
| `driver` | Driver dashboard |
| `passenger` | Passenger dashboard |
| `admin` | Admin dashboard (needs extra step below) |

**Registration fields:**
- Name, Email, Password (min 6 chars, must include uppercase, lowercase, number, special character)
- Role (type one of the values above)
- Phone number (start with +88 for Bangladesh)
- Photo — paste a hosted image URL (e.g. from [imgbb.com](https://imgbb.com))
- Location — your district name (e.g. Dhaka)

### Step 2 — Activate the Admin account

After registering with `role: admin`, you must manually add a security field in MongoDB:

1. Log in to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Go to **Browse Collections** → `taxiManagement` → `users`
3. Find your admin user document → click **Edit**
4. Add a new field:
   - Field: `security`
   - Value: `adminTrueForTaxiManagement`
5. Save

The admin dashboard will now be accessible.

### Step 3 — Full workflow

```
Owner registers → submits service request at /dashboard/owner/businessReq
       ↓
Admin logs in → approves at /dashboard/admin/serviceReq
       ↓
Driver registers → applies at /dashboard/driver/drivingReq (enters owner's email)
       ↓
Admin approves driver at /dashboard/admin/driverReq
       ↓
Owner assigns driver at /dashboard/owner/assignDrivers
       ↓
Passenger registers → browses rides at /ride → books a ride
       ↓
Driver accepts at /dashboard/driver/ride
       ↓
Passenger pays at /dashboard/passenger/ride → Payment page
       ↓
Driver views payment at /dashboard/driver/payment
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| Blank white page | `index.html` points to `/src/main.jsx` but files are at root | Complete Frontend Step 2 (move files into `src/`) |
| `Cannot GET /any-route` | Backend not running | Start backend with `nodemon index.js` |
| `Network Error` or CORS error | Backend not running or wrong port | Make sure backend is on port 5000 |
| `MongoServerError` or connection refused | Wrong MongoDB URI or IP not whitelisted | In Atlas → **Network Access** → Add `0.0.0.0/0` |
| `auth/operation-not-allowed` | Email/Google sign-in not enabled in Firebase | Enable in Firebase Console → Authentication → Sign-in method |
| `auth/invalid-api-key` | Wrong Firebase config | Replace `src/firebase.config.js` with your own project's config |
| Styles not loading / unstyled page | `tailwind.config.js` scans `./src/**/*` but files at root | Complete Frontend Step 2 |
| Admin dashboard not accessible | Missing `security` field in MongoDB | Complete First Time Usage Step 2 |
| `nodemon: command not found` | nodemon not globally installed | Run `npm install -g nodemon` |
