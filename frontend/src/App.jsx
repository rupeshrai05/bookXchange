import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Books from "./pages/books/Books";
import MyBooks from "./pages/books/MyBooks";
import AddBook from "./pages/books/AddBook";
import Exchanges from "./pages/exchanges/Exchanges";
import ExchangeDetail from "./pages/exchanges/ExchangeDetail";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UsersPage from "./pages/admin/UsersPage";
import ReportsPage from "./pages/admin/ReportsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-books"
          element={
            <ProtectedRoute>
              <MyBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exchanges"
          element={
            <ProtectedRoute>
              <Exchanges />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exchanges/:id"
          element={
            <ProtectedRoute>
              <ExchangeDetail />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UsersPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <ReportsPage />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
