import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      loginAuth(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}! 🍹`);
      if (res.data.user.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mesh-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🍹</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 800, color: "#f5f5f5", marginBottom: "8px" }}>Welcome Back</h1>
          <p style={{ color: "#666" }}>Sign in to your ShakeHub account</p>
        </div>
        <div className="glass" style={{ borderRadius: "24px", padding: "36px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "#aaa", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</label>
              <input className="input-dark" type="email" required value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", fontSize: "14px" }} />
            </div>
            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", color: "#aaa", fontSize: "12px", fontWeight: 600, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Password</label>
              <input className="input-dark" type="password" required value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", fontSize: "14px" }} />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={loading} className="btn-glow"
              style={{ width: "100%", padding: "14px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>
          <p style={{ textAlign: "center", marginTop: "24px", color: "#666", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#ff6b35", textDecoration: "none", fontWeight: 600 }}>Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
