import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:3000", // frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// ✅ Serve uploaded profile pictures
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/admin", adminRoutes);

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ status: "Service Admin running" });
});

export default app;
