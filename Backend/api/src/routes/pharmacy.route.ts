import { Express } from "express";
import {
  createPharmacyHandler,
  deletePharmacyHandler,
  getPharmacyHandler,
  getPharmaciesHandler,
  updatePharmacyHandler,
} from "../controllers/pharmacy.controller";
import {
  createPharmacySchema,
  updatePharmacySchema,
} from "../schemas/pharmacy.schema";
import validate from "../middleware/validateRessource";

function pharmacyRoutes(app: Express) {
  app.get("/api/pharmacies", getPharmaciesHandler);
  app.get("/api/pharmacies/:pharmacyId", getPharmacyHandler);
  app.post("/api/pharmacies", validate(createPharmacySchema), createPharmacyHandler);
  app.put("/api/pharmacies/:pharmacyId", validate(updatePharmacySchema), updatePharmacyHandler);
  app.delete("/api/pharmacies/:pharmacyId", deletePharmacyHandler);
}

export default pharmacyRoutes;
