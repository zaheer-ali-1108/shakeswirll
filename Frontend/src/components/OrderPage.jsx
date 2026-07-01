import { useState } from "react";
import { motion } from "framer-motion";
import { placeOrder } from "../services/api";
import toast from "react-hot-toast";

const PRODUCTS = ["Oreo Delight", "Mango Magic", "Strawberry Bliss", "Chocolate Heaven", "Banana Boost", "Vanilla Cloud"];
const SIZES = ["Small", "Medium", "Large"];
const PRICES = { Small: 200, Medium: 300, Large: 400 };
const PAYMENTS = ["Cash on Delivery", "Online Payment"];

export default function OrderPage() {
  const [form, setForm] = useState({ product: "", size: "Medium", paymentMethod: "Cash on Delivery", customerName: "", customerPhone: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.product) return toast.error("Please select a shake!");
    if (!form.customerName) return toast.error("Enter your name!");
    setLoading(true);
    try {
      await placeOrder({ ...form, price: PRICES[form.size] });
      setDone(true);
      toast.success("Order placed! We'll prepare it right away 🍹");
    } catch {
      toast.error("Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "80px" }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ textAlign: "center", padding: "60px", maxWidth: "400px" }}
      >
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          style={{ fontSize: "80px", marginBottom: "24px" }}>🍹</motion.div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 800, color: "#f5f5f5", marginBottom: "12px" }}>
          Order Placed!
        </h2>
        <p style={{ color: "#777", marginBottom: "32px" }}>Your {form.product} ({form.size}) is being prepared with love.</p>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setDone(false)}
          className="btn-glow"
          style={{ padding: "14px 32px", borderRadius: "12px", fontSize: "15px", fontWeight: 600, color: "#fff", border: "none", cursor: "pointer" }}
        >Order Another</motion.button>
      </motion.div>
    </div>
  );

  return (
    <div className="mesh-bg" style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#f5f5f5", marginBottom: "8px" }}>
            Place <span className="gradient-text">Your Order</span>
          </h1>
          <p style={{ color: "#666", marginBottom: "40px" }}>Fresh, cold, and delivered fast.</p>

          <div className="glass" style={{ borderRadius: "24px", padding: "36px" }}>
            {/* Product */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", color: "#aaa", fontSize: "13px", fontWeight: 600, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Choose Your Shake</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                {PRODUCTS.map((p) => (
                  <motion.button key={p} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleChange("product", p)}
                    style={{
                      padding: "12px", borderRadius: "10px", fontSize: "13px", fontWeight: 600,
                      cursor: "pointer", textAlign: "left",
                      background: form.product === p ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.04)",
                      border: form.product === p ? "1px solid rgba(255,107,53,0.5)" : "1px solid rgba(255,255,255,0.08)",
                      color: form.product === p ? "#ff6b35" : "#888",
                    }}
                  >🍹 {p}</motion.button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", color: "#aaa", fontSize: "13px", fontWeight: 600, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Size</label>
              <div style={{ display: "flex", gap: "12px" }}>
                {SIZES.map((s) => (
                  <motion.button key={s} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => handleChange("size", s)}
                    style={{
                      flex: 1, padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
                      background: form.size === s ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.04)",
                      border: form.size === s ? "1px solid rgba(255,107,53,0.5)" : "1px solid rgba(255,255,255,0.08)",
                      color: form.size === s ? "#ff6b35" : "#888",
                    }}
                  >{s}<br /><span style={{ fontSize: "12px", opacity: 0.7 }}>₨{PRICES[s]}</span></motion.button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "#aaa", fontSize: "13px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Name</label>
              <input
                className="input-dark"
                value={form.customerName} onChange={(e) => handleChange("customerName", e.target.value)}
                placeholder="Enter your name"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", fontSize: "14px" }}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", color: "#aaa", fontSize: "13px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Phone (optional)</label>
              <input
                className="input-dark"
                value={form.customerPhone} onChange={(e) => handleChange("customerPhone", e.target.value)}
                placeholder="+92 300 0000000"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", fontSize: "14px" }}
              />
            </div>

            {/* Payment */}
            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", color: "#aaa", fontSize: "13px", fontWeight: 600, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Payment</label>
              <div style={{ display: "flex", gap: "12px" }}>
                {PAYMENTS.map((p) => (
                  <motion.button key={p} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleChange("paymentMethod", p)}
                    style={{
                      flex: 1, padding: "12px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                      background: form.paymentMethod === p ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.04)",
                      border: form.paymentMethod === p ? "1px solid rgba(255,107,53,0.5)" : "1px solid rgba(255,255,255,0.08)",
                      color: form.paymentMethod === p ? "#ff6b35" : "#888",
                    }}
                  >{p === "Cash on Delivery" ? "💵 COD" : "💳 Online"}</motion.button>
                ))}
              </div>
            </div>

            {/* Total */}
            {form.product && (
              <div style={{ background: "rgba(255,107,53,0.08)", borderRadius: "12px", padding: "16px", marginBottom: "24px", border: "1px solid rgba(255,107,53,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#888" }}>{form.product} ({form.size})</span>
                  <span style={{ color: "#ff6b35", fontWeight: 700 }}>₨{PRICES[form.size]}</span>
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleSubmit} disabled={loading}
              className="btn-glow"
              style={{
                width: "100%", padding: "16px", borderRadius: "12px", fontSize: "16px",
                fontWeight: 700, color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1, fontFamily: "'Syne', sans-serif",
              }}
            >{loading ? "Placing Order..." : "Place Order 🍹"}</motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
