import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getDrinks } from "../services/api";

const fallback = [
  { _id: "1", name: "Oreo Delight", category: "shake", description: "Creamy blend of Oreo cookies.", price: 350, image: "/images/oreo.png", bgColor: "#1a1a1a" },
  { _id: "2", name: "Mango Magic", category: "shake", description: "Tropical mango delight.", price: 280, image: "/images/mango.png", bgColor: "#E65100" },
  { _id: "3", name: "Strawberry Bliss", category: "shake", description: "Sweet strawberry perfection.", price: 300, image: "/images/strawberry.png", bgColor: "#880E4F" },
  { _id: "4", name: "Chocolate Heaven", category: "shake", description: "Rich chocolate smoothness.", price: 320, image: "/images/chocolate.png", bgColor: "#3E2723" },
  { _id: "5", name: "Banana Boost", category: "shake", description: "Energizing banana blend.", price: 250, image: "/images/banana.png", bgColor: "#827717" },
  { _id: "6", name: "Vanilla Cloud", category: "shake", description: "Classic Madagascar vanilla.", price: 270, image: "/images/vanilla.png", bgColor: "#4E342E" },
];

const CATS = ["all", "shake", "juice", "smoothie", "special"];

export default function ShakeDeals() {
  const [drinks, setDrinks] = useState(fallback);
  const [cat, setCat] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDrinks(cat)
      .then((r) => { if (r.data?.length) setDrinks(r.data); else setDrinks(fallback); })
      .catch(() => setDrinks(fallback))
      .finally(() => setLoading(false));
  }, [cat]);

  return (
    <div className="mesh-bg" style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800, color: "#f5f5f5", marginBottom: "16px",
          }}>
            Our <span className="gradient-text">Full Menu</span>
          </h1>
          <p style={{ color: "#777", fontSize: "17px" }}>Handcrafted with premium ingredients, every single time.</p>
        </motion.div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
          {CATS.map((c) => (
            <motion.button
              key={c} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setCat(c)}
              style={{
                padding: "10px 24px", borderRadius: "100px", fontSize: "14px", fontWeight: 600,
                cursor: "pointer", textTransform: "capitalize",
                background: cat === c ? "linear-gradient(135deg, #ff6b35, #ff3d7f)" : "rgba(255,255,255,0.05)",
                color: cat === c ? "#fff" : "#888",
                border: cat === c ? "none" : "1px solid rgba(255,255,255,0.1)",
                boxShadow: cat === c ? "0 0 20px rgba(255,107,53,0.3)" : "none",
              }}
            >{c}</motion.button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px", color: "#555" }}>Loading...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
            {drinks.map((d, i) => (
              <motion.div
                key={d._id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="card-3d glass"
                style={{ borderRadius: "20px", padding: "24px", position: "relative", overflow: "hidden" }}
              >
                <div style={{
                  position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px",
                  borderRadius: "50%", background: `${d.bgColor || "#ff6b35"}33`, filter: "blur(25px)",
                }} />
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <img
                    src={d.image?.startsWith("/uploads") ? `http://localhost:5000${d.image}` : d.image}
                    alt={d.name}
                    style={{ width: "100px", height: "130px", objectFit: "contain",
                      filter: `drop-shadow(0 15px 25px ${d.bgColor || "#ff6b35"}55)` }}
                    onError={(e) => { e.target.src = "/images/chocolate.png"; }}
                  />
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "17px", fontWeight: 700, color: "#f5f5f5", marginBottom: "6px" }}>{d.name}</h3>
                <p style={{ color: "#666", fontSize: "13px", marginBottom: "16px", lineHeight: 1.5 }}>{d.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#ff6b35", fontWeight: 700, fontSize: "18px" }}>₨{d.price}</span>
                  <Link to="/order" style={{ textDecoration: "none" }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className="btn-glow"
                      style={{ padding: "8px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}
                    >Order</motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
