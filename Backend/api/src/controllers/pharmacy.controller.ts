import { Request, Response } from "express";
import { FilterQuery, QueryOptions } from "mongoose";
import PharmacyModel from "../models/pharmacy.model";
import {
  DeletePharmacyInput,
  ReadPharmacyInput,
  UpdatePharmacyInput,
} from "../schemas/pharmacy.schema";
import {
  deletePharmacy,
  findPharmacies,
  findPharmacy,
  updatePharmacy,
} from "../services/pharmacy.service";

// Type personnalisé pour gérer les requêtes pharmacie avec options et filtres
export type PharmacyRequest<
  TParams =
    | ReadPharmacyInput["params"]
    | UpdatePharmacyInput["params"]
    | DeletePharmacyInput["params"]
> = Request<TParams> & {
  queryOptions?: QueryOptions;
  queryFilter?: FilterQuery<any>;
};

// ------------ CREATE PHARMACY ------------
export async function createPharmacyHandler(req: Request, res: Response) {
  try {
    let input = req.body;

    // Support du format React Native { location: { lat, lng } }
    if (input.location) {
      input.latitude = input.location.lat;
      input.longitude = input.location.lng;
      delete input.location;
    }

    let pharmacies;
    if (Array.isArray(input)) {
      pharmacies = await PharmacyModel.insertMany(input);
    } else {
      pharmacies = await PharmacyModel.create(input);
    }

    return res.status(201).json({ data: pharmacies });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

// ------------ UPDATE PHARMACY ------------
export async function updatePharmacyHandler(
  req: PharmacyRequest<UpdatePharmacyInput["params"]>,
  res: Response
) {
  try {
    const pharmacyId = req.params.pharmacyId;
    let update = req.body;

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
    return res.status(500).json({ error: error.message });
  }
}

// ------------ GET ONE PHARMACY ------------
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
    return res.status(500).json({ error: error.message });
  }
}

// ------------ GET ALL PHARMACIES ------------
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
    return res.status(500).json({ error: error.message });
  }
}

// ------------ DELETE PHARMACY ------------
export async function deletePharmacyHandler(
  req: Request<{ pharmacyId: string }>, // typage correct du paramètre
  res: Response
) {
  try {
    const id = req.params.pharmacyId; // <-- utiliser pharmacyId ici

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const pharmacy = await findPharmacy({ _id: id }, {});
    if (!pharmacy) {
      return res.status(404).json({ error: "Pharmacy not found" });
    }

    const result = await deletePharmacy({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Pharmacy not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Pharmacy deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete pharmacy error:", error);
    return res.status(500).json({ error: error.message });
  }
}

