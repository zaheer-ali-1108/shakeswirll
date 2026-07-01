import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      const res = await signup(form);
      loginAuth(res.data.user, res.data.token);
      toast.success("Account created! Welcome 🍹");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mesh-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🍹</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 800, color: "#f5f5f5", marginBottom: "8px" }}>Join ShakeHub</h1>
          <p style={{ color: "#666" }}>Create your account to start ordering</p>
        </div>
        <div className="glass" style={{ borderRadius: "24px", padding: "36px" }}>
          <form onSubmit={handleSubmit}>
            {[["Name", "name", "text", "Your full name"], ["Email", "email", "email", "you@example.com"], ["Password", "password", "password", "Min 6 characters"]].map(([label, key, type, ph]) => (
              <div key={key} style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", color: "#aaa", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</label>
                <input className="input-dark" type={type} required value={form[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={ph}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", fontSize: "14px" }} />
              </div>
            ))}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={loading} className="btn-glow"
              style={{ width: "100%", padding: "14px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "8px" }}>
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>
          <p style={{ textAlign: "center", marginTop: "24px", color: "#666", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#ff6b35", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
