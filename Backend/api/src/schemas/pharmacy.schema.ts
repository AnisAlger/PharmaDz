import { object, string, number, TypeOf } from "zod";

export const payload = {
  body: object({
    name: string({ required_error: "Name is required" }),
    address: string({ required_error: "Address is required" }),
    phone: string({ required_error: "Phone is required" }),
    email: string().email("Invalid email").optional(),
    latitude: number().optional(),
    longitude: number().optional(),
  }),
};

export const payload_update = {
  body: object({
    name: string().optional(),
    address: string().optional(),
    phone: string().optional(),
    email: string().email("Invalid email").optional(),
    latitude: number().optional(),
    longitude: number().optional(),
  }),
};

const params = {
  params: object({
    pharmacyId: string({ required_error: "pharmacyId is required" }),
  }),
};

export const createPharmacySchema = object({ ...payload });
export const updatePharmacySchema = object({ ...payload_update, ...params });
export const getPharmacySchema = object({ ...params });
export const deletePharmacySchema = object({ ...params });

export type CreatePharmacyInput = TypeOf<typeof createPharmacySchema>;
export type UpdatePharmacyInput = TypeOf<typeof updatePharmacySchema>;
export type ReadPharmacyInput = TypeOf<typeof getPharmacySchema>;
export type DeletePharmacyInput = TypeOf<typeof deletePharmacySchema>;
