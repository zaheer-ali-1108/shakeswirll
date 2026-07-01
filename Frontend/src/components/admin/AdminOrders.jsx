import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "./AdminLayout";
import { getOrders, updateOrderStatus, deleteOrder } from "../../services/api";
import toast from "react-hot-toast";

const STATUSES = ["pending", "confirmed", "preparing", "delivered", "cancelled"];

const statusConfig = {
  pending:   { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.25)",  icon: "⏳" },
  confirmed: { color: "#6366f1", bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.25)",  icon: "✅" },
  preparing: { color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)",  icon: "👨‍🍳" },
  delivered: { color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.25)",  icon: "🎉" },
  cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)",   icon: "❌" },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => {
    setLoading(true);
    getOrders()
      .then((r) => setOrders(r.data || []))
      .catch(() => toast.error("Failed to load orders"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      toast.success("Order deleted");
      setDeleteId(null);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const totalRevenue = orders.reduce((s, o) => s + (o.price || 0), 0);

  const fmtDate = (d) => new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <AdminLayout title="Orders">
      {/* Summary row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Total Orders", value: orders.length, color: "#ff6b35" },
          { label: "Revenue", value: `₨${totalRevenue.toLocaleString()}`, color: "#10b981" },
          { label: "Pending", value: orders.filter((o) => o.status === "pending").length, color: "#f59e0b" },
          { label: "Delivered", value: orders.filter((o) => o.status === "delivered").length, color: "#6366f1" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px", padding: "16px",
          }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, color: s.color }}>
              {loading ? "—" : s.value}
            </div>
            <div style={{ color: "#555", fontSize: "12px", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {["all", ...STATUSES].map((s) => (
          <motion.button key={s} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => setFilter(s)}
            style={{
              padding: "7px 16px", borderRadius: "100px", fontSize: "12px", fontWeight: 600,
              cursor: "pointer", textTransform: "capitalize",
              background: filter === s ? (statusConfig[s]?.bg || "rgba(255,107,53,0.12)") : "rgba(255,255,255,0.04)",
              color: filter === s ? (statusConfig[s]?.color || "#ff6b35") : "#666",
              border: filter === s ? `1px solid ${statusConfig[s]?.border || "rgba(255,107,53,0.3)"}` : "1px solid rgba(255,255,255,0.07)",
            }}
          >{s === "all" ? `All (${orders.length})` : `${statusConfig[s]?.icon} ${s}`}</motion.button>
        ))}
      </div>

      {/* Orders list */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#444" }}>Loading orders...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "#1a1a1a", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
          <p style={{ color: "#444" }}>No orders found</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((order, i) => {
            const sc = statusConfig[order.status] || statusConfig.pending;
            return (
              <motion.div key={order._id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                style={{
                  background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px", padding: "18px 20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ flex: 1, minWidth: "180px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#f5f5f5" }}>
                        {order.product}
                      </span>
                      <span style={{
                        fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px",
                        background: "rgba(255,255,255,0.06)", color: "#777",
                      }}>{order.size}</span>
                    </div>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <span style={{ color: "#ff6b35", fontWeight: 700, fontSize: "15px" }}>₨{order.price}</span>
                      {order.customerName && <span style={{ color: "#555", fontSize: "13px" }}>👤 {order.customerName}</span>}
                      {order.customerPhone && <span style={{ color: "#555", fontSize: "13px" }}>📞 {order.customerPhone}</span>}
                      <span style={{ color: "#555", fontSize: "13px" }}>💳 {order.paymentMethod}</span>
                    </div>
                    <div style={{ color: "#444", fontSize: "11px", marginTop: "6px" }}>{fmtDate(order.createdAt)}</div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                    {/* Status badge */}
                    <span style={{
                      fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px",
                      background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                      textTransform: "uppercase", letterSpacing: "0.5px",
                    }}>{sc.icon} {order.status}</span>

                    {/* Status dropdown */}
                    <select
                      disabled={updatingId === order._id}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      style={{
                        padding: "6px 10px", borderRadius: "8px", fontSize: "12px",
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#888", cursor: "pointer", outline: "none",
                      }}
                    >
                      {STATUSES.map((s) => <option key={s} value={s} style={{ background: "#1a1a1a" }}>{s}</option>)}
                    </select>

                    {/* Delete */}
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => setDeleteId(order._id)}
                      style={{
                        padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                        background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                        color: "#ef4444", cursor: "pointer",
                      }}>🗑️</motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1001 }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{ background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px", padding: "32px", maxWidth: "340px", textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗑️</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f5f5f5", marginBottom: "8px" }}>Delete Order?</h3>
              <p style={{ color: "#666", fontSize: "13px", marginBottom: "24px" }}>This cannot be undone.</p>
              <div style={{ display: "flex", gap: "12px" }}>
                <motion.button whileHover={{ scale: 1.03 }} onClick={() => setDeleteId(null)}
                  style={{ flex: 1, padding: "11px", borderRadius: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", fontSize: "13px", cursor: "pointer" }}>
                  Cancel
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} onClick={() => handleDelete(deleteId)}
                  style={{ flex: 1, padding: "11px", borderRadius: "8px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
