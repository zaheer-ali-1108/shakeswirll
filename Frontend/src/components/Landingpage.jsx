import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// A shimmering sparkle particle system for the floor/interior
function SparkleField({ count = 40 }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 6px #fff",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

// Hanging clothes on the rack (Like image 2 & 3)
function HangingItem({ x, y, delay }) {
  return (
    <motion.div
      animate={{ rotate: [1, -1, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: "40px",
        height: "60px",
        background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "4px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        transformOrigin: "top center",
      }}
    />
  );
}

export default function CinematicShop() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 3D Transform Logic: Starts flat, then pulls back and tilts up as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5], [0, -300]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: "200vh", // Extra height to allow scrolling
        background: "#050505", 
        position: "relative",
        overflowX: "hidden"
      }}
    >
      {/* The 3D World Container */}
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          perspective: "1000px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            scale,
            rotateX,
            z: translateZ,
            transition: "transform 0.1s linear",
          }}
        >
          
          {/* LAYER 1: Exterior (Night City, Cars, Building Front) - Matches Image 1 */}
          <div style={{ 
            position: "absolute", inset: 0, 
            background: "radial-gradient(circle at 50% 50%, #111 0%, #000 100%)",
            display: "flex", justifyContent: "center", alignItems: "flex-end",
            paddingBottom: "5vh"
          }}>
            {/* Background Building Columns */}
            <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", gap: "40px", opacity: 0.3 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{ width: "60px", height: "100%", background: "linear-gradient(to bottom, #222, transparent)" }} />
              ))}
            </div>

            {/* Two Black Cars at the bottom */}
            <div style={{ position: "absolute", bottom: "5vh", width: "100%", display: "flex", justifyContent: "space-around", padding: "0 10vw", zIndex: 1 }}>
              <div style={{ width: "200px", height: "50px", background: "#000", borderRadius: "20px 40px 10px 10px", boxShadow: "0 4px 20px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.1)" }} />
              <div style={{ width: "200px", height: "50px", background: "#000", borderRadius: "20px 40px 10px 10px", boxShadow: "0 4px 20px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.1)" }} />
            </div>

            {/* Stairs leading up to entrance */}
            <div style={{ 
              position: "absolute", bottom: "5vh", 
              width: "60%", height: "200px", 
              background: "linear-gradient(to bottom, #1a1a1a, #000)", 
              clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
              zIndex: 2
            }} />

            {/* Glowing Entrance Box (Door) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              style={{
                position: "absolute",
                bottom: "25vh",
                width: "500px",
                height: "350px",
                background: "#0a0a0a",
                border: "2px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 60px rgba(255,255,255,0.05), inset 0 0 60px rgba(255,255,255,0.02)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 3,
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, transparent, #fff, transparent)" }} />
              
              {/* Monogram */}
              <div style={{ 
                width: "60px", height: "60px", 
                border: "1px solid rgba(255,255,255,0.3)", 
                borderRadius: "50%", 
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "10px"
              }}>
                <span className="font-['Syne']" style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>S</span>
              </div>

              <h1 className="font-['Syne']" style={{ fontSize: "32px", letterSpacing: "8px", color: "#fff" }}>SHAKERZ</h1>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", letterSpacing: "4px" }}>THE SHAKE HOUSE</p>
              
              {/* Door handles (Like image) */}
              <div style={{ position: "absolute", right: "-30px", top: "50%", width: "4px", height: "40px", background: "rgba(255,255,255,0.2)" }} />
              <div style={{ position: "absolute", left: "-30px", top: "50%", width: "4px", height: "40px", background: "rgba(255,255,255,0.2)" }} />
            </motion.div>
          </div>

          {/* LAYER 2: The Interior (Appears through the door as you scroll) */}
          <motion.div 
            style={{
              position: "absolute",
              inset: 0,
              background: "#0d0d0d",
              opacity: useTransform(scrollYProgress, [0.1, 0.6], [0, 1]), // Fades in as you scroll past the door
              zIndex: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <SparkleField count={60} />

            {/* Marble Floor Reflection */}
            <div style={{ 
              position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", 
              background: "linear-gradient(to top, rgba(255,255,255,0.05), transparent)",
              borderTop: "1px solid rgba(255,255,255,0.05)"
            }} />

            {/* The Counter / Display Case (Matches Image 4) */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                position: "relative",
                width: "80%",
                maxWidth: "600px",
                height: "200px",
                background: "linear-gradient(to bottom, #151515, #000)",
                border: "1px solid rgba(255,255,255,0.1)",
                marginTop: "auto",
                marginBottom: "50px",
                boxShadow: "0 -10px 40px rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              {/* Glowing Monogram on counter */}
              <div style={{ position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)", background: "#111", padding: "10px 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                 <span className="font-['Syne']" style={{ fontSize: "20px", fontWeight: 800, color: "#fff" }}>S</span>
              </div>
              
              <div style={{ color: "#fff", fontSize: "12px", letterSpacing: "2px", opacity: 0.7 }}>PREMIUM</div>
              <div style={{ color: "#fff", fontSize: "12px", letterSpacing: "2px", opacity: 0.7 }}>SHAKES</div>
              <div style={{ color: "#fff", fontSize: "12px", letterSpacing: "2px", opacity: 0.7 }}>EST. 2026</div>
            </motion.div>

            {/* Spiral Staircase (Right side, like image 3) */}
            <div style={{ 
              position: "absolute", right: "5%", bottom: "10%", 
              width: "120px", height: "300px", 
              border: "1px solid rgba(255,255,255,0.1)", 
              borderRadius: "60px 60px 0 0",
              background: "linear-gradient(135deg, rgba(255,255,255,0.02), transparent)",
              transform: "rotate(15deg)",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)"
            }} />

            {/* Hanging Clothes Rack (Left side, like image 2) */}
            <div style={{ position: "absolute", left: "5%", bottom: "15%", display: "flex", gap: "10px" }}>
              <HangingItem x={0} y={0} delay={0} />
              <HangingItem x={40} y={-5} delay={0.5} />
              <HangingItem x={80} y={5} delay={1} />
              <HangingItem x={120} y={-2} delay={1.5} />
            </div>

            {/* The Featured Product (The Shake) */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                position: "absolute",
                top: "15%",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 5
              }}
            >
               {/* Spotlight */}
               <div style={{ 
                 position: "absolute", top: "-100px", width: "200px", height: "200px", 
                 background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                 pointerEvents: "none"
               }} />
               
               <div style={{ 
                  width: "140px", height: "200px", 
                  background: "linear-gradient(180deg, rgba(255,255,255,0.1), transparent)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "10px"
               }}>
                  {/* Placeholder for Shake Image */}
                  <span style={{ fontSize: "40px" }}>🥤</span>
               </div>
               
               <h3 className="font-['Syne']" style={{ color: "#fff", marginTop: "20px", letterSpacing: "2px", fontSize: "18px" }}>CHOCOLATE DREAM</h3>
               <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Rs. 350</p>
            </motion.div>

          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
}