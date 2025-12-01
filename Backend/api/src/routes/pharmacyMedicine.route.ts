import { Express } from "express";
import {
  addMedicineToPharmacyHandler,
  updatePharmacyMedicineHandler,
  getMedicinesByPharmacyHandler,
  getPharmaciesByMedicineHandler,
} from "../controllers/pharmacyMedicine.controller";
import {
  createPharmacyMedicineSchema,
  updatePharmacyMedicineSchema,
} from "../schemas/pharmacyMedicine.schema";
import validate from "../middleware/validateRessource";

function pharmacyMedicineRoutes(app: Express) {
  // Ajouter un médicament à une pharmacie
  app.post(
    "/api/pharmacy-medicine",
    validate(createPharmacyMedicineSchema),
    addMedicineToPharmacyHandler
  );

  // Mettre à jour un médicament dans une pharmacie
  app.put(
    "/api/pharmacy-medicine/:pharmacyMedicineId",
    validate(updatePharmacyMedicineSchema),
    updatePharmacyMedicineHandler
  );

  // Obtenir tous les médicaments d'une pharmacie
  app.get(
    "/api/pharmacy/:pharmacyId/medicines",
    getMedicinesByPharmacyHandler
  );

  // Obtenir toutes les pharmacies qui ont un médicament spécifique
  app.get(
    "/api/medicine/:medicineId/pharmacies",
    getPharmaciesByMedicineHandler
  );
}

export default pharmacyMedicineRoutes;
