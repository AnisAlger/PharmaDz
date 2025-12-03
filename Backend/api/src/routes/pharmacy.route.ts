import { Express } from "express";
import {
  createPharmacyHandler,
  deletePharmacyHandler,
  getPharmaciesHandler,
  getPharmacyHandler,
  updatePharmacyHandler,
} from "../controllers/pharmacy.controller";
import validate from "../middleware/validateRessource";
import {
  createPharmacySchema,
  updatePharmacySchema,
} from "../schemas/pharmacy.schema";

function pharmacyRoutes(app: Express) {
  app.get("/api/pharmacies", getPharmaciesHandler);
  app.get("/api/pharmacies/:pharmacyId", getPharmacyHandler);
  app.post("/api/pharmacies", validate(createPharmacySchema), createPharmacyHandler);
  app.put("/api/pharmacies/:pharmacyId", validate(updatePharmacySchema), updatePharmacyHandler);
  // Route DELETE sans validation pour éviter les problèmes
  app.delete("/api/pharmacies/:pharmacyId", deletePharmacyHandler);
}

export default pharmacyRoutes;