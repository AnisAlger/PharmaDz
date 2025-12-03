import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import mongoose from "mongoose";

// Import routes
import medicineRoutes from "./routes/medicine.route";
import pharmacyRoutes from "./routes/pharmacy.route";
import pharmacyMedicineRoutes from "./routes/pharmacyMedicine.route";
import userRoutes from "./routes/user.route";

import logger from "./utils/logger";
import OS = require("os");
process.env.UV_THREADPOOL_SIZE = OS.cpus().length.toString();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;
const DB_CONNECTION = process.env.DB_CONNECTION || "";

// --- MIDDLEWARES ---
app.use(express.json());
app.use(mongoSanitize());

// CORS : autoriser toutes les origines (pour développement)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// --- TEST ROOT ---
app.get("/", (req, res) => {
  res.send("API is running!");
});

// --- ROUTES ---
userRoutes(app);
pharmacyRoutes(app);
medicineRoutes(app);
pharmacyMedicineRoutes(app);

// --- START SERVER ---
const startServer = async () => {
  try {
    await mongoose.connect(DB_CONNECTION, {
      serverSelectionTimeoutMS: 30000,
    });
    logger.info("MongoDB connected successfully");

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error: any) {
    logger.error("Database connection error: " + error.message);
    process.exit(1);
  }
};

startServer();
