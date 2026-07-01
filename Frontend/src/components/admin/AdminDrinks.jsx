import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "./AdminLayout";
import { getAllDrinksAdmin, createDrink, updateDrink, deleteDrink } from "../../services/api";
import toast from "react-hot-toast";

const EMPTY = {
  name: "", category: "shake", description: "", price: "",
  bgColor: "#ff6b35", available: true, featured: false,
  sizes: { small: 0, medium: 0, large: 0 }, image: "",
};

const CATS = ["shake", "juice", "smoothie", "special"];

export default function AdminDrinks() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editDrink, setEditDrink] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const fileRef = useRef();

  const load = () => {
    setLoading(true);
    getAllDrinksAdmin()
      .then((r) => setDrinks(r.data || []))
      .catch(() => toast.error("Failed to load drinks"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditDrink(null);
    setForm(EMPTY);
    setImageFile(null);
    setShowForm(true);
  };

  const openEdit = (d) => {
    setEditDrink(d);
    setForm({
      name: d.name, category: d.category, description: d.description,
      price: d.price, bgColor: d.bgColor || "#ff6b35",
      available: d.available, featured: d.featured,
      sizes: d.sizes || { small: 0, medium: 0, large: 0 },
      image: d.image || "",
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const handleSizeChange = (size, val) =>
    setForm((p) => ({ ...p, sizes: { ...p.sizes, [size]: Number(val) } }));

  const handleSave = async () => {
    if (!form.name || !form.description || !form.price) {
      return toast.error("Name, description and price are required");
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("category", form.category);
      fd.append("description", form.description);
      fd.append("price", form.price);
      fd.append("bgColor", form.bgColor);
      fd.append("available", form.available);
      fd.append("featured", form.featured);
      fd.append("sizes", JSON.stringify(form.sizes));
      if (!imageFile) fd.append("image", form.image);
      if (imageFile) fd.append("image", imageFile);

      if (editDrink) {
        await updateDrink(editDrink._id, fd);
        toast.success("Drink updated!");
      } else {
        await createDrink(fd);
        toast.success("Drink added!");
      }
      setShowForm(false);
      load();
    } catch {
      toast.error("Failed to save drink");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDrink(id);
      toast.success("Drink deleted");
      setDeleteId(null);
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "14px",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#f5f5f5", outline: "none", fontFamily: "'DM Sans', sans-serif",
  };

  const labelStyle = {
    display: "block", color: "#777", fontSize: "11px", fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px",
  };

  return (
    <AdminLayout title="Drinks CMS">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "14px" }}>{drinks.length} items in menu</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={openAdd}
          style={{
            padding: "10px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
            background: "linear-gradient(135deg, #ff6b35, #ff3d7f)",
            color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Syne', sans-serif",
          }}
        >+ Add Drink</motion.button>
      </div>

      {/* Drinks Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#444" }}>Loading...</div>
      ) : drinks.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "80px",
          background: "#1a1a1a", borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🍹</div>
          <p style={{ color: "#444", fontSize: "16px", marginBottom: "20px" }}>No drinks yet</p>
          <motion.button whileHover={{ scale: 1.04 }} onClick={openAdd}
            style={{
              padding: "10px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
              background: "linear-gradient(135deg, #ff6b35, #ff3d7f)",
              color: "#fff", border: "none", cursor: "pointer",
            }}
          >Add Your First Drink</motion.button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {drinks.map((d, i) => (
            <motion.div
              key={d._id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px", padding: "16px 20px",
                display: "flex", alignItems: "center", gap: "16px",
              }}
            >
              {/* Image */}
              <div style={{
                width: "56px", height: "56px", borderRadius: "10px",
                background: `${d.bgColor || "#ff6b35"}22`,
                border: `1px solid ${d.bgColor || "#ff6b35"}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, overflow: "hidden",
              }}>
                {d.image ? (
                  <img
                    src={d.image.startsWith("/uploads") ? `http://localhost:5000${d.image}` : d.image}
                    alt={d.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <span style={{ fontSize: "24px" }}>🍹</span>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, color: "#f5f5f5" }}>
                    {d.name}
                  </span>
                  <span style={{
                    fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px",
                    background: "rgba(99,102,241,0.15)", color: "#818cf8",
                    textTransform: "uppercase", letterSpacing: "0.5px",
                  }}>{d.category}</span>
                  {d.featured && (
                    <span style={{
                      fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px",
                      background: "rgba(255,107,53,0.15)", color: "#ff6b35",
                      textTransform: "uppercase",
                    }}>Featured</span>
                  )}
                  {!d.available && (
                    <span style={{
                      fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px",
                      background: "rgba(239,68,68,0.15)", color: "#ef4444",
                    }}>Hidden</span>
                  )}
                </div>
                <div style={{ fontSize: "13px", color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {d.description}
                </div>
              </div>

              {/* Price */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#ff6b35" }}>
                  ₨{d.price}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => openEdit(d)}
                  style={{
                    padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                    background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
                    color: "#818cf8", cursor: "pointer",
                  }}
                >Edit</motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setDeleteId(d._id)}
                  style={{
                    padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                    color: "#ef4444", cursor: "pointer",
                  }}
                >Delete</motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1000, padding: "20px",
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px", padding: "32px",
                width: "100%", maxWidth: "580px",
                maxHeight: "90vh", overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: 700, color: "#f5f5f5" }}>
                  {editDrink ? "Edit Drink" : "Add New Drink"}
                </h2>
                <button onClick={() => setShowForm(false)}
                  style={{ background: "none", border: "none", color: "#555", fontSize: "20px", cursor: "pointer" }}>✕</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input style={inputStyle} value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="e.g. Chocolate Dream" />
                </div>

                {/* Category + Price row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={labelStyle}>Category *</label>
                    <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
                      {CATS.map((c) => <option key={c} value={c} style={{ background: "#1a1a1a" }}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Price (₨) *</label>
                    <input style={inputStyle} type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} placeholder="e.g. 350" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label style={labelStyle}>Description *</label>
                  <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={form.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="Describe this drink..." />
                </div>

                {/* Image URL or upload */}
                <div>
                  <label style={labelStyle}>Image</label>
                  <input style={inputStyle} type="url" value={form.image} onChange={(e) => handleChange("image", e.target.value)} placeholder="https://... or upload below" />
                  <div style={{ marginTop: "8px" }}>
                    <input ref={fileRef} type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={{ display: "none" }} />
                    <motion.button whileHover={{ scale: 1.02 }} onClick={() => fileRef.current.click()}
                      style={{
                        padding: "8px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#888", cursor: "pointer",
                      }}>
                      {imageFile ? `📎 ${imageFile.name}` : "📁 Upload Image"}
                    </motion.button>
                  </div>
                </div>

                {/* Color + toggles row */}
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: "12px", alignItems: "center" }}>
                  <div>
                    <label style={labelStyle}>Colour</label>
                    <input type="color" value={form.bgColor} onChange={(e) => handleChange("bgColor", e.target.value)}
                      style={{ width: "44px", height: "36px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", background: "none", padding: "2px" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={labelStyle}>Available</label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input type="checkbox" checked={form.available} onChange={(e) => handleChange("available", e.target.checked)}
                        style={{ width: "16px", height: "16px", accentColor: "#ff6b35" }} />
                      <span style={{ fontSize: "13px", color: "#888" }}>Show in menu</span>
                    </label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={labelStyle}>Featured</label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input type="checkbox" checked={form.featured} onChange={(e) => handleChange("featured", e.target.checked)}
                        style={{ width: "16px", height: "16px", accentColor: "#ff6b35" }} />
                      <span style={{ fontSize: "13px", color: "#888" }}>Mark as featured</span>
                    </label>
                  </div>
                </div>

                {/* Size prices */}
                <div>
                  <label style={labelStyle}>Size Prices (₨)</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                    {["small", "medium", "large"].map((s) => (
                      <div key={s}>
                        <label style={{ ...labelStyle, marginBottom: "4px" }}>{s}</label>
                        <input style={inputStyle} type="number" value={form.sizes[s]} onChange={(e) => handleSizeChange(s, e.target.value)} placeholder="0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save button */}
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSave} disabled={saving}
                  style={{
                    width: "100%", padding: "14px", borderRadius: "10px", fontSize: "15px", fontWeight: 700,
                    background: "linear-gradient(135deg, #ff6b35, #ff3d7f)",
                    color: "#fff", border: "none", cursor: saving ? "not-allowed" : "pointer",
                    opacity: saving ? 0.7 : 1, fontFamily: "'Syne', sans-serif", marginTop: "8px",
                  }}
                >{saving ? "Saving..." : editDrink ? "Save Changes" : "Add Drink"}</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
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
                borderRadius: "16px", padding: "32px", maxWidth: "360px", textAlign: "center",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>🗑️</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, color: "#f5f5f5", marginBottom: "8px" }}>Delete Drink?</h3>
              <p style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}>This action cannot be undone.</p>
              <div style={{ display: "flex", gap: "12px" }}>
                <motion.button whileHover={{ scale: 1.03 }} onClick={() => setDeleteId(null)}
                  style={{ flex: 1, padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", cursor: "pointer" }}>
                  Cancel
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} onClick={() => handleDelete(deleteId)}
                  style={{ flex: 1, padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", cursor: "pointer" }}>
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
