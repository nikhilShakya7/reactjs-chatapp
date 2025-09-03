import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectTodb from "./db/connectTodb.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const app = express();

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Mount auth routes
app.use("/api/auth", authRoutes);

// Start server and connect to DB
app.listen(PORT, () => {
  connectTodb();
  console.log(`Server running on port ${PORT}`);
});
