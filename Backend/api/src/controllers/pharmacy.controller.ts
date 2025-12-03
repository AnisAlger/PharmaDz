import { Request, Response } from "express";
import { FilterQuery, QueryOptions } from "mongoose";
import PharmacyModel from "../models/pharmacy.model";
import {
  DeletePharmacyInput,
  ReadPharmacyInput,
  UpdatePharmacyInput
} from "../schemas/pharmacy.schema";
import {
  deletePharmacy,
  findPharmacies,
  findPharmacy,
  updatePharmacy
} from "../services/pharmacy.service";

export type PharmacyRequest<
  TParams =
    | ReadPharmacyInput["params"]
    | UpdatePharmacyInput["params"]
    | DeletePharmacyInput["params"]
> = Request<TParams> & {
  queryOptions?: QueryOptions;
  queryFilter?: FilterQuery<any>;
};

// ------------ CREATE ------------
export async function createPharmacyHandler(
  req: Request,
  res: Response
) {
  try {
    let input = req.body;

    // 🔥 Support du format React Native (location.lat / location.lng)
    if (input.location) {
      input.latitude = input.location.lat;
      input.longitude = input.location.lng;
      delete input.location;
    }

    // 🔥 Support de liste de pharmacies
    let pharmacies;
    if (Array.isArray(input)) {
      pharmacies = await PharmacyModel.insertMany(input);
    } else {
      pharmacies = await PharmacyModel.create(input);
    }

    return res.status(201).json({ data: pharmacies });
  } catch (error: any) {
    console.error("Create pharmacy error:", error);
    return res.status(500).json({ error: error.message });
  }
}

// ------------ UPDATE ------------
export async function updatePharmacyHandler(
  req: PharmacyRequest<UpdatePharmacyInput["params"]>,
  res: Response
) {
  try {
    const pharmacyId = req.params.pharmacyId;
    let update = req.body;

    // Support mise à jour avec location
    if (update.location) {
      update.latitude = update.location.lat;
      update.longitude = update.location.lng;
      delete update.location;
    }

    const options = req.queryOptions || { lean: true, new: true };
    const updated = await updatePharmacy({ _id: pharmacyId }, update, options);

    if (!updated) return res.status(404).json({ error: "Pharmacy not found" });
    return res.status(200).json(updated);
  } catch (error: any) {
    console.error("Update pharmacy error:", error);
    return res.status(500).json({ error: error.message });
  }
}

// ------------ GET ONE ------------
export async function getPharmacyHandler(
  req: PharmacyRequest<ReadPharmacyInput["params"]>,
  res: Response
) {
  try {
    const pharmacyId = req.params.pharmacyId;
    const options = req.queryOptions || { lean: true };
    const pharmacy = await findPharmacy({ _id: pharmacyId }, options);

    if (!pharmacy) return res.status(404).json({ error: "Pharmacy not found" });
    return res.status(200).json(pharmacy);
  } catch (error: any) {
    console.error("Get pharmacy error:", error);
    return res.status(500).json({ error: error.message });
  }
}

// ------------ GET ALL ------------
export async function getPharmaciesHandler(
  req: PharmacyRequest<{}>,
  res: Response
) {
  try {
    const query = req.queryFilter || {};
    const options = req.queryOptions || { lean: true };
    const pharmacies = await findPharmacies(query, options);

    return res.status(200).json({ data: pharmacies || [] });
  } catch (error: any) {
    console.error("Get all pharmacies error:", error);
    return res.status(500).json({ error: error.message });
  }
}

// ------------ DELETE ------------
export async function deletePharmacyHandler(
  req: Request<DeletePharmacyInput["params"]>,
  res: Response
) {
  try {
    console.log("DELETE request received with params:", req.params);
    console.log("DELETE request received with body:", req.body);
    
    // Récupérer l'ID depuis les paramètres
    const id = req.params.id;
    
    console.log("Attempting to delete pharmacy with ID:", id);
    
    if (!id) {
      console.error("No ID provided for deletion");
      return res.status(400).json({ error: "ID is required" });
    }

    // Vérifier si la pharmacie existe
    const pharmacy = await findPharmacy({ _id: id }, {});
    
    if (!pharmacy) {
      console.error("Pharmacy not found with ID:", id);
      return res.status(404).json({ error: "Pharmacy not found" });
    }

    console.log("Pharmacy found:", pharmacy.name);
    
    // Supprimer la pharmacie
    const result = await deletePharmacy({ _id: id });
    
    console.log("Delete result:", result);
    
    if (result.deletedCount === 0) {
      console.error("No pharmacy deleted for ID:", id);
      return res.status(404).json({ error: "Pharmacy not found or already deleted" });
    }

    console.log("Pharmacy deleted successfully:", id);
    
    return res.status(200).json({ 
      success: true, 
      message: "Pharmacy deleted successfully",
      deletedId: id
    });
  } catch (error: any) {
    console.error("Delete pharmacy error:", error.message);
    console.error("Error stack:", error.stack);
    return res.status(500).json({ 
      error: "Internal server error", 
      message: error.message 
    });
  }
}