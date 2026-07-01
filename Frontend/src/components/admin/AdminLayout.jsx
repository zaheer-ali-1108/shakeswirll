import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { path: "/admin", icon: "⚡", label: "Dashboard" },
  { path: "/admin/drinks", icon: "🍹", label: "Drinks CMS" },
  { path: "/admin/orders", icon: "📦", label: "Orders" },
  { path: "/admin/messages", icon: "✉️", label: "Messages" },
];

export default function AdminLayout({ children, title }) {
  const [sideOpen, setSideOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutAuth } = useAuth();

  const handleLogout = () => {
    logoutAuth();
    navigate("/login");
  };

  const isActive = (path) =>
    path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: sideOpen ? "240px" : "70px" }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{
          background: "#111",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ff6b35, #ff3d7f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              flexShrink: 0,
              boxShadow: "0 0 16px rgba(255,107,53,0.35)",
            }}
          >
            🍹
          </div>
          <AnimatePresence>
            {sideOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#f5f5f5",
                  whiteSpace: "nowrap",
                }}
              >
                Shake<span style={{ color: "#ff6b35" }}>Hub</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 8px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ x: 2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "11px 12px",
                  borderRadius: "10px",
                  background: isActive(item.path) ? "rgba(255,107,53,0.12)" : "transparent",
                  border: isActive(item.path) ? "1px solid rgba(255,107,53,0.25)" : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  overflow: "hidden",
                }}
              >
                <span style={{ fontSize: "18px", flexShrink: 0 }}>{item.icon}</span>
                <AnimatePresence>
                  {sideOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: isActive(item.path) ? "#ff6b35" : "#888",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "16px 8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "10px",
                cursor: "pointer",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "18px", flexShrink: 0 }}>🌐</span>
              {sideOpen && <span style={{ fontSize: "13px", color: "#555", whiteSpace: "nowrap" }}>View Site</span>}
            </div>
          </Link>
          <div
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "18px", flexShrink: 0 }}>🚪</span>
            {sideOpen && <span style={{ fontSize: "13px", color: "#555", whiteSpace: "nowrap" }}>Logout</span>}
          </div>
        </div>
      </motion.aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>

        {/* Top bar */}
        <div
          style={{
            background: "#111",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSideOpen((p) => !p)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "8px 10px",
                color: "#888",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {sideOpen ? "◀" : "▶"}
            </motion.button>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "#f5f5f5",
              }}
            >
              {title}
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "8px 14px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff6b35, #ff3d7f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#ccc" }}>{user?.name || "Admin"}</div>
              <div style={{ fontSize: "11px", color: "#555" }}>Administrator</div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: "32px 24px" }}>{children}</div>
      </div>
    </div>
  );
}
