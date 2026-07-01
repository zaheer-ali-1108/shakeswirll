import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getDrinks } from "../services/api";

const fallbackShakes = [
  { _id: "1", name: "Oreo Delight", category: "shake", description: "Creamy blend of Oreo cookies and chilled milk.", price: 350, image: "/images/oreo.png", bgColor: "#1a1a1a", featured: true },
  { _id: "2", name: "Mango Magic", category: "shake", description: "Refreshing tropical mango with rich cream.", price: 280, image: "/images/mango.png", bgColor: "#E65100", featured: false },
  { _id: "3", name: "Strawberry Bliss", category: "shake", description: "Sweet and tangy strawberry perfection.", price: 300, image: "/images/strawberry.png", bgColor: "#880E4F", featured: true },
  { _id: "4", name: "Chocolate Heaven", category: "shake", description: "Thick, rich, and chocolatey smooth.", price: 320, image: "/images/chocolate.png", bgColor: "#3E2723", featured: false },
  { _id: "5", name: "Banana Boost", category: "shake", description: "Energy-packed banana shake with honey.", price: 250, image: "/images/banana.png", bgColor: "#827717", featured: false },
  { _id: "6", name: "Vanilla Cloud", category: "shake", description: "Light Madagascar vanilla, timeless classic.", price: 270, image: "/images/vanilla.png", bgColor: "#4E342E", featured: false },
];

export default function ShakesGrid() {
  const [drinks, setDrinks] = useState(fallbackShakes);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    getDrinks().then((r) => { if (r.data?.length) setDrinks(r.data); }).catch(() => {});
  }, []);

  return (
    <section className="mesh-bg" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div style={{
            display: "inline-block", padding: "6px 16px", borderRadius: "100px",
            background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)",
            color: "#ff6b35", fontSize: "12px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px",
          }}>Our Menu</div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800, color: "#f5f5f5", marginBottom: "16px",
          }}>
            Crafted with <span className="gradient-text">Pure Love</span>
          </h2>
          <p style={{ color: "#777", fontSize: "17px", maxWidth: "500px", margin: "0 auto" }}>
            Every shake hand-crafted with premium ingredients. Pick your favorite.
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {drinks.map((shake, i) => (
            <motion.div
              key={shake._id}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              onHoverStart={() => setHovered(shake._id)}
              onHoverEnd={() => setHovered(null)}
              className="card-3d"
              style={{
                background: "var(--c-card)", borderRadius: "24px",
                border: hovered === shake._id ? "1px solid rgba(255,107,53,0.3)" : "1px solid var(--c-border)",
                padding: "28px", cursor: "pointer", position: "relative", overflow: "hidden",
              }}
            >
              {shake.featured && (
                <div style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: "linear-gradient(135deg, #ff6b35, #ff3d7f)",
                  color: "#fff", fontSize: "10px", fontWeight: 700,
                  padding: "4px 10px", borderRadius: "100px", textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>Featured</div>
              )}

              {/* Color glow bg */}
              <div style={{
                position: "absolute", top: "-40px", right: "-40px",
                width: "160px", height: "160px", borderRadius: "50%",
                background: `${shake.bgColor || "#ff6b35"}33`,
                filter: "blur(30px)", transition: "opacity 0.3s",
                opacity: hovered === shake._id ? 1 : 0.4,
              }} />

              <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", position: "relative" }}>
                <motion.img
                  src={shake.image?.startsWith("/uploads") ? `http://localhost:5000${shake.image}` : shake.image}
                  alt={shake.name}
                  animate={{ y: hovered === shake._id ? -8 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: "130px", height: "170px", objectFit: "contain",
                    filter: `drop-shadow(0 20px 30px ${shake.bgColor || "#ff6b35"}66)` }}
                  onError={(e) => { e.target.src = "/images/chocolate.png"; }}
                />
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f5f5f5" }}>
                    {shake.name}
                  </h3>
                  <span style={{ color: "#ff6b35", fontWeight: 700, fontSize: "16px", whiteSpace: "nowrap" }}>
                    ₨{shake.price}
                  </span>
                </div>
                <p style={{ color: "#777", fontSize: "13px", lineHeight: 1.6, marginBottom: "20px" }}>
                  {shake.description}
                </p>
                <Link to="/order" style={{ textDecoration: "none" }}>
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="btn-glow"
                    style={{
                      width: "100%", padding: "12px", borderRadius: "10px",
                      fontSize: "14px", fontWeight: 600, color: "#fff", border: "none", cursor: "pointer",
                    }}
                  >Order This</motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
