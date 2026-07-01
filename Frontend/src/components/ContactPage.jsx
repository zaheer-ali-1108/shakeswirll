import { useState } from "react";
import { motion } from "framer-motion";
import { submitContact } from "../services/api";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("All fields are required");
    setLoading(true);
    try {
      await submitContact(form);
      setSent(true);
      toast.success("Message sent! We'll get back to you soon 🍹");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mesh-bg" style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 800,
              color: "#f5f5f5",
              marginBottom: "16px",
            }}
          >
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p style={{ color: "#777", fontSize: "17px" }}>
            Have a question or want a custom blend? We'd love to hear from you.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "40px", alignItems: "start" }}
          className="grid-cols-1 md:grid-cols-2">

          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div style={{ marginBottom: "40px" }}>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#f5f5f5",
                  marginBottom: "16px",
                }}
              >
                Let's Talk
              </h2>
              <p style={{ color: "#666", fontSize: "15px", lineHeight: 1.8 }}>
                Whether it's about a custom order, a bulk inquiry, or just a compliment about our shakes — we're always available.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { icon: "📍", label: "Location", value: "Punjab, Pakistan" },
                { icon: "📞", label: "Phone", value: "+92 300 0000000" },
                { icon: "✉️", label: "Email", value: "hello@shakehub.pk" },
                { icon: "⏰", label: "Hours", value: "10 AM – 11 PM Daily" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "rgba(255,107,53,0.1)",
                      border: "1px solid rgba(255,107,53,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ color: "#555", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>{item.label}</div>
                    <div style={{ color: "#ccc", fontSize: "14px", fontWeight: 500 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass"
                style={{
                  borderRadius: "24px",
                  padding: "60px 40px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "64px", marginBottom: "24px" }}>🎉</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: 700, color: "#f5f5f5", marginBottom: "12px" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "#666", marginBottom: "24px" }}>We'll get back to you within 24 hours.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSent(false)}
                  style={{
                    padding: "12px 28px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ccc",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Send Another
                </motion.button>
              </motion.div>
            ) : (
              <div className="glass" style={{ borderRadius: "24px", padding: "36px" }}>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", color: "#aaa", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Your Name
                    </label>
                    <input
                      className="input-dark"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your name"
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", fontSize: "14px" }}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", color: "#aaa", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Email Address
                    </label>
                    <input
                      className="input-dark"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="you@example.com"
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", fontSize: "14px" }}
                    />
                  </div>

                  <div style={{ marginBottom: "28px" }}>
                    <label style={{ display: "block", color: "#aaa", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Message
                    </label>
                    <textarea
                      className="input-dark"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us what's on your mind..."
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        fontSize: "14px",
                        resize: "vertical",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="btn-glow"
                    style={{
                      width: "100%",
                      padding: "15px",
                      borderRadius: "12px",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#fff",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      fontFamily: "'Syne', sans-serif",
                    }}
                  >
                    {loading ? "Sending..." : "Send Message ✉️"}
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
