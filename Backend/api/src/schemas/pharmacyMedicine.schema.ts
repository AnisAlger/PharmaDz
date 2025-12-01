import { object, string, number, boolean, TypeOf } from "zod";

export const createPharmacyMedicineSchema = object({
  body: object({
    pharmacy: string({ required_error: "pharmacy is required" }),
    medicine: string({ required_error: "medicine is required" }),
    stock: number().min(0).default(0),
    price: number({ required_error: "price is required" }),
    isAvailable: boolean().optional(),
  }),
});

const params = {
  params: object({
    pharmacyMedicineId: string({ required_error: "ID is required" }),
  }),
};

export const updatePharmacyMedicineSchema = object({
  ...params,
  body: object({
    stock: number().optional(),
    price: number().optional(),
    isAvailable: boolean().optional(),
  }),
});

export type CreatePharmacyMedicineInput = TypeOf<
  typeof createPharmacyMedicineSchema
>;
export type UpdatePharmacyMedicineInput = TypeOf<
  typeof updatePharmacyMedicineSchema
>;
