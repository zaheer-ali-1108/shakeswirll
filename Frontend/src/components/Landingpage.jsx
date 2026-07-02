import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const shakes = [
  { name: "Chocolate Dream", desc: "Rich Belgian chocolate, velvety smooth with a deep cocoa finish.", img: "/images/chocolate.png", color: "#5D4037", accent: "#FF8A65", tag: "Best Seller" },
  { name: "Strawberry Bliss", desc: "Garden-fresh strawberries blended with premium cream. Summer in a glass.", img: "/images/strawberry.png", color: "#880E4F", accent: "#F48FB1", tag: "Fan Favorite" },
  { name: "Mango Magic", desc: "Alphonso mangoes, tropical vibes, zero compromise on flavor.", img: "/images/mango.png", color: "#E65100", accent: "#FFD54F", tag: "New" },
  { name: "Vanilla Cloud", desc: "Madagascar vanilla, light as air, a timeless classic reimagined.", img: "/images/Vanilla.png", color: "#4E342E", accent: "#FFECB3", tag: "Classic" },
  { name: "Banana Boost", desc: "Energy-packed banana shake with hints of honey and oat.", img: "/images/banana.png", color: "#827717", accent: "#FFF176", tag: "Healthy" },
];

export default function LandingPage() {
  const [active, setActive] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const autoRef = useRef(null);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive((p) => (p + 1) % shakes.length);
    }, 3500);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
    });
  };

  const cur = shakes[active];

  return (
    <div style={{ minHeight: "100vh" }} className="overflow-x-hidden overflow-y-auto md:overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        animate={{ background: `radial-gradient(ellipse at 60% 40%, ${cur.color}44 0%, #0a0a0a 70%)` }}
        transition={{ duration: 1.2 }}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "80px",
          position: "relative",
        }}
        className="overflow-x-hidden overflow-y-auto md:overflow-hidden py-12 md:py-0"
      >
        {/* Decorative blobs */}
        <motion.div
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${cur.accent}22 0%, transparent 70%)`,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div
            style={{}}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] items-center"
          >
            {/* Left text */}
            <div>
              <motion.div
                key={active + "tag"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "100px",
                  background: `${cur.accent}22`,
                  border: `1px solid ${cur.accent}55`,
                  color: cur.accent,
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "24px",
                }}
              >
                <span>✦</span> {cur.tag}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.h1
                  key={active + "title"}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(42px, 6vw, 80px)",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    color: "#f5f5f5",
                    marginBottom: "20px",
                  }}
                >
                  {cur.name.split(" ")[0]}{" "}
                  <span style={{ color: cur.accent }}>
                    {cur.name.split(" ").slice(1).join(" ")}
                  </span>
                </motion.h1>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={active + "desc"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  style={{
                    fontSize: "18px",
                    color: "#999",
                    lineHeight: 1.7,
                    marginBottom: "40px",
                    maxWidth: "460px",
                  }}
                >
                  {cur.desc}
                </motion.p>
              </AnimatePresence>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link to="/order" style={{ textDecoration: "none" }}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-glow"
                    style={{
                      padding: "16px 36px",
                      borderRadius: "12px",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    Order Now — ₨{(active + 1) * 150 + 200}
                  </motion.button>
                </Link>

                <Link to="/shakes" style={{ textDecoration: "none" }}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "16px 36px",
                      borderRadius: "12px",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#f5f5f5",
                      cursor: "pointer",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    View Menu
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Right image */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={cur.img}
                  alt={cur.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: "clamp(280px, 35vw, 480px)",
                    objectFit: "contain",
                    borderRadius: "28px", // ⭐ HERE IS THE ROUNDING FIX
                    filter: `drop-shadow(0 40px 60px ${cur.accent}60)`,
                  }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}