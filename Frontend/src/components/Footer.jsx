import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0d0d0d",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "60px 24px 32px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
                fontFamily: "'Syne', sans-serif",
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
                  boxShadow: "0 0 16px rgba(255,107,53,0.35)",
                }}
              >
                🍹
              </div>
              <span style={{ fontSize: "20px", fontWeight: 800, color: "#f5f5f5" }}>
                Shake<span style={{ color: "#ff6b35" }}>Hub</span>
              </span>
            </div>
            <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.7, maxWidth: "220px" }}>
              Premium handcrafted shakes made with 100% natural ingredients, blended fresh to order.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "#f5f5f5",
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Home", path: "/" },
                { label: "Shakes Menu", path: "/shakes" },
                { label: "Order Now", path: "/order" },
                { label: "About Us", path: "/about" },
              ].map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  style={{ color: "#555", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.color = "#ff6b35")}
                  onMouseLeave={(e) => (e.target.style.color = "#555")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "#f5f5f5",
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "20px",
              }}
            >
              Services
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Fresh Shakes", "Smoothies", "Juices", "Special Blends", "Bulk Orders"].map((s) => (
                <span key={s} style={{ color: "#555", fontSize: "14px" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "#f5f5f5",
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "20px",
              }}
            >
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: "📍", text: "Jhelun,Punjab, Pakistan" },
                { icon: "📞", text: "+92 336 9334198" },
                { icon: "✉️", text: "hello@shakehub.pk" },
              ].map((c) => (
                <div key={c.text} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span>{c.icon}</span>
                  <span style={{ color: "#555", fontSize: "14px" }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ color: "#444", fontSize: "13px" }}>
            © {year} ShakeHub. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Instagram", "Facebook", "WhatsApp"].map((s) => (
              <motion.span
                key={s}
                whileHover={{ color: "#ff6b35" }}
                style={{ color: "#444", fontSize: "13px", cursor: "pointer", transition: "color 0.2s" }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
