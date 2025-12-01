import MedicineModel, { MedicineDocument, MedicineInput } from "../models/medicine.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export function createMedicine(input: MedicineInput) {
  return MedicineModel.create(input);
}

export function findMedicine(
  query: FilterQuery<MedicineDocument>,
  options: QueryOptions
) {
  return MedicineModel.findOne(query, {}, options);
}

export function findMedicines(
  query: FilterQuery<MedicineDocument>,
  options: QueryOptions
) {
  return MedicineModel.find(query, {}, options);
}

export function updateMedicine(
  query: FilterQuery<MedicineDocument>,
  update: UpdateQuery<MedicineDocument>,
  options: QueryOptions
) {
  return MedicineModel.findOneAndUpdate(query, update, { ...options, new: true });
}

export function deleteMedicine(query: FilterQuery<MedicineDocument>) {
  return MedicineModel.deleteOne(query);
}
