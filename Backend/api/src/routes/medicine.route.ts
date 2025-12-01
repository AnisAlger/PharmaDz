import { Express } from "express";
import {
  createMedicineHandler,
  deleteMedicineHandler,
  getMedicineHandler,
  getMedicinesHandler,
  updateMedicineHandler,
} from "../controllers/medicine.controller";
import {
  createMedicineSchema,
  updateMedicineSchema,
} from "../schemas/medicine.schema";
import validate from "../middleware/validateRessource";

function medicineRoutes(app: Express) {
  app.get("/api/medicines", getMedicinesHandler);
  app.get("/api/medicines/:medicineId", getMedicineHandler);
  app.post("/api/medicines", validate(createMedicineSchema), createMedicineHandler);
  app.put("/api/medicines/:medicineId", validate(updateMedicineSchema), updateMedicineHandler);
  app.delete("/api/medicines/:medicineId", deleteMedicineHandler);
}

export default medicineRoutes;
