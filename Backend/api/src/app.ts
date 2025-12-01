import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mongoSanitize from "express-mongo-sanitize";
// import rateLimit from "express-rate-limit";
import userRoutes from './routes/user.route';
import pharmacyRoutes from './routes/pharmacy.route';
import medicineRoutes from './routes/medicine.route';
import pharmacyMedicineRoutes from './routes/pharmacyMedicine.route';
import logger from "./utils/logger";
import OS = require("os");
process.env.UV_THREADPOOL_SIZE = OS.cpus().length.toString();

dotenv.config()

const app = express();
const uri = process.env.DB_CONNECTION || '' ; 
const PORT = process.env.PORT || 8800;

// Middleware
app.use(express.json());
app.use(mongoSanitize());

// app.use(parseQueryAndOptions);
// const limiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 5 minutes
//   max: 1000, // 100 requests per IP
// });
// app.use(limiter);

// Start Server
app.listen(PORT, async() => {
 logger.info(`Server is running on port ${PORT}`);
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
    });
   
   logger.info("db connection established");
   userRoutes(app);
   pharmacyRoutes(app);
   medicineRoutes(app);
   pharmacyMedicineRoutes(app);
  } catch (error:any) {
    logger.info(error.message);
    process.exit(1);
  }
});

