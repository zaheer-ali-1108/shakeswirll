import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="mesh-bg" style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "80px" }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, color: "#f5f5f5", marginBottom: "20px" }}>
            About <span className="gradient-text">ShakeHub</span>
          </h1>
          <p style={{ color: "#777", fontSize: "18px", lineHeight: 1.8, maxWidth: "640px", margin: "0 auto" }}>
            We believe every shake should be an experience — crafted with the finest ingredients, blended with love, and delivered with a smile.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px", marginBottom: "80px" }}>
          {[
            { icon: "🌿", title: "100% Natural", desc: "No artificial flavors, no shortcuts. Just real fruits, premium milk, and pure goodness in every sip." },
            { icon: "⚡", title: "Made Fresh Daily", desc: "Every shake is blended to order. We never pre-mix or store — freshness is non-negotiable." },
            { icon: "🎯", title: "25+ Flavors", desc: "From classic chocolate to exotic fusion blends, we have a shake for every mood and craving." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card-3d glass" style={{ borderRadius: "20px", padding: "32px" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>{item.icon}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "#f5f5f5", marginBottom: "12px" }}>{item.title}</h3>
              <p style={{ color: "#666", lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass" style={{ borderRadius: "24px", padding: "48px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: "linear-gradient(135deg, #ff6b35, #ff3d7f)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px",
              boxShadow: "0 0 30px rgba(255,107,53,0.4)",
            }}>Z</div>
            <div style={{ textAlign: "left" }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 700, color: "#f5f5f5" }}>Zaheer Ali</h3>
              <p style={{ color: "#ff6b35", fontSize: "14px" }}>Founder & Shake Artist</p>
            </div>
          </div>
          <p style={{ color: "#777", fontSize: "16px", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto" }}>
            "I started ShakeHub with one dream — to make the perfect shake accessible to everyone in Punjab. Two years later, we've served over 10,000 happy customers."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
