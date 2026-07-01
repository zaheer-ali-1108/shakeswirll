import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    icon: "🍫",
    title: "Chocolate Shakes",
    desc: "Belgian, dark, milk — every chocolate variation you can dream of, blended to perfection.",
    color: "#5D4037",
  },
  {
    icon: "🍓",
    title: "Fruit Shakes",
    desc: "Strawberry, mango, banana, mixed berry — seasonal fresh fruits blended with premium cream.",
    color: "#880E4F",
  },
  {
    icon: "🥤",
    title: "Smoothies",
    desc: "Healthy power smoothies packed with nutrition, protein, and natural energy boosters.",
    color: "#1B5E20",
  },
  {
    icon: "🍊",
    title: "Fresh Juices",
    desc: "Cold-pressed juices extracted fresh daily — no concentrates, no added sugar.",
    color: "#E65100",
  },
  {
    icon: "✨",
    title: "Special Blends",
    desc: "Signature recipes unique to ShakeHub — experimental, seasonal, and always surprising.",
    color: "#4A148C",
  },
  {
    icon: "📦",
    title: "Bulk Orders",
    desc: "Catering for events, parties, and offices. Custom flavors and large quantity available.",
    color: "#1A237E",
  },
];

const process = [
  { step: "01", title: "Choose", desc: "Pick your shake from our extensive menu of 25+ flavors." },
  { step: "02", title: "Customize", desc: "Select your size, sweetness level, and any add-ons." },
  { step: "03", title: "Blend", desc: "We blend it fresh to order using only the finest ingredients." },
  { step: "04", title: "Enjoy", desc: "Receive your perfectly crafted shake, cold and delicious." },
];

export default function ServicesPage() {
  return (
    <div className="mesh-bg" style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "rgba(255,107,53,0.1)",
              border: "1px solid rgba(255,107,53,0.3)",
              color: "#ff6b35",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "16px",
            }}
          >
            What We Offer
          </div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 800,
              color: "#f5f5f5",
              marginBottom: "16px",
            }}
          >
            Our <span className="gradient-text">Services</span>
          </h1>
          <p style={{ color: "#777", fontSize: "17px", maxWidth: "500px", margin: "0 auto" }}>
            From classic shakes to exotic blends — we do it all with premium ingredients and zero compromise.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "100px",
          }}
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card-3d glass"
              style={{ borderRadius: "20px", padding: "32px", position: "relative", overflow: "hidden" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: `${s.color}33`,
                  filter: "blur(20px)",
                }}
              />
              <div style={{ fontSize: "44px", marginBottom: "20px" }}>{s.icon}</div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#f5f5f5",
                  marginBottom: "12px",
                }}
              >
                {s.title}
              </h3>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.7 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "#f5f5f5",
              marginBottom: "16px",
            }}
          >
            How It <span className="gradient-text">Works</span>
          </h2>
          <p style={{ color: "#777", fontSize: "16px" }}>Simple, fast, delicious.</p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            marginBottom: "80px",
          }}
        >
          {process.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: "center", padding: "32px 24px" }}
            >
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "rgba(255,107,53,0.2)",
                  lineHeight: 1,
                  marginBottom: "16px",
                }}
              >
                {p.step}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#f5f5f5",
                  marginBottom: "12px",
                }}
              >
                {p.title}
              </h3>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.7 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass"
          style={{
            borderRadius: "24px",
            padding: "60px 40px",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,61,127,0.05))",
            border: "1px solid rgba(255,107,53,0.2)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#f5f5f5",
              marginBottom: "16px",
            }}
          >
            Ready to Order?
          </h2>
          <p style={{ color: "#777", fontSize: "16px", marginBottom: "32px" }}>
            Fresh shakes, fast delivery. Place your order in under a minute.
          </p>
          <Link to="/order" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="btn-glow"
              style={{
                padding: "16px 48px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Order Now 🍹
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
