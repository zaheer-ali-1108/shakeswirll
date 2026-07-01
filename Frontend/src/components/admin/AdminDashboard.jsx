import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getOrders } from "../../services/api";
import { getContacts } from "../../services/api";
import { getDrinks } from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, drinks: 0, messages: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getOrders(), getContacts(), getDrinks()])
      .then(([ordersRes, contactsRes, drinksRes]) => {
        const orders = ordersRes.data || [];
        const contacts = contactsRes.data || [];
        const drinks = drinksRes.data || [];
        const revenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);
        setStats({ orders: orders.length, drinks: drinks.length, messages: contacts.length, revenue });
        setRecentOrders(orders.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Total Orders", value: stats.orders, icon: "📦", color: "#ff6b35", link: "/admin/orders" },
    { label: "Total Revenue", value: `₨${stats.revenue.toLocaleString()}`, icon: "💰", color: "#10b981", link: "/admin/orders" },
    { label: "Drinks in Menu", value: stats.drinks, icon: "🍹", color: "#6366f1", link: "/admin/drinks" },
    { label: "Messages", value: stats.messages, icon: "✉️", color: "#f59e0b", link: "/admin/messages" },
  ];

  const statusColor = {
    pending: "#f59e0b",
    confirmed: "#6366f1",
    preparing: "#3b82f6",
    delivered: "#10b981",
    cancelled: "#ef4444",
  };

  return (
    <AdminLayout title="Dashboard">
      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <Link to={card.link} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "24px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: "-10px", right: "-10px",
                  width: "80px", height: "80px", borderRadius: "50%",
                  background: `${card.color}18`, filter: "blur(15px)",
                }} />
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{card.icon}</div>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "28px", fontWeight: 800,
                  color: card.color, marginBottom: "4px",
                }}>
                  {loading ? "—" : card.value}
                </div>
                <div style={{ color: "#555", fontSize: "13px" }}>{card.label}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f5f5f5", marginBottom: "16px" }}>
              Quick Actions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "➕ Add New Drink", path: "/admin/drinks", color: "#ff6b35" },
                { label: "📦 View All Orders", path: "/admin/orders", color: "#6366f1" },
                { label: "✉️ Check Messages", path: "/admin/messages", color: "#f59e0b" },
                { label: "🌐 View Live Site", path: "/", color: "#10b981" },
              ].map((a) => (
                <Link key={a.path} to={a.path} style={{ textDecoration: "none" }}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{
                      padding: "10px 14px", borderRadius: "8px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: a.color, fontSize: "14px", fontWeight: 500, cursor: "pointer",
                    }}
                  >{a.label}</motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, color: "#f5f5f5", marginBottom: "16px" }}>
              Recent Orders
            </h3>
            {loading ? (
              <div style={{ color: "#444", fontSize: "14px" }}>Loading...</div>
            ) : recentOrders.length === 0 ? (
              <div style={{ color: "#444", fontSize: "14px" }}>No orders yet</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {recentOrders.map((order) => (
                  <div key={order._id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 12px", borderRadius: "8px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <div>
                      <div style={{ fontSize: "13px", color: "#ccc", fontWeight: 500 }}>{order.product}</div>
                      <div style={{ fontSize: "11px", color: "#555" }}>{order.size} • ₨{order.price}</div>
                    </div>
                    <span style={{
                      fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "100px",
                      background: `${statusColor[order.status] || "#555"}20`,
                      color: statusColor[order.status] || "#555",
                      textTransform: "uppercase", letterSpacing: "0.5px",
                    }}>{order.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
