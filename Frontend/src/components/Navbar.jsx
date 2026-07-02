import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logoutAuth, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shakes", path: "/shakes" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
        background: scrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(255,107,53,0.2)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Syne', sans-serif" }}
            >
              <div style={{
                width: "40px", height: "40px", borderRadius: "12px",
                background: "linear-gradient(135deg, #ff6b35, #ff3d7f)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", boxShadow: "0 0 20px rgba(255,107,53,0.4)",
              }}>🍹</div>
              <span style={{ fontSize: "22px", fontWeight: 800, color: "#f5f5f5" }}>
                Shake<span style={{ color: "#ff6b35" }}>Hub</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop links */}
          <div style={{ alignItems: "center", gap: "8px" }} className="hidden md:flex">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ y: -2 }}
                  style={{
                    padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
                    color: isActive(link.path) ? "#ff6b35" : "#aaa",
                    background: isActive(link.path) ? "rgba(255,107,53,0.1)" : "transparent",
                    border: isActive(link.path) ? "1px solid rgba(255,107,53,0.3)" : "1px solid transparent",
                    transition: "all 0.3s ease", cursor: "pointer",
                  }}
                >{link.name}</motion.div>
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ y: -2 }}
                  style={{
                    padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
                    color: "#ffd700", background: "rgba(255,215,0,0.08)",
                    border: "1px solid rgba(255,215,0,0.3)", transition: "all 0.3s ease",
                  }}
                >⚡ Admin</motion.div>
              </Link>
            )}
          </div>

          {/* Auth buttons */}
          <div style={{ alignItems: "center", gap: "12px" }} className="hidden md:flex">
            {user ? (
              <>
                <span style={{ fontSize: "13px", color: "#888" }}>Hi, {user.name}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={logoutAuth}
                  style={{
                    padding: "8px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f5f5f5", cursor: "pointer",
                  }}
                >Logout</motion.button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    style={{
                      padding: "8px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
                      background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                      color: "#f5f5f5", cursor: "pointer",
                    }}
                  >Login</motion.button>
                </Link>
                <Link to="/order" style={{ textDecoration: "none" }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="btn-glow"
                    style={{
                      padding: "8px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
                      color: "#fff", cursor: "pointer", border: "none",
                    }}
                  >Order Now 🍹</motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px", padding: "8px 12px", color: "#f5f5f5",
              fontSize: "18px", cursor: "pointer",
            }}
            className="md:hidden"
          >{isOpen ? "✕" : "☰"}</motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            style={{
              background: "rgba(10,10,10,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px",
            }}
          >
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "12px 16px", borderRadius: "8px", fontSize: "15px", fontWeight: 500,
                  color: isActive(link.path) ? "#ff6b35" : "#ccc",
                  background: isActive(link.path) ? "rgba(255,107,53,0.1)" : "transparent",
                }}>{link.name}</div>
              </Link>
            ))}
            {user ? (
              <button onClick={logoutAuth} style={{
                padding: "12px 16px", borderRadius: "8px", fontSize: "15px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#f5f5f5", cursor: "pointer", textAlign: "left",
              }}>Logout ({user.name})</button>
            ) : (
              <Link to="/order" style={{ textDecoration: "none" }}>
                <div className="btn-glow" style={{
                  padding: "12px 16px", borderRadius: "8px", fontSize: "15px",
                  fontWeight: 600, color: "#fff", textAlign: "center",
                }}>Order Now 🍹</div>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
