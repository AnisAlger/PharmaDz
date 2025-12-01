import { Request, Response } from "express";
import {
  addMedicineToPharmacy,
  updatePharmacyMedicine,
  getMedicinesOfPharmacy,
  getPharmaciesWithMedicine,
} from "../services/pharmacyMedicine.service";
import {
  CreatePharmacyMedicineInput,
  UpdatePharmacyMedicineInput,
} from "../schemas/pharmacyMedicine.schema";
import { FilterQuery, QueryOptions } from "mongoose";
import { PharmacyMedicineDocument } from "../models/pharmacyMedicine.model";

export type PharmacyMedicineRequest<
  TParams =
    | CreatePharmacyMedicineInput["body"]
    | UpdatePharmacyMedicineInput["body"]
    | { pharmacyMedicineId: string }
> = Request<TParams> & {
  queryOptions?: QueryOptions;
  queryFilter?: FilterQuery<PharmacyMedicineDocument>;
};

// -------------------- CREATE --------------------
export async function addMedicineToPharmacyHandler(
  req: Request<{}, {}, CreatePharmacyMedicineInput["body"]>,
  res: Response
) {
  try {
    const pm = await addMedicineToPharmacy(req.body);
    return res.status(201).json({ data: pm });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// -------------------- UPDATE --------------------
export async function updatePharmacyMedicineHandler(
  req: PharmacyMedicineRequest<UpdatePharmacyMedicineInput["params"]>,
  res: Response
) {
  const id = req.params.pharmacyMedicineId;
  const update = req.body;
  const options = req.queryOptions || { lean: true, new: true };

  const updated = await updatePharmacyMedicine({ _id: id }, update, options);

  if (!updated) {
    return res.sendStatus(404);
  }

  return res.status(200).json(updated);
}

// -------------------- GET MEDICINES BY PHARMACY --------------------
export async function getMedicinesByPharmacyHandler(
  req: PharmacyMedicineRequest<{ pharmacyId: string }>,
  res: Response
) {
  const pharmacyId = req.params.pharmacyId;
  const list = await getMedicinesOfPharmacy(pharmacyId);
  if (!list || list.length === 0) return res.status(404).json({ data: [] });

  return res.status(200).json({ data: list });
}

// -------------------- GET PHARMACIES BY MEDICINE --------------------
export async function getPharmaciesByMedicineHandler(
  req: PharmacyMedicineRequest<{ medicineId: string }>,
  res: Response
) {
  const medicineId = req.params.medicineId;
  const list = await getPharmaciesWithMedicine(medicineId);
  if (!list || list.length === 0) return res.status(404).json({ data: [] });

  return res.status(200).json({ data: list });
}
