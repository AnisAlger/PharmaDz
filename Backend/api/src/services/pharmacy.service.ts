import PharmacyModel, { PharmacyDocument, PharmacyInput } from "../models/pharmacy.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export async function createPharmacy(input: PharmacyInput) {
  return PharmacyModel.create(input);
}

export async function findPharmacy(
  query: FilterQuery<PharmacyDocument>,
  options: QueryOptions
) {
  return PharmacyModel.findOne(query, {}, options);
}

export async function findPharmacies(
  query: FilterQuery<PharmacyDocument>,
  options: QueryOptions
) {
  return PharmacyModel.find(query, {}, options);
}

export async function updatePharmacy(
  query: FilterQuery<PharmacyDocument>,
  update: UpdateQuery<PharmacyDocument>,
  options: QueryOptions
) {
  return PharmacyModel.findOneAndUpdate(query, update, {
    ...options,
    new: true,
  });
}

export async function deletePharmacy(query: FilterQuery<PharmacyDocument>) {
  return PharmacyModel.deleteOne(query);
}
