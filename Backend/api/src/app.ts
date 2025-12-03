import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import mongoose from 'mongoose';
import medicineRoutes from './routes/medicine.route';
import pharmacyRoutes from './routes/pharmacy.route';
import pharmacyMedicineRoutes from './routes/pharmacyMedicine.route';
import userRoutes from './routes/user.route';
import logger from "./utils/logger";
import OS = require("os");

process.env.UV_THREADPOOL_SIZE = OS.cpus().length.toString();
dotenv.config();

const app = express();
const uri = process.env.DB_CONNECTION || '' ; 
const PORT = process.env.PORT || 8800;

// ---------- MIDDLEWARES ----------
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use(mongoSanitize());

// ---------- ROUTES ----------
userRoutes(app);
pharmacyRoutes(app);
medicineRoutes(app);
pharmacyMedicineRoutes(app);

// ---------- START SERVER ----------
mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 })
  .then(() => {
    logger.info("db connection established");
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
