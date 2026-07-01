import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/Landingpage";
import Shakes from "./components/Shakes";
import ShakeDeals from "./components/Shakedeals";
import AboutPage from "./components/Aboutus";
import ServicesPage from "./components/ServicesPage";
import ContactPage from "./components/ContactPage";
import OrderPage from "./components/OrderPage";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminDrinks from "./components/admin/AdminDrinks";
import AdminOrders from "./components/admin/AdminOrders";
import AdminMessages from "./components/admin/AdminMessages";
import AdminRoute from "./components/admin/AdminRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin routes (no navbar/footer) */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/drinks" element={<AdminRoute><AdminDrinks /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />

          {/* Public routes */}
          <Route path="/*" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<><LandingPage /><Shakes /></>} />
                  <Route path="/shakes" element={<ShakeDeals />} />
                  <Route path="/order" element={<OrderPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </div>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
