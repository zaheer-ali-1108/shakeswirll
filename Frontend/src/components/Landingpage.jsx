import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const shakes = [
  { name: "Chocolate Dream", desc: "Rich Belgian chocolate, velvety smooth with a deep cocoa finish.", img: "/images/chocolate_trans.png", accent: "#FF8A65", tag: "Best Seller", price: 350 },
  { name: "Strawberry Bliss", desc: "Garden-fresh strawberries blended with premium cream. Summer in a glass.", img: "/images/strawberry_trans.png", accent: "#F48FB1", tag: "Fan Favorite", price: 300 },
  { name: "Mango Magic", desc: "Alphonso mangoes, tropical vibes, zero compromise on flavor.", img: "/images/mango_trans.png", accent: "#FFD54F", tag: "New", price: 280 },
  { name: "Vanilla Cloud", desc: "Madagascar vanilla, light as air, a timeless classic reimagined.", img: "/images/vanilla_trans.png", accent: "#FFECB3", tag: "Classic", price: 270 },
  { name: "Banana Boost", desc: "Energy-packed banana shake with hints of honey and oat.", img: "/images/banana_trans.png", accent: "#FFF176", tag: "Healthy", price: 250 },
];

// Falling glitter/sparkle particles — matches the shimmering floor look from
// the reference video's store interior.
function GlitterField({ count = 40 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
      })),
    [count]
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 2 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-4%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
          animate={{ y: ["0vh", "104vh"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

// Screen 1 — the storefront "gate". Dark, moody, a glowing monogram, a
// pulsing ENTER button, thin light lines suggesting a facade/staircase,
// exactly like the opening seconds of the reference video.
function StoreEntrance({ onEnter }) {
  return (
    <motion.div
      key="entrance"
      exit={{ opacity: 0, scale: 1.15, filter: "blur(6px)" }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 30%, #1a1a1a 0%, #000 75%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 100,
      }}
    >
      <GlitterField count={28} />

      {/* Faint vertical facade lines for depth, like building columns */}
      <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", opacity: 0.25, zIndex: 1 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ width: "1px", height: "100%", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)" }} />
        ))}
      </div>

      {/* Glowing monogram */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          width: "84px",
          height: "84px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          boxShadow: "0 0 40px rgba(255,255,255,0.25)",
          zIndex: 3,
        }}
      >
        <span className="font-['Syne']" style={{ fontSize: "28px", fontWeight: 800, color: "#fff" }}>
          S
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-['Syne']"
        style={{
          fontSize: "clamp(20px, 3vw, 28px)",
          letterSpacing: "6px",
          color: "#fff",
          textTransform: "uppercase",
          marginBottom: "8px",
          zIndex: 3,
        }}
      >
        Shakerz
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", letterSpacing: "2px", marginBottom: "48px", zIndex: 3 }}
      >
        THE SHAKE HOUSE
      </motion.p>

      {/* Pulsing ENTER button */}
      <motion.button
        onClick={onEnter}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "relative",
          padding: "16px 56px",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.6)",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "4px",
          cursor: "pointer",
          zIndex: 3,
          overflow: "hidden",
        }}
      >
        <motion.span
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.15)" }}
        />
        <span style={{ position: "relative" }}>ENTER</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={{ marginTop: "18px", fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "1px", zIndex: 3 }}
      >
        Tap to walk in
      </motion.div>
    </motion.div>
  );
}

export default function LandingPage() {
  const [entered, setEntered] = useState(false);
  const [featured, setFeatured] = useState(0);

  useEffect(() => {
    if (entered) document.body.style.overflow = "auto";
  }, [entered]);

  const cur = shakes[featured];
  const others = shakes.filter((_, i) => i !== featured);

  return (
    <>
      <AnimatePresence>{!entered && <StoreEntrance onEnter={() => setEntered(true)} />}</AnimatePresence>

      {/* Screen 2 — the store interior. Dark elegant background, a lit
          pedestal in the center holding the featured shake (like the
          mannequin/product on the raised platform in the video), side
          shelves with the other flavors, and a shimmering glitter floor. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 1, delay: entered ? 0.5 : 0 }}
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0d0d0d 0%, #050505 100%)",
          position: "relative",
          overflow: "hidden",
          pointerEvents: entered ? "auto" : "none",
        }}
      >
        <GlitterField count={50} />

        {/* Ambient colored spotlight tied to the featured shake */}
        <motion.div
          animate={{ background: `radial-gradient(ellipse 700px 500px at 50% 30%, ${cur.accent}22 0%, transparent 70%)` }}
          transition={{ duration: 0.8 }}
          style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
        />

        {/* Fluted panel lines in the background, like the store's wall paneling */}
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", opacity: 0.06, zIndex: 1 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{ width: "1px", height: "100%", background: "#fff" }} />
          ))}
        </div>

        {/* Header */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px 48px",
          }}
        >
          <span className="font-['Syne']" style={{ fontWeight: 800, fontSize: "20px", letterSpacing: "1px", color: "#fff" }}>
            Shakerz
          </span>
          <div className="hidden md:flex" style={{ gap: "36px", fontSize: "13px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px" }}>
            <span>MENU</span>
            <span>ABOUT</span>
            <span>LOCATIONS</span>
          </div>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "15px",
            }}
          >
            🛒
          </div>
        </div>

        {/* Center stage — spotlight beam + pedestal + featured shake */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 24px 60px",
          }}
        >
          {/* Spotlight cone from above */}
          <div
            style={{
              position: "absolute",
              top: "-40px",
              width: "260px",
              height: "440px",
              background: `linear-gradient(to bottom, ${cur.accent}25 0%, transparent 80%)`,
              clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
              pointerEvents: "none",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={featured}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}
            >
              <motion.img
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                src={cur.img + "?v=2"}
                alt={cur.name}
                style={{
                  width: "min(60vw, 240px)",
                  height: "auto",
                  maxHeight: "36vh",
                  objectFit: "contain",
                  filter: `drop-shadow(0 25px 30px rgba(0,0,0,0.6))`,
                }}
              />

              {/* Pedestal */}
              <div
                style={{
                  width: "180px",
                  height: "14px",
                  borderRadius: "50%",
                  background: `radial-gradient(ellipse at center, ${cur.accent}55 0%, transparent 75%)`,
                  marginTop: "-6px",
                  filter: "blur(2px)",
                }}
              />
              <div
                style={{
                  width: "220px",
                  height: "8px",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02))",
                  borderRadius: "4px",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.2)",
                }}
              />
            </motion.div>
          </AnimatePresence>

          <div style={{ textAlign: "center", marginTop: "28px", zIndex: 2 }}>
            <span
              style={{
                display: "inline-block",
                padding: "5px 14px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                color: "#000",
                backgroundColor: cur.accent,
                marginBottom: "14px",
              }}
            >
              {cur.tag}
            </span>
            <h2 className="font-['Syne']" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
              {cur.name}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", maxWidth: "380px", margin: "0 auto 20px", lineHeight: 1.6 }}>
              {cur.desc}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
              <span className="font-['Syne']" style={{ fontSize: "22px", fontWeight: 800, color: cur.accent }}>
                Rs. {cur.price}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "12px 30px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.7)",
                  background: "transparent",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "1px",
                  cursor: "pointer",
                }}
              >
                ADD TO CART
              </motion.button>
            </div>
          </div>
        </div>

        {/* Side shelves — the other flavors displayed like store shelf items */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            justifyContent: "center",
            gap: "18px",
            flexWrap: "wrap",
            padding: "0 24px 70px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "36px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {others.map((s) => {
            const originalIdx = shakes.findIndex((sh) => sh.name === s.name);
            return (
              <motion.button
                key={s.name}
                onClick={() => setFeatured(originalIdx)}
                whileHover={{ y: -6 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px 14px",
                  width: "120px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={s.img + "?v=2"}
                  alt={s.name}
                  style={{ width: "60px", height: "70px", objectFit: "contain", filter: "drop-shadow(0 10px 12px rgba(0,0,0,0.5))" }}
                />
                <span style={{ color: "#fff", fontSize: "12px", fontWeight: 500, textAlign: "center" }}>{s.name}</span>
                <span style={{ color: s.accent, fontSize: "12px", fontWeight: 700 }}>Rs. {s.price}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}