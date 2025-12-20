---

# 📚 BookXchange – Premium Online Book Exchange Platform

## 🔹 Overview

**BookXchange** is a complete full-stack book exchange platform where users can exchange books (book-to-book or book + cash), communicate in real time, manage shipments, and receive notifications.
The system features a **Premium Dark Themed UI**, robust backend authentication, role-based admin moderation, real-time chat, reporting, and exchange lifecycle management.

This project is designed as a **state-driven system**, not a basic CRUD app.

---

## 🔹 Tech Stack

### Frontend
*   **React.js** (Vite)
*   **Tailwind CSS** (Styling)
*   **Framer Motion** (Animations)
*   **Axios** (API Communication)

### Backend
*   **Node.js**
*   **Express.js**
*   **MongoDB + Mongoose**
*   **JWT Authentication**
*   **Socket.io** (Realtime chat & notifications)
*   **Cloudinary** (Image uploads)
*   **Nodemailer** (Email services)

---

## 🔹 Core Features

### 🎨 UI/UX
*   **Premium Dark Theme**: Black glassmorphism design with gradient accents.
*   **Responsive Design**: Fully mobile-optimized layouts.
*   **Animations**: Smooth page transitions and hover effects.

### 🔐 Authentication & Security
*   User registration & login (Instant access)
*   Forgot & reset password
*   JWT-based authentication
*   Role-based authorization (User / Admin)
*   Global ban enforcement

### 👤 User & Dashboard
*   **Real-time Dashboard**: Dynamic stats for books and exchanges.
*   **Available Books Feed**: View recently added books from other users directly on the dashboard.
*   Fetch & update profile with address management.

### 📖 Book Management
*   Add books with images (Cloudinary integration)
*   Book condition & exchange type details
*   Ownership enforcement
*   Book locking during active exchanges

### 🔁 Exchange Workflow
*   Send exchange requests
*   Prevent duplicate requests
*   Accept / reject exchanges
*   Book locking after acceptance
*   State-driven lifecycle (`requested → accepted → shipped → delivered → completed`)

### 💬 Real-Time Chat
*   Exchange-scoped chat
*   Only participants can chat
*   Real-time messaging via Socket.io
*   Chat closes automatically after exchange completion/rejection

### 🚚 Shipments
*   Shipment creation after exchange acceptance
*   Address reveal only after acceptance
*   Shipment status tracking (`shipped`, `delivered`)
*   Exchange completion after delivery

### 🔔 Notifications
*   Exchange requests
*   Chat messages
*   Exchange acceptance/rejection
*   Shipment updates
*   Real-time bell notifications

### 🛡️ Admin Panel
*   **Dashboard**: Overview of platform stats.
*   **User Management**: View and ban/unban users.
*   **Reports**: View and resolve reports against users/books.

---

## 🔹 How to Run Locally

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
*Runs on port 5001 by default.*

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
*Runs on port 5173 by default.*

---

## 🔹 Environment Variables

### Backend (.env)
*   `PORT=5001`
*   `MONGO_URI`
*   `JWT_SECRET`
*   `CLOUDINARY_CLOUD_NAME`
*   `CLOUDINARY_API_KEY`
*   `CLOUDINARY_API_SECRET`
*   `EMAIL_USER`
*   `EMAIL_PASS`
*   `CLIENT_URL=http://localhost:5173`

---

## 🔹 Author

**Ayan Choudhary**
*(Enhanced by Antigravity Agent)*
