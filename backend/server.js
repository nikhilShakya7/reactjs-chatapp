import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Mount auth routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
