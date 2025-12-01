import PharmacyMedicineModel from "../models/pharmacyMedicine.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export function addMedicineToPharmacy(input: any) {
  return PharmacyMedicineModel.create(input);
}

export function updatePharmacyMedicine(
  query: FilterQuery<any>,
  update: UpdateQuery<any>,
  options: QueryOptions
) {
  return PharmacyMedicineModel.findOneAndUpdate(query, update, {
    ...options,
    new: true,
  });
}

export function getMedicinesOfPharmacy(pharmacyId: string) {
  return PharmacyMedicineModel.find({ pharmacy: pharmacyId })
    .populate("medicine")
    .lean();
}

export function getPharmaciesWithMedicine(medicineId: string) {
  return PharmacyMedicineModel.find({ medicine: medicineId })
    .populate("pharmacy")
    .lean();
}
