import app from "./app.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Create uploads folder if it doesn't exist
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
