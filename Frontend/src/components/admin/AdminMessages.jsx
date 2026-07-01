import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "./AdminLayout";
import { getContacts, deleteContact } from "../../services/api";
import toast from "react-hot-toast";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const load = () => {
    setLoading(true);
    getContacts()
      .then((r) => setMessages(r.data || []))
      .catch(() => toast.error("Failed to load messages"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      toast.success("Message deleted");
      setDeleteId(null);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const fmtDate = (d) => new Date(d).toLocaleDateString("en-PK", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

  return (
    <AdminLayout title="Messages">
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ color: "#555", fontSize: "14px" }}>{messages.length} message{messages.length !== 1 ? "s" : ""} received</p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#444" }}>Loading messages...</div>
      ) : messages.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "80px",
          background: "#1a1a1a", borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
          <p style={{ color: "#444", fontSize: "16px" }}>No messages yet</p>
          <p style={{ color: "#333", fontSize: "13px", marginTop: "8px" }}>Messages from the contact form will appear here</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {messages.map((msg, i) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                background: "#1a1a1a",
                border: expanded === msg._id ? "1px solid rgba(255,107,53,0.3)" : "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              {/* Row */}
              <div
                style={{
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                }}
                onClick={() => setExpanded(expanded === msg._id ? null : msg._id)}
              >
                {/* Avatar */}
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, #ff6b35, #ff3d7f)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", fontWeight: 700, color: "#fff",
                }}>
                  {msg.name?.[0]?.toUpperCase() || "?"}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "3px" }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#f5f5f5" }}>
                      {msg.name}
                    </span>
                    <span style={{
                      fontSize: "11px", color: "#555", background: "rgba(255,255,255,0.04)",
                      padding: "2px 8px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.06)",
                    }}>{msg.email}</span>
                  </div>
                  <div style={{
                    color: "#555", fontSize: "13px",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {msg.message}
                  </div>
                </div>

                {/* Date + actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                  <span style={{ color: "#444", fontSize: "12px" }}>{fmtDate(msg.createdAt)}</span>
                  <motion.div animate={{ rotate: expanded === msg._id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <span style={{ color: "#555", fontSize: "14px" }}>▾</span>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); setDeleteId(msg._id); }}
                    style={{
                      padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                      background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                      color: "#ef4444", cursor: "pointer",
                    }}
                  >🗑️</motion.button>
                </div>
              </div>

              {/* Expanded message */}
              <AnimatePresence>
                {expanded === msg._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{
                      padding: "0 20px 20px 80px",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}>
                      <div style={{
                        marginTop: "16px",
                        padding: "16px 20px",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}>
                        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                          {msg.message}
                        </p>
                      </div>

                      {/* Reply via email */}
                      <a
                        href={`mailto:${msg.email}?subject=Re: Your message to ShakeHub`}
                        style={{ textDecoration: "none" }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          style={{
                            marginTop: "12px",
                            padding: "9px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                            background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.25)",
                            color: "#ff6b35", cursor: "pointer",
                          }}
                        >
                          ✉️ Reply to {msg.name}
                        </motion.button>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1001,
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              style={{
                background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "16px", padding: "32px", maxWidth: "340px", textAlign: "center",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗑️</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f5f5f5", marginBottom: "8px" }}>
                Delete Message?
              </h3>
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
