import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Delete existing admin if any
    await User.deleteOne({ email: "admin@shakehub.com" });

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@shakehub.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  Email   : admin@shakehub.com");
    console.log("  Password: admin123");
    console.log("  Role    : admin");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("👉 Now go to /login and login with above credentials");
    console.log("👉 You will see ⚡ Admin button in navbar");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seed();
